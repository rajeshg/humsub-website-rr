import { describe, expect, it } from "vitest"
import { SPONSOR_DISPLAY_SECONDS, getFillerSlideDurationSeconds, slugifySponsorName } from "../sponsors"

describe("sponsors", () => {
  describe("slugifySponsorName", () => {
    it("slugifies names the same way slide files are named", () => {
      expect(slugifySponsorName("Himanshu & Parul Shah")).toBe("himanshu-and-parul-shah")
      expect(slugifySponsorName("Town of Cary, NC")).toBe("town-of-cary-nc")
      expect(slugifySponsorName("SAM IT Solutions")).toBe("sam-it-solutions")
    })
  })

  describe("getFillerSlideDurationSeconds", () => {
    it("resolves per-sponsor slides to their level timing", () => {
      expect(getFillerSlideDurationSeconds("/assets/stage-timer/filler/HD2026-sponsor-sam-it-solutions.png")).toBe(
        SPONSOR_DISPLAY_SECONDS.diamond
      )
      expect(getFillerSlideDurationSeconds("/assets/stage-timer/filler/HD2026-sponsor-raj-jewels.png")).toBe(
        SPONSOR_DISPLAY_SECONDS.gold
      )
      expect(getFillerSlideDurationSeconds("/assets/stage-timer/filler/HD2026-sponsor-lune-spark.png")).toBe(
        SPONSOR_DISPLAY_SECONDS.silver
      )
      expect(
        getFillerSlideDurationSeconds("/assets/stage-timer/filler/HD2026-sponsor-sudha-and-satpal-rathie.png")
      ).toBe(SPONSOR_DISPLAY_SECONDS.bronze)
      expect(getFillerSlideDurationSeconds("/assets/stage-timer/filler/HD2026-sponsor-town-of-cary-nc.png")).toBe(
        SPONSOR_DISPLAY_SECONDS.grantor
      )
    })

    it("handles the special slides", () => {
      expect(getFillerSlideDurationSeconds("/assets/stage-timer/filler/HD2026-prime-sponsors.png")).toBe(
        SPONSOR_DISPLAY_SECONDS.prime
      )
      expect(getFillerSlideDurationSeconds("/assets/stage-timer/filler/HD2026-grantors.png")).toBe(
        SPONSOR_DISPLAY_SECONDS.grantor
      )
      expect(getFillerSlideDurationSeconds("/assets/stage-timer/filler/HD2026-welcome.png")).toBe(8)
    })

    it("falls back for unknown files", () => {
      expect(getFillerSlideDurationSeconds("/assets/stage-timer/filler/some-old-photo.webp")).toBe(5)
    })
  })
})
