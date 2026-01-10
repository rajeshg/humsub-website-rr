import { describe, expect, it } from "vitest"
import type { Item } from "~/counter"
import { STATE_STYLES, getStateBgColor, getStateLabel } from "../event-constants"

describe("event-constants", () => {
  describe("STATE_STYLES", () => {
    it("should have all required state styles", () => {
      const expectedStates = ["NONE", "CHECKED IN", "BACKSTAGE", "PERFORMING", "READY TO GO", "DONE", "IN PROGRESS"]

      for (const state of expectedStates) {
        expect(STATE_STYLES).toHaveProperty(state)
        expect(STATE_STYLES[state as keyof typeof STATE_STYLES]).toHaveProperty("text")
        expect(STATE_STYLES[state as keyof typeof STATE_STYLES]).toHaveProperty("bg")
        expect(STATE_STYLES[state as keyof typeof STATE_STYLES]).toHaveProperty("barColor")
        expect(STATE_STYLES[state as keyof typeof STATE_STYLES]).toHaveProperty("icon")
        expect(STATE_STYLES[state as keyof typeof STATE_STYLES]).toHaveProperty("label")
      }
    })

    it("should have correct color schemes for performance states", () => {
      expect(STATE_STYLES["CHECKED IN"].text).toContain("sky")
      expect(STATE_STYLES["CHECKED IN"].barColor).toContain("sky")

      expect(STATE_STYLES.BACKSTAGE.text).toContain("violet")
      expect(STATE_STYLES.BACKSTAGE.barColor).toContain("violet")

      expect(STATE_STYLES.PERFORMING.text).toContain("emerald")
      expect(STATE_STYLES.PERFORMING.barColor).toContain("emerald")

      expect(STATE_STYLES["READY TO GO"].text).toContain("amber")
      expect(STATE_STYLES["READY TO GO"].barColor).toContain("amber")
    })

    it("should have icons for performance states", () => {
      expect(STATE_STYLES["CHECKED IN"].icon).toBe("mdi:account-check")
      expect(STATE_STYLES.BACKSTAGE.icon).toBe("mdi:door")
      expect(STATE_STYLES.PERFORMING.icon).toBe("mdi:human-female-dance")
      expect(STATE_STYLES.DONE.icon).toBe("mdi:check-circle")
    })
  })

  describe("getStateBgColor", () => {
    it("should return correct background colors for valid states", () => {
      expect(getStateBgColor("CHECKED IN")).toBe("bg-sky-500 dark:bg-sky-600")
      expect(getStateBgColor("BACKSTAGE")).toBe("bg-violet-500 dark:bg-violet-600")
      expect(getStateBgColor("PERFORMING")).toBe("bg-emerald-500 dark:bg-emerald-600")
      expect(getStateBgColor("READY TO GO")).toBe("bg-amber-500 dark:bg-amber-600")
      expect(getStateBgColor("DONE")).toBe("bg-emerald-600 dark:bg-emerald-700")
    })

    it("should return NONE style for invalid states", () => {
      expect(getStateBgColor("INVALID_STATE" as Item["state"])).toBe("bg-gray-200 dark:bg-gray-700")
    })

    it("should return NONE style for NONE state", () => {
      expect(getStateBgColor("NONE")).toBe("bg-gray-200 dark:bg-gray-700")
    })
  })

  describe("getStateLabel", () => {
    it("should return user-friendly labels for performance states", () => {
      expect(getStateLabel("PERFORMING")).toBe("On Stage")
      expect(getStateLabel("READY TO GO")).toBe("Next")
      expect(getStateLabel("CHECKED IN")).toBe("Checked In")
      expect(getStateLabel("IN PROGRESS")).toBe("In Progress")
    })

    it("should return the original state for unmapped states", () => {
      expect(getStateLabel("BACKSTAGE")).toBe("BACKSTAGE")
      expect(getStateLabel("DONE")).toBe("DONE")
      expect(getStateLabel("NONE")).toBe("NONE")
    })

    it("should handle edge cases gracefully", () => {
      expect(getStateLabel("INVALID_STATE" as Item["state"])).toBe("INVALID_STATE")
    })
  })

  describe("consistency checks", () => {
    it("should have consistent state definitions between STATE_STYLES and helper functions", () => {
      const stateStyleKeys = Object.keys(STATE_STYLES)

      for (const state of stateStyleKeys) {
        // getStateBgColor should not throw
        expect(() => getStateBgColor(state as Item["state"])).not.toThrow()

        // getStateLabel should not throw
        expect(() => getStateLabel(state as Item["state"])).not.toThrow()
      }
    })

    it("should have dark mode variants for all color properties", () => {
      for (const style of Object.values(STATE_STYLES)) {
        if (style.text && style.text !== "text-muted-foreground") {
          expect(style.text).toMatch(/dark:/)
        }
        if (style.bg && style.bg !== "bg-transparent") {
          expect(style.bg).toMatch(/dark:/)
        }
        if (style.barColor) {
          expect(style.barColor).toMatch(/dark:/)
        }
      }
    })
  })
})
