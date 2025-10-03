import { DurableObject } from "cloudflare:workers"
import results from "../results.json"

// For PERFORMANCE items
export type PerformanceState = "NONE" | "CHECKED IN" | "BACKSTAGE" | "READY TO GO" | "PERFORMING" | "DONE"
// For BREAK items - limited states
export type BreakState = "NONE" | "IN PROGRESS" | "DONE"

// Add new ItemType
export type ItemType = "PERFORMANCE" | "BREAK"

export interface PerformanceItem {
	itemId: string
	name: string
	type: "PERFORMANCE"
	state: PerformanceState
	timer_start_time: number | null
	timer_end_time?: number | null
	// duration in seconds for the performance
	durationSeconds?: number | null
	description?: string | null
	style?: string | null
	teamSize?: number | null
	choreographers?: string | null
	// human-friendly duration string like "04:30" (optional)
	duration?: string | null
}

export interface BreakItem {
	itemId: string
	name: string
	type: "BREAK"
	state: BreakState
	timer_start_time: number | null
	timer_end_time?: number | null
}

export type Item = PerformanceItem | BreakItem

export interface EventState {
	name: string
	startDate: string | null
	endDate: string | null
	items: Item[]
	// View state management
	viewState: "item" | "image" | "upcoming"
	selectedItemId: string | null
	selectedImage: string | null
	imageMode: "single" | "collection"
	imageCollection: string[]
	collectionInterval: number
	// Hibernation recovery
	collectionCurrentIndex: number
	collectionLastRotation: number
	activeTimers: TimerState[]
}

export interface TimerState {
	itemId: string
	type: "performance" | "collection" | "filler"
	endTime: number
}

export interface Env {
	EVENT_STATUS_DO: DurableObjectNamespace
}

export class Counter extends DurableObject {
	/* eslint-disable @typescript-eslint/no-explicit-any */
	private clients: Set<WebSocket>
	private event: EventState
	private stateObj: DurableObjectState
	// local timers for scheduled end-of-performance actions
	private timers: Map<string, number>
	// View state management
	private fillerImages: string[] = []
	private collectionTimer: number | null = null
	private currentCollectionIndex = 0

	constructor(state: DurableObjectState, env: Env) {
		super(state, env)
		this.stateObj = state
		this.clients = new Set()
		this.timers = new Map()

		// Initialize filler images from the manifest
		this.initializeFillerImages()

		// Use contents of results.json directly if it is an array, otherwise fallback to empty array
		this.event = {
			name: "Hum Sub Diwali 2025",
			startDate: "2025-10-11T09:00:00Z",
			endDate: null,
			items: Array.isArray(results) ? (results as Item[]) : [],
			// View state defaults
			viewState: "item",
			selectedItemId: null,
			selectedImage: null,
			imageMode: "single",
			imageCollection: [],
			collectionInterval: 30,
			// Hibernation recovery
			collectionCurrentIndex: 0,
			collectionLastRotation: 0,
			activeTimers: [],
		}

		// Fire-and-forget loading of persisted event (if any)
		this.loadState().catch(() => {
			/* ignore load errors */
		})

		// Normalize durationSeconds for PERFORMANCE items when a duration string exists
		for (const it of this.event.items) {
			if (it.type === "PERFORMANCE") {
				const p = it as PerformanceItem
				if ((p.durationSeconds === undefined || p.durationSeconds === null) && p.duration) {
					const parsedSec = parseDurationToSeconds(p.duration)
					if (parsedSec !== null) p.durationSeconds = parsedSec
				}
			}
		}

		// Load persisted order if available and apply it
		// (no await in constructor; do async fire-and-forget)
		this.stateObj.storage
			.get("order")
			.then((order: unknown) => {
				const arr = order as string[] | undefined
				if (Array.isArray(arr)) {
					const reordered: Item[] = []
					for (const id of arr) {
						const found = this.event.items.find((i) => i.itemId === id)
						if (found) reordered.push(found)
					}
					// append any missing items that weren't in the stored order
					for (const it of this.event.items) {
						if (!reordered.find((r) => r.itemId === it.itemId)) reordered.push(it)
					}
					this.event.items = reordered

					// Ensure durationSeconds is set from duration string before scheduling timers
					for (const it of this.event.items) {
						if (it.type === "PERFORMANCE") {
							const p = it as PerformanceItem
							if ((p.durationSeconds === undefined || p.durationSeconds === null) && p.duration) {
								const parsedSec = parseDurationToSeconds(p.duration)
								if (parsedSec !== null) p.durationSeconds = parsedSec
							}
						}
					}

					// schedule timers for any running performance items
					for (const it of this.event.items) {
						if (
							it.type === "PERFORMANCE" &&
							(it as PerformanceItem).timer_start_time &&
							(it as PerformanceItem).durationSeconds
						) {
							// schedule asynchronously
							try {
								this.scheduleTimerEnd(it as PerformanceItem)
							} catch {}
						}
					}
				}
			})
			.catch(() => {
				/* ignore */
			})
	}

