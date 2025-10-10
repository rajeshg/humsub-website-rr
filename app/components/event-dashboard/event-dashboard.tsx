import { DndContext, type DragEndEvent, PointerSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core"
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { useEffect, useState } from "react"
import { Toaster } from "sonner"
import type { BreakState, Item, PerformanceState } from "~/counter"
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"
import { ImagePicker } from "./image-picker"
import { SortableItemCard } from "./sortable-item-card"

const dedupe = (arr: string[]) => Array.from(new Set(arr))

type ViewMode = "items" | "images"

export const EventDashboard: React.FC<{ role: "registration" | "backstage" | null }> = ({ role }) => {
	const [items, setItems] = useState<Item[]>([])
	const [role_users, setRoleUsers] = useState<string[]>([])
	const [showCompletedItems, setShowCompletedItems] = useState(false)
	const [viewMode, setViewMode] = useState<ViewMode>("items")
	const [now, setNow] = useState(Date.now())
	const wsUrl = "/api/durable"

	// Update every second for timers
	useEffect(() => {
		const interval = setInterval(() => setNow(Date.now()), 1000)
		return () => clearInterval(interval)
	}, [])

	// Items for the sortable list, with optional filtering of DONE items
	const localItems = items.map((item, index) => ({
		id: item.itemId,
		index,
		...item,
	}))

	const filteredItems = showCompletedItems ? localItems : localItems.filter((item) => item.state !== "DONE")

	// WebSocket send function - we'll create our own simple WebSocket connection
	const [ws, setWs] = useState<WebSocket | null>(null)
	const [wsStatus, setWsStatus] = useState<"connecting" | "open" | "closed">("closed")

	useEffect(() => {
		if (typeof window === "undefined") return

		const wsProtocol = window.location.protocol === "https:" ? "wss:" : "ws:"
		const host = window.location.host
		const path = wsUrl.startsWith("/") ? wsUrl : `/${wsUrl}`
		const websocketUrl = `${wsProtocol}//${host}${path}`

		const websocket = new WebSocket(websocketUrl)
		setWsStatus("connecting")

		websocket.onopen = () => {
			setWsStatus("open")
			setWs(websocket)
		}

		websocket.onclose = () => {
			setWsStatus("closed")
			setWs(null)
		}

		websocket.onmessage = (event) => {
			try {
				const data = JSON.parse(event.data) as Record<string, unknown>

				if (data.type === "initial_state" && data.state && typeof data.state === "object") {
					const state = data.state as { items: unknown[] }
					if (Array.isArray(state.items)) {
						setItems(state.items as Item[])
					}
				} else if (data.type === "item_updated" && data.item) {
					// Handle individual item updates
					const updatedItem = data.item as Item
					setItems((prevItems) => prevItems.map((item) => (item.itemId === updatedItem.itemId ? updatedItem : item)))
				} else if (data.type === "order_updated" && Array.isArray(data.order)) {
					// Handle item reordering
					const newOrder = data.order as string[]
					setItems((prevItems) => {
						const reordered: Item[] = []
						for (const itemId of newOrder) {
							const found = prevItems.find((item) => item.itemId === itemId)
							if (found) reordered.push(found)
						}
						// Add any items not in the new order to the end
						for (const item of prevItems) {
							if (!reordered.find((r) => r.itemId === item.itemId)) {
								reordered.push(item)
							}
						}
						return reordered
					})
				} else if (data.type === "SYNC" && Array.isArray(data.items)) {
					setItems(data.items as Item[])
				} else if (data.type === "ROLE_USERS" && data.users) {
					const dedupedUsers = dedupe(data.users as string[])
					setRoleUsers(dedupedUsers)
				}
			} catch (error) {
				console.error("Failed to parse WebSocket message:", error)
			}
		}

		return () => {
			websocket.close()
		}
	}, []) // wsUrl is constant, no need to include in dependencies

	const send = (message: string) => {
		if (ws && wsStatus === "open") {
			ws.send(message)
		}
	}

	const handleUpdateState = (itemId: string, newState: PerformanceState | BreakState) => {
		const message = {
			action: "updateState",
			itemId,
			newState,
		}
		send(JSON.stringify(message))

		// Optimistic update with proper type handling
		setItems((prevItems) =>
			prevItems.map((item) => {
				if (item.itemId === itemId) {
					return { ...item, state: newState } as Item
				}
				return item
			})
		)
	}

	const handleStartTimer = (itemId: string) => {
		const message = {
			action: "startTimer",
			itemId,
		}
		send(JSON.stringify(message))

		// Optimistic update
		const now = Date.now()
		setItems((prevItems) =>
			prevItems.map((item) =>
				item.itemId === itemId
					? ({
							...item,
							state: "PERFORMING",
							timer_start_time: now,
							timer_end_time: null,
						} as Item)
					: item
			)
		)
	}

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 8,
			},
		})
	)

	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event
		if (over && active.id !== over.id) {
			const oldIndex = filteredItems.findIndex((item) => item.id === active.id)
			const newIndex = filteredItems.findIndex((item) => item.id === over.id)
			const newItems = arrayMove(filteredItems, oldIndex, newIndex)

			const message = {
				action: "reorderItems",
				itemIds: newItems.map((item) => item.itemId),
			}

			send(JSON.stringify(message))
		}
	}

	return (
		<div className="flex flex-col h-full items-center">
			{/* Updated header for Hum Sub */}
			<div className="p-4 border-b w-full">
				<div className="w-full max-w-5xl mx-auto">
					<div className="flex items-center justify-between gap-4">
						{/* Logo + Title */}
						<div className="flex items-center gap-4">
							<img src="/assets/25yr-logo.png" alt="Hum Sub logo" className="w-12 h-12 rounded-md object-contain" />
							<div className="flex flex-col">
								<h1 className="text-2xl font-extrabold tracking-tight">Stage Timer</h1>
							</div>
						</div>

						{/* Connection status */}
						<div className="flex flex-col items-end gap-2">
							<div className="flex items-center gap-1.5 text-xs text-muted-foreground">
								<div
									className={`w-2 h-2 rounded-full ${
										wsStatus === "open"
											? "bg-green-500 animate-pulse"
											: wsStatus === "connecting"
												? "bg-yellow-500 animate-pulse"
												: "bg-red-500"
									}`}
									title={`Connection: ${wsStatus}`}
								/>
								<span className="capitalize">{wsStatus}</span>
							</div>
							{role_users.length > 0 && (
								<div className="text-sm text-muted-foreground">Connected: {role_users.join(", ")}</div>
							)}
						</div>
					</div>

					{/* Controls row (unchanged) */}
					<div className="mt-4">
						{/* Controls row */}
						<div className="flex flex-col sm:flex-row gap-3 sm:items-center">
							{/* View Mode Tabs */}
							<div className="flex items-center gap-1 bg-muted p-1 rounded-lg w-fit">
								<Button
									variant={viewMode === "items" ? "default" : "ghost"}
									size="sm"
									onClick={() => setViewMode("items")}
									className="text-xs px-3 py-1.5 h-auto"
								>
									📋 Items
								</Button>
								{role === "backstage" && (
									<Button
										variant={viewMode === "images" ? "default" : "ghost"}
										size="sm"
										onClick={() => setViewMode("images")}
										className="text-xs px-3 py-1.5 h-auto"
									>
										🖼️ Images
									</Button>
								)}
							</div>

							{/* Filter controls */}
							<div className="flex items-center gap-2">
								<div className="flex items-center gap-2">
									<Checkbox
										id="show-completed"
										checked={showCompletedItems}
										onCheckedChange={(checked) => setShowCompletedItems(checked === true)}
									/>
									<label htmlFor="show-completed" className="text-sm text-muted-foreground cursor-pointer">
										Show Completed ({items.filter((item) => item.state === "DONE").length})
									</label>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="flex-1 overflow-auto px-1 md:p-4 w-full max-w-5xl mx-auto">
				<div className={viewMode === "items" ? "block" : "hidden"} aria-hidden={viewMode !== "items"}>
					<DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
						<SortableContext items={filteredItems.map((item) => item.id)} strategy={verticalListSortingStrategy}>
							<div className="space-y-4">
								{filteredItems.map((item) => (
									<SortableItemCard
										key={item.itemId}
										item={item}
										onUpdateState={handleUpdateState}
										onStartTimer={handleStartTimer}
										now={now}
										role={role}
									/>
								))}
							</div>
						</SortableContext>
					</DndContext>
				</div>

				<div className={viewMode === "images" ? "block" : "hidden"} aria-hidden={viewMode !== "images"}>
					<div className="h-full">
						<ImagePicker
							onSelectImage={(imagePath) => {
								const message = { action: "selectImage", imagePath }
								send(JSON.stringify(message))
							}}
							onClearSelection={() => {
								const message = { action: "clearImageSelection" }
								send(JSON.stringify(message))
							}}
						/>
					</div>
				</div>
			</div>{" "}
			<Toaster />
		</div>
	)
}
