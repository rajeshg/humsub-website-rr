import type { Item } from "~/counter"

export const STATE_STYLES = {
  NONE: {
    text: "text-muted-foreground",
    bg: "bg-transparent",
    barColor: "bg-gray-200 dark:bg-gray-700",
    icon: "",
    label: "",
  },
  "CHECKED IN": {
    text: "text-sky-700 dark:text-sky-200",
    bg: "bg-sky-100 dark:bg-sky-900/30",
    barColor: "bg-sky-500 dark:bg-sky-600",
    icon: "mdi:account-check",
    label: "CHECKED IN",
  },
  BACKSTAGE: {
    text: "text-violet-700 dark:text-violet-200",
    bg: "bg-violet-100 dark:bg-violet-900/30",
    barColor: "bg-violet-500 dark:bg-violet-600",
    icon: "mdi:door",
    label: "BACKSTAGE",
  },
  PERFORMING: {
    text: "text-emerald-700 dark:text-emerald-200",
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
    barColor: "bg-emerald-500 dark:bg-emerald-600",
    icon: "mdi:human-female-dance",
    label: "PERFORMING (ON STAGE)",
  },
  "READY TO GO": {
    text: "text-amber-700 dark:text-amber-200",
    bg: "bg-amber-100 dark:bg-amber-900/30",
    barColor: "bg-amber-500 dark:bg-amber-600",
    icon: "mdi:bullseye",
    label: "READY TO GO",
  },
  DONE: {
    text: "text-emerald-800 dark:text-emerald-300",
    bg: "bg-emerald-100 dark:bg-emerald-900/40",
    barColor: "bg-emerald-600 dark:bg-emerald-700",
    icon: "mdi:check-circle",
    label: "DONE",
  },
  "IN PROGRESS": {
    text: "text-amber-800 dark:text-amber-200",
    bg: "bg-amber-100 dark:bg-amber-900/30",
    barColor: "bg-amber-500 dark:bg-amber-600",
    icon: "mdi:clock-start",
    label: "IN PROGRESS",
  },
} as const

export const getStateBgColor = (state: Item["state"]) => {
  return (STATE_STYLES[state as keyof typeof STATE_STYLES] || STATE_STYLES.NONE).barColor
}

export const getStateLabel = (state: Item["state"]) => {
  switch (state) {
    case "PERFORMING":
      return "On Stage"
    case "READY TO GO":
      return "Next"
    case "CHECKED IN":
      return "Checked In"
    case "IN PROGRESS":
      return "In Progress"
    default:
      return state
  }
}
