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

	constructor(state: DurableObjectState, env: Env) {
		super(state, env)
		this.stateObj = state
		this.clients = new Set()
		this.timers = new Map()

		// Simplified event state initialization
		const defaultItems: Item[] = [
			{
				itemId: "item-1",
				name: "Item 1",
				type: "PERFORMANCE",
				state: "NONE",
				timer_start_time: null,
				description: null,
				style: null,
				teamSize: null,
				choreographers: null,
				duration: null,
				durationSeconds: null,
			},
			{
				itemId: "item-2",
				name: "Item 2",
				type: "PERFORMANCE",
				state: "CHECKED IN",
				timer_start_time: null,
				durationSeconds: 12,
				description: null,
				style: null,
				teamSize: null,
				choreographers: null,
				duration: null,
			},
			{
				itemId: "break-1",
				name: "Break 1",
				type: "BREAK",
				state: "NONE",
				timer_start_time: null,
			},
			{
				itemId: "item-3",
				name: "Item 3",
				type: "PERFORMANCE",
				state: "NONE",
				timer_start_time: null,
				description: null,
				style: null,
				teamSize: null,
				choreographers: null,
				duration: null,
				durationSeconds: null,
			},
		]

		let parsed: Partial<EventState> = {}
		try {
			parsed = results && typeof results === "object" ? (results as Partial<EventState>) : {}
		} catch { }

		this.event = {
			name: parsed.name ?? "Hum Sub Diwali 2025",
			startDate: parsed.startDate ?? "2025-10-11T09:00:00Z",
			endDate: parsed.endDate ?? null,
			items: Array.isArray(parsed.items) ? parsed.items as Item[] : defaultItems,
		}

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
							} catch { }
						}
					}
				}
			})
			.catch(() => {
				/* ignore */
			})
	}

	// Schedule a timer to end a performance when its duration elapses
	private scheduleTimerEnd(item: PerformanceItem) {
		// clear existing timer
		const existing = this.timers.get(item.itemId)
		if (existing) {
			try {
				clearTimeout(existing as unknown as number)
			} catch { }
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
								; (item as PerformanceItem).timer_start_time = null
									; (item as PerformanceItem).timer_end_time = null
								const t = this.timers.get(item.itemId)
								if (t) {
									try {
										clearTimeout(t as unknown as number)
									} catch { }
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
					; (item as PerformanceItem).durationSeconds = durationSeconds
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
					; (item as PerformanceItem).timer_end_time = null

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
						; (item as PerformanceItem).timer_end_time = Date.now()
					}
					// clear any scheduled timer
					const t = this.timers.get(item.itemId)
					if (t) {
						try {
							clearTimeout(t as unknown as number)
						} catch { }
						this.timers.delete(item.itemId)
					}
				}

				// Broadcast the updated item to all clients
				this.broadcast({ type: "item_updated", item })
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

				// broadcast updated order/state
				this.broadcast({ type: "order_updated", order: this.event.items.map((i) => i.itemId), state: this.event })

				return new Response(JSON.stringify({ success: true }), { status: 200 })
			} catch {
				return new Response(JSON.stringify({ error: "invalid payload" }), { status: 400 })
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
				this.handleWebSocketMessage(data)
			} catch (error) {
				console.error("Failed to parse WebSocket message:", error)
			}
		})

		socket.addEventListener("close", () => {
			this.clients.delete(socket)
		})
	}

	// Handle WebSocket messages from clients
	private handleWebSocketMessage(data: Record<string, unknown>) {
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
							; (item as PerformanceItem).timer_start_time = null
								; (item as PerformanceItem).timer_end_time = null
							const t = this.timers.get(item.itemId)
							if (t) {
								try {
									clearTimeout(t as unknown as number)
								} catch { }
								this.timers.delete(item.itemId)
							}
						}
					}
				}

				// If this item just became PERFORMING, ensure only one PERFORMANCE item is performing at a time
				if (item.type === "PERFORMANCE" && item.state === "PERFORMING") {
					; (item as PerformanceItem).timer_end_time = null
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
						; (item as PerformanceItem).timer_end_time = Date.now()
					}
					const t = this.timers.get(item.itemId)
					if (t) {
						try {
							clearTimeout(t as unknown as number)
						} catch { }
						this.timers.delete(item.itemId)
					}
				}

				// Broadcast the updated item to all clients
				this.broadcast({ type: "item_updated", item })
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

				// Broadcast the updated item to all clients
				this.broadcast({ type: "item_updated", item: perfItem })
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
			this.stateObj.storage.put("order", data.itemIds)

			// Broadcast the reordered items
			this.broadcast({ type: "order_updated", order: data.itemIds })
		}
	}

	// Send a message to all connected clients
	private broadcast(message: unknown) {
		const data = JSON.stringify(message as unknown)
		for (const client of this.clients) {
			try {
				client.send(data)
			} catch { }
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