	// Type guard for EventState without using `any`
	private isEventState(obj: unknown): obj is EventState {
		return typeof obj === "object" && obj !== null && Array.isArray((obj as { items?: unknown }).items)
	}

	// Load persisted event from storage and apply it
	private async loadState() {
		try {
			const persisted = await this.stateObj.storage.get("event")
			if (persisted && typeof persisted === "object") {
				const enhancedState = persisted as EventState & {
					activeTimers?: TimerState[]
				}

				// Load basic event state with defaults for new fields
				this.event = {
					name: enhancedState.name,
					startDate: enhancedState.startDate,
					endDate: enhancedState.endDate,
					items: enhancedState.items,
					// View state defaults
					viewState: enhancedState.viewState || "item",
					selectedItemId: enhancedState.selectedItemId || null,
					selectedImage: enhancedState.selectedImage || null,
					imageMode: enhancedState.imageMode || "single",
					imageCollection: enhancedState.imageCollection || [],
					collectionInterval: enhancedState.collectionInterval || 30,
					// Hibernation recovery
					collectionCurrentIndex: enhancedState.collectionCurrentIndex || 0,
					collectionLastRotation: enhancedState.collectionLastRotation || 0,
					activeTimers: enhancedState.activeTimers || [],
				}

				// Restore collection state
				this.currentCollectionIndex = this.event.collectionCurrentIndex

				// Recalculate and restart timers
				if (enhancedState.activeTimers) {
					this.restoreTimers(enhancedState.activeTimers)
				}
			}

			// After loading, normalize durations and schedule timers as before
			for (const it of this.event.items) {
				if (it.type === "PERFORMANCE") {
					const p = it as PerformanceItem
					if ((p.durationSeconds === undefined || p.durationSeconds === null) && p.duration) {
						const parsedSec = parseDurationToSeconds(p.duration)
						if (parsedSec !== null) p.durationSeconds = parsedSec
					}
					if (p.timer_start_time && p.durationSeconds) {
						try {
							this.scheduleTimerEnd(p)
						} catch {}
					}
				}
			}
		} catch (err) {
			console.error("Failed to load persisted event:", err)
		}
	}

	// Persist the full event to storage
	private async saveState() {
		try {
			// Capture current timer states before saving
			const activeTimers: TimerState[] = []

			// For performance timers
			for (const [itemId, _timerId] of this.timers) {
				const item = this.event.items.find((i) => i.itemId === itemId)
				if (item && item.type === "PERFORMANCE") {
					const perf = item as PerformanceItem
					if (perf.timer_start_time && perf.durationSeconds) {
						activeTimers.push({
							itemId,
							type: "performance",
							endTime: perf.timer_start_time + perf.durationSeconds * 1000,
						})
					}
				}
			}

			// For collection timer
			if (this.collectionTimer && this.event.imageMode === "collection") {
				activeTimers.push({
					itemId: "collection",
					type: "collection",
					endTime: Date.now() + this.event.collectionInterval * 1000,
				})
			}

			// Save enhanced state
			const enhancedState = {
				...this.event,
				activeTimers,
			}

			await this.stateObj.storage.put("event", enhancedState)
		} catch (err) {
			console.error("Failed to persist event:", err)
		}
	}

