import { useEffect } from "react"

const FIVE_MINUTES_MS = 5 * 60 * 1000

/**
 * Reloads the page on a fixed interval and when the device/tab becomes
 * visible again. Kiosk devices that sit idle or sleep can hold a stale
 * WebSocket snapshot, so a full reload re-establishes fresh state.
 */
export function useAutoRefresh(intervalMs: number = FIVE_MINUTES_MS): void {
  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return

    const reload = () => window.location.reload()

    const intervalId = window.setInterval(reload, intervalMs)

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") reload()
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      window.clearInterval(intervalId)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [intervalMs])
}
