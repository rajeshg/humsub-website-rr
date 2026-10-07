import { describe, expect, it } from "vitest"
import { TIMER_RED_THRESHOLD_PCT, elapsedPercent, timerBarClass, timerTone } from "../timer-tone"

describe("timer-tone", () => {
  describe("elapsedPercent", () => {
    it("returns 0 when the timer has not started or has no duration", () => {
      expect(elapsedPercent(null, 100, Date.now())).toBe(0)
      expect(elapsedPercent(1000, null, Date.now())).toBe(0)
      expect(elapsedPercent(0, 100, Date.now())).toBe(0)
    })

    it("computes the percentage of the act elapsed", () => {
      const start = 1_000_000
      expect(elapsedPercent(start, 100, start + 25_000)).toBe(25)
      expect(elapsedPercent(start, 100, start + 50_000)).toBe(50)
    })

    it("clamps at 0 and 100 so the bar never overflows", () => {
      const start = 1_000_000
      expect(elapsedPercent(start, 100, start - 5_000)).toBe(0)
      expect(elapsedPercent(start, 100, start + 999_000)).toBe(100)
    })
  })

  describe("timerTone", () => {
    it("is green below the red threshold", () => {
      expect(timerTone(0)).toBe("green")
      expect(timerTone(50)).toBe("green")
      expect(timerTone(TIMER_RED_THRESHOLD_PCT - 1)).toBe("green")
    })

    it("is red at and beyond the threshold", () => {
      expect(timerTone(TIMER_RED_THRESHOLD_PCT)).toBe("red")
      expect(timerTone(100)).toBe("red")
    })
  })

  describe("timerBarClass", () => {
    it("uses the faded fill until the timer starts", () => {
      expect(timerBarClass(0, false)).toContain("emerald-500/40")
    })

    it("uses solid traffic-light fills once running", () => {
      expect(timerBarClass(10, true)).toContain("emerald-500")
      expect(timerBarClass(90, true)).toContain("red-600")
    })
  })
})