	// Schedule a timer to end a performance when its duration elapses
	private scheduleTimerEnd(item: PerformanceItem) {
		// clear existing timer
		const existing = this.timers.get(item.itemId)
		if (existing) {
			try {
				clearTimeout(existing as unknown as number)
			} catch {}
			this.timers.delete(item.itemId)
		}

		if (!item.durationSeconds || !item.timer_start_time) return

		const endAt = item.timer_start_time + item.durationSeconds * 1000
		const now = Date.now()
		if (endAt <= now) {
			// duration already elapsed, finalize immediately
			item.timer_end_time = item.timer_end_time ?? now
			item.state = "DONE"
			this.broadcast({ type: "item_updated", item })
			return
		}

		const ms = endAt - now
		// schedule
		const id = setTimeout(() => {
			// mark done if still running
			const it = this.event.items.find((i) => i.itemId === item.itemId) as PerformanceItem | undefined
			if (!it) return
			it.timer_end_time = it.timer_end_time ?? Date.now()
			it.state = "DONE"
			this.timers.delete(item.itemId)
			this.broadcast({ type: "item_updated", item: it })
		}, ms) as unknown as number

		this.timers.set(item.itemId, id)
	}

	// View state management methods
	private updateViewState() {
		const hasActivePerformance = this.event.items.some(
			(item) => item.state === "PERFORMING" || item.state === "READY TO GO"
		)

		if (hasActivePerformance) {
			this.event.viewState = "item"
			this.event.selectedItemId = this.getCurrentItemId()
			// Clear any selected image when switching to item view
			this.event.selectedImage = null
			this.event.imageMode = "single"
			this.event.imageCollection = []
			this.clearCollectionTimer()
		} else if (this.event.imageMode === "collection" && this.event.imageCollection.length > 0) {
			this.event.viewState = "image"
			this.startCollectionRotation()
		} else if (this.event.selectedImage) {
			this.event.viewState = "image"
			this.clearCollectionTimer()
		} else {
			// Check if there are upcoming performances to show
			const nextItem = this.getNextUpcomingItem()
			if (nextItem) {
				this.event.viewState = "item"
				this.event.selectedItemId = nextItem.itemId
				this.clearCollectionTimer()
			} else if (this.fillerImages.length > 0) {
				this.event.viewState = "image"
				this.event.imageMode = "collection"
				this.event.imageCollection = this.fillerImages
				this.startCollectionRotation()
			} else {
				this.event.viewState = "item"
				this.clearCollectionTimer()
			}
		}
		this.broadcast({ type: "view_state_updated", state: this.event })
	}

	private startCollectionRotation() {
		if (this.event.imageCollection.length === 0) return

		this.clearCollectionTimer()
		this.selectRandomFromCollection()

		const interval = (this.event.collectionInterval || 30) * 1000
		this.collectionTimer = setTimeout(() => {
			this.startCollectionRotation()
		}, interval) as unknown as number
	}

	private selectRandomFromCollection() {
		if (this.event.imageCollection.length === 0) return

		let newIndex: number
		do {
			newIndex = Math.floor(Math.random() * this.event.imageCollection.length)
		} while (newIndex === this.event.collectionCurrentIndex && this.event.imageCollection.length > 1)

		this.event.collectionCurrentIndex = newIndex
		this.event.selectedImage = this.event.imageCollection[newIndex] || null
		this.event.collectionLastRotation = Date.now()
	}

	private clearCollectionTimer() {
		if (this.collectionTimer) {
			clearTimeout(this.collectionTimer as unknown as number)
			this.collectionTimer = null
		}
	}

	private getCurrentItemId(): string | null {
		const current = this.event.items.find((item) => item.state === "PERFORMING" || item.state === "READY TO GO")
		return current ? current.itemId : null
	}

	private getNextUpcomingItem(): Item | null {
		// Find the first upcoming item (BACKSTAGE, CHECKED IN, etc.)
		const upcomingStates = ["BACKSTAGE", "CHECKED IN", "NONE"]
		const nextItem = this.event.items.find((item) => upcomingStates.includes(item.state))
		return nextItem || null
	}

