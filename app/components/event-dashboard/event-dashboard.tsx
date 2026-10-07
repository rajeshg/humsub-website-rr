import { DndContext, type DragEndEvent, PointerSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core"
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { Search } from "lucide-react"
import { useEffect, useMemo, useRef, useState } from "react"
import { Toaster } from "sonner"
import type { BreakState, Item, PerformanceState } from "~/counter"
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"
import { ImagePicker } from "./image-picker"
import { filterItemsBySearch, normalizeSearchText } from "./search-filter"
import { SortableItemCard } from "./sortable-item-card"

type ViewMode = "items" | "images"

export const EventDashboard: React.FC<{ role: "registration" | "backstage" | null }> = ({ role }) => {
  const [items, setItems] = useState<Item[]>([])
  const [eventName, setEventName] = useState("")
  const [eventStartDate, setEventStartDate] = useState<string | null>(null)
  const [role_users, setRoleUsers] = useState<string[]>([])
  const [showCompletedItems, setShowCompletedItems] = useState(false)
  const [viewMode, setViewMode] = useState<ViewMode>("items")
  const [now, setNow] = useState(Date.now())
  const [searchQuery, setSearchQuery] = useState("")
  const wsUrl = "/api/durable"

  // WebSocket reconnection state
  const [reconnectAttempts, setReconnectAttempts] = useState(0)
  const maxReconnectAttempts = 5
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // WebSocket send function - we'll create our own simple WebSocket connection
  const [ws, setWs] = useState<WebSocket | null>(null)
  const [wsStatus, setWsStatus] = useState<"connecting" | "open" | "closed" | "reconnecting">("closed")

  const send = (message: string) => {
    if (ws && wsStatus === "open") {
      ws.send(message)
    }
  }

  // WebSocket connection effect
  // biome-ignore lint/correctness/useExhaustiveDependencies: ws is set inside the effect and used in cleanup
  useEffect(() => {
    const connect = () => {
      if (reconnectAttempts >= maxReconnectAttempts) return

      setWsStatus(reconnectAttempts > 0 ? "reconnecting" : "connecting")
      const socket = new WebSocket(wsUrl)

      socket.onopen = () => {
        setWs(socket)
        setWsStatus("open")
        setReconnectAttempts(0)
      }

      socket.onclose = () => {
        setWs(null)
        setWsStatus("closed")
        // Attempt to reconnect
        if (reconnectAttempts < maxReconnectAttempts) {
          setReconnectAttempts((prev) => prev + 1)
          reconnectTimeoutRef.current = setTimeout(connect, 1000 * (reconnectAttempts + 1))
        }
      }

      socket.onerror = () => {
        setWsStatus("closed")
      }

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data) as Record<string, unknown>

          // Track which event is loaded so the operator always knows what they are looking at
          const applyEventMeta = (state: { name?: string; startDate?: string | null } | undefined) => {
            if (!state) return
            if (typeof state.name === "string") setEventName(state.name)
            if (state.startDate !== undefined) setEventStartDate(state.startDate ?? null)
          }

          if (data.type === "initial_state") {
            const state = data.state as { items: Item[]; role_users?: string[] }
            setItems(state.items)
            setRoleUsers(state.role_users || [])
            applyEventMeta(state)
          } else if (data.type === "item_updated") {
            const item = data.item as Item
            setItems((prev) => prev.map((i) => (i.itemId === item.itemId ? item : i)))
          } else if (data.type === "item_created") {
            const item = data.item as Item
            setItems((prev) => [...prev, item])
          } else if (data.type === "order_updated") {
            const state = data.state as { items: Item[] }
            setItems(state.items)
            applyEventMeta(state)
          } else if (data.type === "event_reset") {
            const state = data.state as { items: Item[]; role_users?: string[] }
            setItems(Array.isArray(state?.items) ? state.items : [])
            setRoleUsers(state?.role_users || [])
            applyEventMeta(state)
          }
        } catch (err) {
          console.error("Failed to parse WebSocket message:", err)
        }
      }
    }

    connect()

    return () => {
      if (ws) ws.close()
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current)
    }
  }, [reconnectAttempts])

  // Update now every second
  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(interval)
  }, [])

  const filteredItems = showCompletedItems ? items : items.filter((item) => item.state !== "DONE")

  // Short, unambiguous label for which day/event the loaded roster is for
  const eventDateLabel = useMemo(() => {
    if (!eventStartDate) return null
    const d = new Date(eventStartDate)
    if (Number.isNaN(d.getTime())) return null
    return d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })
  }, [eventStartDate])

  // Simple local filter: case-insensitive substring match on
  // slot/item id, name, choreographer(s) and style.
  const isSearching = normalizeSearchText(searchQuery) !== ""
  const searchedItems = filterItemsBySearch(filteredItems, searchQuery)

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
    // Reordering a filtered subset would scramble the hidden items on the
    // server (it appends missing ids at the end), so refuse while searching.
    if (isSearching) return
    const { active, over } = event
    if (over && active.id !== over.id) {
      const oldIndex = searchedItems.findIndex((item) => item.itemId === active.id)
      const newIndex = searchedItems.findIndex((item) => item.itemId === over.id)
      const newItems = arrayMove(searchedItems, oldIndex, newIndex)

      const message = {
        action: "reorderItems",
        itemIds: newItems.map((item) => item.itemId),
      }

      send(JSON.stringify(message))

      // Optimistic reorder so the card stays put immediately instead of snapping back
      // while waiting for the server broadcast. Mirrors the backend: reorder the visible
      // list, then keep hidden (DONE) items after it in their current relative order.
      setItems((prev) => {
        if (showCompletedItems) {
          return arrayMove(prev, oldIndex, newIndex)
        }
        const done = prev.filter((item) => item.state === "DONE")
        const rest = prev.filter((item) => item.state !== "DONE")
        return [...arrayMove(rest, oldIndex, newIndex), ...done]
      })
    }
  }

  return (
    <div className="flex flex-col h-full items-center">
      {/* Updated header for Hum Sub */}
      <div className="p-4 border-b w-full">
        <div className="w-full max-w-6xl mx-auto">
          <div className="flex items-center justify-between gap-4">
            {/* Logo + Title + which event is currently loaded */}
            <div className="flex items-center gap-4">
              <img src="/assets/humsub-logo.png" alt="Hum Sub logo" className="w-12 h-12 rounded-md object-contain" />
              <div className="flex flex-col">
                <h1 className="text-2xl font-extrabold tracking-tight">Stage Timer</h1>
                {eventName && (
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-0.5 text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground">{eventName}</span>
                    {eventDateLabel && (
                      <>
                        <span aria-hidden>·</span>
                        <span>{eventDateLabel}</span>
                      </>
                    )}
                    <span aria-hidden>·</span>
                    <span>
                      {items.length} {items.length === 1 ? "item" : "items"}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Connection status */}
            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <div
                  className={`w-2 h-2 rounded-full ${
                    wsStatus === "open"
                      ? "bg-green-500 animate-pulse"
                      : wsStatus === "connecting" || wsStatus === "reconnecting"
                        ? "bg-yellow-500 animate-pulse"
                        : "bg-red-500"
                  }`}
                  title={`Connection: ${wsStatus}${reconnectAttempts > 0 ? ` (${reconnectAttempts}/${maxReconnectAttempts})` : ""}`}
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
            {/* Search bar - matches slot/id, name, choreographer or style */}
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by number, name, choreographer, or style..."
                className="w-full pl-9 pr-3 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-zinc-900 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            {isSearching && (
              <p className="mb-3 text-xs text-muted-foreground">
                {searchedItems.length} of {filteredItems.length} match{searchedItems.length === 1 ? "" : "es"} — clear
                search to reorder.
              </p>
            )}
            {/* Controls row */}
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              {/* View toggle (backstage only). Items is the default view, so only Images
                  needs a control — it becomes "Back to Items" while the image picker is open. */}
              {role === "backstage" && (
                <Button
                  variant={viewMode === "images" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode(viewMode === "images" ? "items" : "images")}
                  className="text-xs px-3 py-1.5 h-auto w-fit"
                >
                  {viewMode === "images" ? "📋 Back to Items" : "🖼️ Images"}
                </Button>
              )}

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
      <div className="flex-1 overflow-auto px-1 md:p-4 w-full max-w-6xl mx-auto">
        <div className={viewMode === "items" ? "block" : "hidden"} aria-hidden={viewMode !== "items"}>
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={searchedItems.map((item) => item.itemId)} strategy={verticalListSortingStrategy}>
              <div className="space-y-4">
                {searchedItems.length === 0 && isSearching ? (
                  <p className="py-12 text-center text-sm text-muted-foreground">
                    No matches for &ldquo;{searchQuery.trim()}&rdquo;.
                  </p>
                ) : (
                  searchedItems.map((item) => (
                    <SortableItemCard
                      key={item.itemId}
                      item={item}
                      onUpdateState={handleUpdateState}
                      onStartTimer={handleStartTimer}
                      now={now}
                      role={role}
                    />
                  ))
                )}
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
