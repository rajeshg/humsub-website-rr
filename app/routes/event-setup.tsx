import { useState } from "react"
import { Button } from "~/components/ui/button"
import type { Item } from "~/counter"

// Deliberately hidden admin route used to clear the current event and load a fresh
// roster. Not linked from anywhere in the UI. Visit its path directly to use it:
// rename this file to change the URL to something known only to you.
export default function EventSetup() {
  const [eventName, setEventName] = useState("")
  const [eventStartDate, setEventStartDate] = useState("")
  const [rosterJson, setRosterJson] = useState("")
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null)

  const parseRoster = (): Item[] | null => {
    const trimmed = rosterJson.trim()
    if (!trimmed) return []
    try {
      const parsed: unknown = JSON.parse(trimmed)
      if (Array.isArray(parsed)) return parsed as Item[]
      if (parsed && typeof parsed === "object" && Array.isArray((parsed as { items?: unknown }).items)) {
        return (parsed as { items: Item[] }).items
      }
      setMessage({ type: "error", text: "Roster must be a JSON array of items (or an object with an items array)" })
      return null
    } catch {
      setMessage({ type: "error", text: "Roster is not valid JSON" })
      return null
    }
  }

  const handleStart = async () => {
    const items = parseRoster()
    if (items === null) return

    setBusy(true)
    setMessage(null)
    try {
      const res = await fetch("/api/durable/startEvent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: eventName.trim() || "Hum Sub",
          startDate: eventStartDate.trim() || null,
          items,
        }),
      })
      if (!res.ok) throw new Error("Failed to start event")
      setMessage({ type: "success", text: `Started a new event with ${items.length} segment(s).` })
    } catch (err) {
      setMessage({ type: "error", text: err instanceof Error ? err.message : "Failed to start event" })
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-xl space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Start New Event</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            This clears the current event and loads a fresh roster. Any current progress will be discarded.
          </p>
        </div>

        <div className="space-y-4">
          <div className="grid gap-1.5">
            <label htmlFor="event-name" className="text-sm font-medium">
              Event Name
            </label>
            <input
              id="event-name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              placeholder="e.g. Hum Sub Diwali 2026"
              className="w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs"
            />
          </div>

          <div className="grid gap-1.5">
            <label htmlFor="event-start" className="text-sm font-medium">
              Start Date
            </label>
            <input
              id="event-start"
              value={eventStartDate}
              onChange={(e) => setEventStartDate(e.target.value)}
              placeholder="YYYY-MM-DD or YYYY-MM-DDTHH:mm:ssZ (optional)"
              className="w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs"
            />
          </div>

          <div className="grid gap-1.5">
            <label htmlFor="roster-json" className="text-sm font-medium">
              Roster (JSON)
            </label>
            <textarea
              id="roster-json"
              value={rosterJson}
              onChange={(e) => setRosterJson(e.target.value)}
              placeholder='Paste a JSON array of items, e.g. [{"itemId":"#1","name":"...","type":"PERFORMANCE",...}]'
              rows={10}
              className="w-full rounded-md border bg-transparent px-3 py-2 font-mono text-sm shadow-xs"
            />
            <p className="text-xs text-muted-foreground">
              Optional. Leave empty to start with no segments and add them from the dashboard.
            </p>
          </div>

          {message && (
            <p className={message.type === "error" ? "text-sm text-red-600" : "text-sm text-emerald-600"}>
              {message.text}
            </p>
          )}
        </div>

        <Button onClick={handleStart} disabled={busy} className="w-full">
          {busy ? "Starting..." : "Start Event"}
        </Button>
      </div>
    </div>
  )
}