	// Initialize filler images from the auto-generated manifest
	private async initializeFillerImages() {
		try {
			// Dynamically import the image collections
			const { default: imageCollections } = await import("./lib/image-manifest.json")

			// Get filler images and convert to paths
			this.fillerImages = imageCollections.filler.map((img) => img.path)
		} catch (error) {
			console.error("Error loading filler images:", error)
			// Fallback to some default images
			this.fillerImages = ["/assets/stage-timer/filler/diwali.png", "/assets/stage-timer/filler/holi.png"]
		}
	}

	// Restore timers after hibernation
	private restoreTimers(timers: TimerState[]) {
		const now = Date.now()

		for (const timer of timers) {
			if (timer.endTime > now) {
				const delay = timer.endTime - now

				if (timer.type === "performance") {
					// Restore performance timer
					const item = this.event.items.find((i) => i.itemId === timer.itemId)
					if (item && item.type === "PERFORMANCE") {
						this.scheduleTimerEnd(item as PerformanceItem)
					}
				} else if (timer.type === "collection") {
					// Restore collection rotation
					this.collectionTimer = setTimeout(() => {
						this.startCollectionRotation()
					}, delay) as unknown as number
				}
			}
		}
	}

	// Reset or overwrite the full event state. If payload is provided and valid, use it;
	// otherwise fall back to the embedded results.json contents.
	async resetEvent(payload?: EventState) {
		// clear scheduled timers
		for (const t of this.timers.values()) {
			try {
				clearTimeout(t as unknown as number)
			} catch {}
		}
		this.timers.clear()

		if (payload && this.isEventState(payload)) {
			this.event = payload
		} else {
			this.event = {
				name: "Hum Sub Diwali 2025",
				startDate: "2025-10-11T09:00:00Z",
				endDate: null,
				items: Array.isArray(results) ? (results as Item[]) : [],
				// View state defaults
				viewState: "item",
				selectedItemId: null,
				selectedImage: null,
				imageMode: "single",
				imageCollection: [],
				collectionInterval: 30,
				// Hibernation recovery
				collectionCurrentIndex: 0,
				collectionLastRotation: 0,
				activeTimers: [],
			}
		}

		// Normalize durations and schedule timers for PERFORMANCE items
		for (const it of this.event.items) {
			if (it.type === "PERFORMANCE") {
				const p = it as PerformanceItem
				if ((p.durationSeconds === undefined || p.durationSeconds === null) && p.duration) {
					const parsedSec = parseDurationToSeconds(p.duration)
					if (parsedSec !== null) p.durationSeconds = parsedSec
				}
				if (p.timer_start_time && p.durationSeconds) {
					try {
						this.scheduleTimerEnd(p)
					} catch {}
				}
			}
		}

		// persist and notify clients
		await this.saveState()
		this.broadcast({ type: "event_reset", state: this.event })
	}

