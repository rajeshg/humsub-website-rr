import { DndContext, type DragEndEvent, PointerSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core"
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { useEffect, useState } from "react"
import { Toaster } from "sonner"
import type { BreakState, Item, PerformanceState } from "~/counter"
import { Button } from "../ui/button"
import { SortableItemCard } from "./sortable-item-card"

const dedupe = (arr: string[]) => Array.from(new Set(arr))

export const EventDashboard: React.FC<{ role: "registration" | "backstage" | null }> = ({ role }) => {
	const [items, setItems] = useState<Item[]>([])
	const [role_users, setRoleUsers] = useState<string[]>([])
	const [openDrawerId, setOpenDrawerId] = useState<string | null>(null)
	const [showCompletedItems, setShowCompletedItems] = useState(false)
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
		<div className="flex flex-col h-full">
			<div className="p-4 border-b">
				<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
					<div className="flex flex-col gap-1">
						<h1 className="text-2xl font-bold">Event Dashboard</h1>
						<div className="flex items-center gap-4 text-sm text-muted-foreground">
							<span>
								Connection: <span className={wsStatus === "open" ? "text-green-600" : "text-red-600"}>{wsStatus}</span>
							</span>
							{role_users.length > 0 && <span>Connected: {role_users.join(", ")}</span>}
						</div>
					</div>
					<Button
						variant="outline"
						size="sm"
						onClick={() => setShowCompletedItems(!showCompletedItems)}
						className="flex items-center gap-2 min-w-fit"
					>
						{showCompletedItems ? (
							<>
								<span>Hide Completed</span>
								<span className="text-xs bg-muted px-1.5 py-0.5 rounded">
									{items.filter((item) => item.state === "DONE").length}
								</span>
							</>
						) : (
							<>
								<span>Show Completed</span>
								<span className="text-xs bg-muted px-1.5 py-0.5 rounded">
									{items.filter((item) => item.state === "DONE").length}
								</span>
							</>
						)}
					</Button>
				</div>
			</div>

			<div className="flex-1 overflow-auto p-4">
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
									openDrawerId={openDrawerId}
									setOpenDrawerId={setOpenDrawerId}
								/>
							))}
						</div>
					</SortableContext>
				</DndContext>
			</div>

			<Toaster />
		</div>
	)
}
