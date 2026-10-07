import { describe, expect, it } from "vitest"
import {
  FILLER_GRANTORS_SECONDS,
  FILLER_PROMO_SECONDS,
  FILLER_SLIDE_SECONDS,
  FILLER_WELCOME_SECONDS,
  SPONSOR_DISPLAY_SECONDS,
  getFillerSlideDurationSeconds,
  slugifySponsorName,
} from "../sponsors"

describe("sponsors", () => {
  describe("slugifySponsorName", () => {
    it("slugifies names the same way slide files are named", () => {
      expect(slugifySponsorName("Himanshu & Parul Shah")).toBe("himanshu-and-parul-shah")
      expect(slugifySponsorName("Town of Cary, NC")).toBe("town-of-cary-nc")
      expect(slugifySponsorName("SAM IT Solutions")).toBe("sam-it-solutions")
    })
  })

  describe("getFillerSlideDurationSeconds", () => {
    // Large slides are intentionally shown longer than the small corner rotation
    it("gives large slides more time than the corner rotation", () => {
      for (const value of Object.values(FILLER_SLIDE_SECONDS)) {
        expect(value).toBeGreaterThan(Math.max(...Object.values(SPONSOR_DISPLAY_SECONDS)))
      }
      expect(FILLER_WELCOME_SECONDS).toBeGreaterThan(8)
      expect(FILLER_PROMO_SECONDS).toBeGreaterThanOrEqual(FILLER_WELCOME_SECONDS)
    })

    it("resolves per-sponsor slides to their level timing", () => {
      expect(getFillerSlideDurationSeconds("/assets/stage-timer/filler/HD2026-sponsor-sam-it-solutions.png")).toBe(
        FILLER_SLIDE_SECONDS.diamond
      )
      expect(getFillerSlideDurationSeconds("/assets/stage-timer/filler/HD2026-sponsor-raj-jewels.png")).toBe(
        FILLER_SLIDE_SECONDS.gold
      )
      expect(getFillerSlideDurationSeconds("/assets/stage-timer/filler/HD2026-sponsor-lune-spark.png")).toBe(
        FILLER_SLIDE_SECONDS.silver
      )
      expect(
        getFillerSlideDurationSeconds("/assets/stage-timer/filler/HD2026-sponsor-sudha-and-satpal-rathie.png")
      ).toBe(FILLER_SLIDE_SECONDS.bronze)
      expect(getFillerSlideDurationSeconds("/assets/stage-timer/filler/HD2026-sponsor-town-of-cary-nc.png")).toBe(
        FILLER_SLIDE_SECONDS.grantor
      )
    })

    it("handles the special slides", () => {
      expect(getFillerSlideDurationSeconds("/assets/stage-timer/filler/HD2026-prime-sponsors.png")).toBe(
        FILLER_SLIDE_SECONDS.prime
      )
      expect(getFillerSlideDurationSeconds("/assets/stage-timer/filler/HD2026-grantors.png")).toBe(
        FILLER_GRANTORS_SECONDS
      )
      expect(getFillerSlideDurationSeconds("/assets/stage-timer/filler/HD2026-welcome.png")).toBe(
        FILLER_WELCOME_SECONDS
      )
    })

    it("gives the text-heavy promo flyers the longest dwell", () => {
      expect(getFillerSlideDurationSeconds("/assets/stage-timer/filler/HD2026-promo-tgt-2026.png")).toBe(
        FILLER_PROMO_SECONDS
      )
      expect(getFillerSlideDurationSeconds("/assets/stage-timer/filler/HD2026-promo-sound-of-us.png")).toBe(
        FILLER_PROMO_SECONDS
      )
    })

    it("falls back for unknown files", () => {
      expect(getFillerSlideDurationSeconds("/assets/stage-timer/filler/some-old-photo.webp")).toBeGreaterThan(0)
    })
  })
})