	// Handle incoming HTTP requests
	override async fetch(request: Request): Promise<Response> {
		const url = new URL(request.url)

		// Handle WebSocket connections
		if (url.pathname === "/api/durable") {
			// Accept WebSocket upgrade
			// @ts-ignore - runtime global
			// @ts-ignore - runtime global
			const pair = new WebSocketPair()
			const client = pair[0]
			const server = pair[1]
			await this.handleWebSocket(server as WebSocket)
			// @ts-ignore - ResponseInit.webSocket is provided by Workers runtime
			return new Response(null, { status: 101, webSocket: client } as unknown as ResponseInit)
		}

		// API to update a single item's state or timer
		if (request.method === "POST" && url.pathname === "/api/durable/updateItem") {
			const data = (await request.json()) as {
				itemId: string
				state?: string
				name?: string
				timer_start_time?: number | null
				timer_end_time?: number | null
				type?: ItemType
				durationSeconds?: number | null
				description?: string | null
				style?: string | null
				teamSize?: number | null
				choreographers?: string | null
				duration?: string | null
			}
			const {
				itemId,
				state,
				name,
				timer_start_time,
				timer_end_time,
				type,
				durationSeconds,
				description,
				style,
				teamSize,
				choreographers,
				duration,
			} = data

			const item = this.event.items.find((i) => i.itemId === itemId)
			if (item) {
				if (state) {
					// runtime check: only allow valid state transitions for the specific item type
					if (item.type === "BREAK") {
						const allowed: BreakState[] = ["NONE", "IN PROGRESS", "DONE"]
						if (allowed.includes(state as BreakState)) item.state = state as BreakState
					} else {
						// include "READY TO GO" so the load button can transition an item into that state
						const allowed: PerformanceState[] = ["NONE", "CHECKED IN", "BACKSTAGE", "READY TO GO", "PERFORMING", "DONE"]
						if (allowed.includes(state as PerformanceState)) {
							item.state = state as PerformanceState
							// If marking as CHECKED IN or BACKSTAGE, clear any running timers
							if (item.state === "CHECKED IN" || item.state === "BACKSTAGE") {
								;(item as PerformanceItem).timer_start_time = null
								;(item as PerformanceItem).timer_end_time = null
								const t = this.timers.get(item.itemId)
								if (t) {
									try {
										clearTimeout(t as unknown as number)
									} catch {}
									this.timers.delete(item.itemId)
								}
							}
						}
					}
				}
				if (name) item.name = name
				if (timer_start_time !== undefined) {
					item.timer_start_time = timer_start_time
				}
				if (timer_end_time !== undefined) {
					item.timer_end_time = timer_end_time
				}

				if (durationSeconds !== undefined && item.type === "PERFORMANCE") {
					;(item as PerformanceItem).durationSeconds = durationSeconds
					if ((item as PerformanceItem).timer_start_time) {
						this.scheduleTimerEnd(item as PerformanceItem)
					}
				}

				// new field updates for PERFORMANCE items
				if (item.type === "PERFORMANCE") {
					const perf = item as PerformanceItem
					if (description !== undefined) perf.description = description
					if (style !== undefined) perf.style = style
					if (teamSize !== undefined) perf.teamSize = teamSize
					if (choreographers !== undefined) perf.choreographers = choreographers
					if (duration !== undefined) {
						perf.duration = duration
						const parsed = parseDurationToSeconds(duration)
						perf.durationSeconds = parsed ?? perf.durationSeconds ?? null
						if (perf.timer_start_time) {
							this.scheduleTimerEnd(perf)
						}
					}

					// If a timer_start_time was set but durationSeconds was missing, attempt to derive it
					if (
						(item as PerformanceItem).timer_start_time &&
						(perf.durationSeconds === undefined || perf.durationSeconds === null) &&
						perf.duration
					) {
						const derived = parseDurationToSeconds(perf.duration)
						if (derived !== null) {
							perf.durationSeconds = derived
							this.scheduleTimerEnd(perf)
						}
					}
				}

				if (type) {
					item.type = type
				}

				// If this item just became PERFORMING, ensure only one PERFORMANCE item is performing at a time.
				if (item.type === "PERFORMANCE" && item.state === "PERFORMING") {
					// Always clear the timer_end_time when state becomes PERFORMING
					;(item as PerformanceItem).timer_end_time = null

					for (const other of this.event.items) {
						if (other.itemId !== item.itemId && other.type === "PERFORMANCE") {
							const perf = other as PerformanceItem
							if (perf.state === "PERFORMING") {
								perf.state = "DONE"
								// set timer_end_time if not already set
								if (!perf.timer_end_time) perf.timer_end_time = Date.now()
								// broadcast change for the other item
								this.broadcast({ type: "item_updated", item: perf })
							}
						}
					}
				}

				// If item transitioned to DONE, set timer_end_time if missing
				if ((item as PerformanceItem).state === "DONE") {
					if (!(item as PerformanceItem).timer_end_time) {
						;(item as PerformanceItem).timer_end_time = Date.now()
					}
					// clear any scheduled timer
					const t = this.timers.get(item.itemId)
					if (t) {
						try {
							clearTimeout(t as unknown as number)
						} catch {}
						this.timers.delete(item.itemId)
					}
				}

				// Update view state based on the new item state
				this.updateViewState()

				// Broadcast the updated item to all clients
				this.broadcast({ type: "item_updated", item })
				// persist full event
				this.saveState().catch(() => {})
			}

			return new Response(JSON.stringify({ success: true }))
		}

		// API to create a new item
		if (request.method === "POST" && url.pathname === "/api/durable/createItem") {
			const newItemData = (await request.json()) as {
				name: string
				state: string
				type?: ItemType
				durationSeconds?: number | null
				description?: string | null
				style?: string | null
				teamSize?: number | null
				choreographers?: string | null
				duration?: string | null
			}
			const itemId = crypto.randomUUID()
			// determine item type and validated initial state
			const itemType = (newItemData.type ?? "PERFORMANCE") as ItemType
			let initialState: PerformanceState | BreakState
			if (itemType === "BREAK") {
				const allowed: BreakState[] = ["NONE", "IN PROGRESS", "DONE"]
				initialState = allowed.includes(newItemData.state as BreakState) ? (newItemData.state as BreakState) : "NONE"
			} else {
				// allow creating items with "READY TO GO" as an initial state as well
				const allowed: PerformanceState[] = ["NONE", "CHECKED IN", "BACKSTAGE", "READY TO GO", "PERFORMING", "DONE"]
				initialState = allowed.includes(newItemData.state as PerformanceState)
					? (newItemData.state as PerformanceState)
					: "NONE"
			}

			let newItem: Item
			if (itemType === "BREAK") {
				newItem = {
					itemId,
					name: newItemData.name,
					type: "BREAK",
					state: initialState as BreakState,
					timer_start_time: null,
				}
			} else {
				const computedDurationSeconds =
					newItemData.durationSeconds ?? parseDurationToSeconds(newItemData.duration ?? null) ?? null
				newItem = {
					itemId,
					name: newItemData.name,
					type: "PERFORMANCE",
					state: initialState as PerformanceState,
					timer_start_time: null,
					durationSeconds: computedDurationSeconds,
					// persist supplied metadata
					description: newItemData.description ?? null,
					style: newItemData.style ?? null,
					teamSize: newItemData.teamSize ?? null,
					choreographers: newItemData.choreographers ?? null,
					duration: newItemData.duration ?? null,
				}
			}

			this.event.items.push(newItem)

			// If the new item is a PERFORMANCE and started as PERFORMING, mark others as DONE
			if (newItem.type === "PERFORMANCE" && (newItem as PerformanceItem).state === "PERFORMING") {
				for (const other of this.event.items) {
					if (other.itemId !== newItem.itemId && other.type === "PERFORMANCE") {
						const perf = other as PerformanceItem
						if (perf.state === "PERFORMING") {
							perf.state = "DONE"
							this.broadcast({ type: "item_updated", item: perf })
						}
					}
				}
			}
			// Broadcast the new item to all clients
			this.broadcast({
				type: "item_created",
				item: newItem,
			})
			// persist full event
			this.saveState().catch(() => {})

			return new Response(JSON.stringify({ itemId }))
		}

		// Return the full event state for initial dashboard load
		if (url.pathname === "/api/durable/state") {
			// Normalize items so PERFORMANCE items always include durationSeconds (explicit null if missing).
			const normalized: EventState = {
				...this.event,
				items: this.event.items.map((i) => {
					if (i.type === "PERFORMANCE") {
						const p = i as PerformanceItem
						return {
							...p,
							// ensure durationSeconds is present and explicit (null if absent)
							durationSeconds: p.durationSeconds ?? parseDurationToSeconds(p.duration) ?? null,
						} as PerformanceItem
					}
					return i
				}),
			}

			return new Response(JSON.stringify(normalized), { headers: { "Content-Type": "application/json" } })
		}

		// API to reorder items
		if (request.method === "POST" && url.pathname === "/api/durable/reorderItems") {
			try {
				const data = (await request.json()) as { itemOrder: string[] }
				if (!Array.isArray(data.itemOrder)) {
					return new Response(JSON.stringify({ error: "itemOrder must be an array" }), { status: 400 })
				}

				const newOrderIds = data.itemOrder
				const newItems: Item[] = []
				for (const id of newOrderIds) {
					const found = this.event.items.find((i) => i.itemId === id)
					if (found) newItems.push(found)
				}
				// append any items not included in the provided order
				for (const it of this.event.items) {
					if (!newItems.find((n) => n.itemId === it.itemId)) newItems.push(it)
				}

				this.event.items = newItems
				// persist order ids
				await this.stateObj.storage.put(
					"order",
					this.event.items.map((i) => i.itemId)
				)
				// persist full event as well
				await this.saveState()

				// broadcast updated order/state
				this.broadcast({ type: "order_updated", order: this.event.items.map((i) => i.itemId), state: this.event })

				return new Response(JSON.stringify({ success: true }), { status: 200 })
			} catch {
				return new Response(JSON.stringify({ error: "invalid payload" }), { status: 400 })
			}
		}

		// API to reset/overwrite the event state
		if (request.method === "POST" && url.pathname === "/api/durable/resetEvent") {
			try {
				const body = await request.json().catch(() => null)
				await this.resetEvent(this.isEventState(body) ? body : undefined)
				return new Response(JSON.stringify({ success: true }))
			} catch (err) {
				return new Response(JSON.stringify({ error: String(err) }), { status: 500 })
			}
		}

		return new Response("Not Found", { status: 404 })
	}

