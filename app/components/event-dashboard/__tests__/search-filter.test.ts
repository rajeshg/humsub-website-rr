import { describe, expect, it } from "vitest"
import type { Item } from "~/counter"
import { filterItemsBySearch, matchesSearch, normalizeSearchText } from "../search-filter"

const item = (overrides: Partial<Item> = {}): Item =>
  ({
    itemId: "#05 HD_3081",
    name: "Dancing Queens",
    type: "PERFORMANCE",
    state: "NONE",
    timer_start_time: null,
    duration: "03:42",
    durationSeconds: 222,
    description: "Folk/Fusion performance coordinated by Shradha Nagar for 17 and above age group.",
    style: "Folk/Fusion",
    teamSize: 14,
    choreographers: "Shradha Nagar",
    eventTime: "10:20:00 AM",
    rehearsalTime: "9:10:00 AM",
    ...overrides,
  }) as Item

describe("search-filter", () => {
  describe("normalizeSearchText", () => {
    it("lowercases, drops # and collapses whitespace", () => {
      expect(normalizeSearchText("  #05  HD_3081 ")).toBe("05 hd_3081")
      expect(normalizeSearchText(null)).toBe("")
    })
  })

  describe("matchesSearch", () => {
    it("matches empty query", () => {
      expect(matchesSearch(item(), "")).toBe(true)
      expect(matchesSearch(item(), "   ")).toBe(true)
    })

    it("matches by item id, number, or HD code", () => {
      expect(matchesSearch(item(), "HD_3081")).toBe(true)
      expect(matchesSearch(item(), "3081")).toBe(true)
      expect(matchesSearch(item(), "#05")).toBe(true)
      expect(matchesSearch(item(), "05")).toBe(true)
    })

    it("matches by name case-insensitively", () => {
      expect(matchesSearch(item(), "dancing queens")).toBe(true)
      expect(matchesSearch(item(), "DANCING")).toBe(true)
    })

    it("matches by choreographer", () => {
      expect(matchesSearch(item(), "shradha")).toBe(true)
      expect(matchesSearch(item(), "Shradha Nagar")).toBe(true)
    })

    it("matches by style", () => {
      expect(matchesSearch(item(), "folk")).toBe(true)
      expect(matchesSearch(item(), "Folk/Fusion")).toBe(true)
    })

    it("rejects non-matching queries", () => {
      expect(matchesSearch(item(), "bhangra")).toBe(false)
      expect(matchesSearch(item(), "HD_3102")).toBe(false)
    })
  })

  describe("filterItemsBySearch", () => {
    it("returns all items for blank query and filters otherwise", () => {
      const items = [item(), item({ itemId: "#10 HD_3115", name: "Kaanta Laga", choreographers: "Vandana Ranjan" })]
      expect(filterItemsBySearch(items, "")).toHaveLength(2)
      const found = filterItemsBySearch(items, "kaanta")
      expect(found).toHaveLength(1)
      expect(found[0]?.itemId).toBe("#10 HD_3115")
    })
  })
})
