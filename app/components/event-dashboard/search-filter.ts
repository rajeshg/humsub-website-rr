import type { Item, PerformanceItem } from "~/counter"

// Normalize for search: lowercase, drop "#" (so "#05" matches "05"),
// collapse whitespace. Kept deliberately simple - plain substring match.
export const normalizeSearchText = (value: string | null | undefined): string =>
  (value ?? "").toLowerCase().replace(/#/g, "").replace(/\s+/g, " ").trim()

// Fields searched: slot/item id, name, choreographer(s), style.
export const matchesSearch = (item: Item, query: string): boolean => {
  const q = normalizeSearchText(query)
  if (!q) return true
  const perf = item as Partial<PerformanceItem>
  const haystack = normalizeSearchText(
    [item.itemId, item.name, perf.choreographers, perf.style].filter(Boolean).join(" ")
  )
  return haystack.includes(q)
}

export const filterItemsBySearch = (items: Item[], query: string): Item[] => {
  if (!normalizeSearchText(query)) return items
  return items.filter((item) => matchesSearch(item, query))
}