	// Handle a new WebSocket connection
	private async handleWebSocket(socket: WebSocket) {
		socket.accept()
		this.clients.add(socket)

		// Send the full event state to the new client
		socket.send(JSON.stringify({ type: "initial_state", state: this.event }))

		// Handle incoming messages from client
		socket.addEventListener("message", (event) => {
			try {
				const data = JSON.parse(event.data) as Record<string, unknown>
				this.handleWebSocketMessage(data).catch((err: unknown) => console.error("WS handler error:", err))
			} catch (error) {
				console.error("Failed to parse WebSocket message:", error)
			}
		})

		socket.addEventListener("close", () => {
			this.clients.delete(socket)
		})
	}

	// Handle WebSocket messages from clients
	private async handleWebSocketMessage(data: Record<string, unknown>): Promise<void> {
		if (data.action === "updateState" && data.itemId && data.newState) {
			const item = this.event.items.find((i) => i.itemId === data.itemId)
			if (item) {
				// Use the same logic as the HTTP API
				if (item.type === "BREAK") {
					const allowed: BreakState[] = ["NONE", "IN PROGRESS", "DONE"]
					if (allowed.includes(data.newState as BreakState)) {
						item.state = data.newState as BreakState
					}
				} else {
					const allowed: PerformanceState[] = ["NONE", "CHECKED IN", "BACKSTAGE", "READY TO GO", "PERFORMING", "DONE"]
					if (allowed.includes(data.newState as PerformanceState)) {
						item.state = data.newState as PerformanceState
						// If marking as CHECKED IN or BACKSTAGE, clear any running timers
						if (item.state === "CHECKED IN" || item.state === "BACKSTAGE") {
							;(item as PerformanceItem).timer_start_time = null
							;(item as PerformanceItem).timer_end_time = null
							const t = this.timers.get(item.itemId)
							if (t) {
								try {
									clearTimeout(t as unknown as number)
								} catch {}
								this.timers.delete(item.itemId)
							}
						}
					}
				}

				// If this item just became PERFORMING, ensure only one PERFORMANCE item is performing at a time
				if (item.type === "PERFORMANCE" && item.state === "PERFORMING") {
					;(item as PerformanceItem).timer_end_time = null
					for (const other of this.event.items) {
						if (other.itemId !== item.itemId && other.type === "PERFORMANCE") {
							const perf = other as PerformanceItem
							if (perf.state === "PERFORMING") {
								perf.state = "DONE"
								if (!perf.timer_end_time) perf.timer_end_time = Date.now()
								this.broadcast({ type: "item_updated", item: perf })
							}
						}
					}
				}

				// If item transitioned to DONE, set timer_end_time if missing
				if (item.state === "DONE") {
					if (!(item as PerformanceItem).timer_end_time) {
						;(item as PerformanceItem).timer_end_time = Date.now()
					}
					const t = this.timers.get(item.itemId)
					if (t) {
						try {
							clearTimeout(t as unknown as number)
						} catch {}
						this.timers.delete(item.itemId)
					}
				}

				// Update view state based on the new item state
				this.updateViewState()

				// Broadcast the updated item to all clients
				this.broadcast({ type: "item_updated", item })
				// persist full event
				await this.saveState().catch(() => {})
			}
		} else if (data.action === "startTimer" && data.itemId) {
			const item = this.event.items.find((i) => i.itemId === data.itemId)
			if (item && item.type === "PERFORMANCE") {
				const perfItem = item as PerformanceItem

				// Set state to PERFORMING and update timer
				perfItem.state = "PERFORMING"
				perfItem.timer_start_time = Date.now()
				perfItem.timer_end_time = null

				// Ensure only one PERFORMANCE item is performing at a time
				for (const other of this.event.items) {
					if (other.itemId !== item.itemId && other.type === "PERFORMANCE") {
						const perf = other as PerformanceItem
						if (perf.state === "PERFORMING") {
							perf.state = "DONE"
							if (!perf.timer_end_time) perf.timer_end_time = Date.now()
							this.broadcast({ type: "item_updated", item: perf })
						}
					}
				}

				// Schedule timer end if duration is set
				if (perfItem.durationSeconds) {
					this.scheduleTimerEnd(perfItem)
				}

				// Update view state based on the new item state
				this.updateViewState()

				// Broadcast the updated item to all clients
				this.broadcast({ type: "item_updated", item: perfItem })
				await this.saveState().catch(() => {})
			}
		} else if (data.action === "reorderItems" && Array.isArray(data.itemIds)) {
			// Handle item reordering
			const newOrder: Item[] = []
			for (const itemId of data.itemIds) {
				const found = this.event.items.find((i) => i.itemId === itemId)
				if (found) newOrder.push(found)
			}
			// Add any items not in the new order to the end
			for (const item of this.event.items) {
				if (!newOrder.find((i) => i.itemId === item.itemId)) {
					newOrder.push(item)
				}
			}
			this.event.items = newOrder

			// Save the new order to storage
			await this.stateObj.storage.put("order", data.itemIds)

			// Broadcast the reordered items
			this.broadcast({ type: "order_updated", order: data.itemIds })
			await this.saveState().catch(() => {})
		} else if (data.action === "selectImage" && typeof data.imagePath === "string") {
			this.event.viewState = "image"
			this.event.imageMode = "single"
			this.event.selectedImage = data.imagePath
			this.clearCollectionTimer()
			this.broadcast({ type: "view_state_updated", state: this.event })
			await this.saveState().catch(() => {})
		} else if (data.action === "selectImageCollection" && Array.isArray(data.imagePaths)) {
			this.event.viewState = "image"
			this.event.imageMode = "collection"
			this.event.imageCollection = data.imagePaths as string[]
			this.event.collectionInterval = (data.interval as number) || 30
			this.startCollectionRotation()
			this.broadcast({ type: "view_state_updated", state: this.event })
			await this.saveState().catch(() => {})
		} else if (data.action === "clearImageSelection") {
			this.event.selectedImage = null
			this.event.imageCollection = []
			this.clearCollectionTimer()
			this.updateViewState()
			await this.saveState().catch(() => {})
		}
	}

	// Send a message to all connected clients
	private broadcast(message: unknown) {
		const data = JSON.stringify(message as unknown)
		for (const client of this.clients) {
			try {
				client.send(data)
			} catch {}
		}
	}
}

// helper to convert "MM:SS" or "HH:MM:SS" to seconds
function parseDurationToSeconds(duration?: string | null): number | null {
	if (!duration) return null
	const parts = duration.split(":").map((p) => Number.parseInt(p, 10))
	if (parts.some(Number.isNaN)) return null
	if (parts.length === 2) {
		const [mins, secs] = parts
		if (mins === undefined || secs === undefined) return null
		return mins * 60 + secs
	}
	if (parts.length === 3) {
		const [hrs, mins, secs] = parts
		if (hrs === undefined || mins === undefined || secs === undefined) return null
		return hrs * 3600 + mins * 60 + secs
	}
	return null
}
