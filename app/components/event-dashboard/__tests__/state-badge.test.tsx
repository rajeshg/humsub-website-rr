import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import "@testing-library/jest-dom"
import type { Item } from "~/counter"
import { StateBadge } from "../state-badge"

describe("StateBadge", () => {
	it("should return null for NONE state", () => {
		const { container } = render(<StateBadge state="NONE" />)
		expect(container.firstChild).toBeNull()
	})

	it("should render badge for CHECKED IN state", () => {
		render(<StateBadge state="CHECKED IN" />)

		expect(screen.getByText("CHECKED IN")).toBeInTheDocument()

		// Check for correct styling classes
		const badge = screen.getByText("CHECKED IN").closest("div")
		expect(badge).toHaveClass("text-sky-700", "dark:text-sky-200")
		expect(badge).toHaveClass("bg-sky-100", "dark:bg-sky-900/30")
	})

	it("should render badge for BACKSTAGE state", () => {
		render(<StateBadge state="BACKSTAGE" />)

		expect(screen.getByText("BACKSTAGE")).toBeInTheDocument()

		const badge = screen.getByText("BACKSTAGE").closest("div")
		expect(badge).toHaveClass("text-violet-700", "dark:text-violet-200")
		expect(badge).toHaveClass("bg-violet-100", "dark:bg-violet-900/30")
	})

	it("should render badge for PERFORMING state", () => {
		render(<StateBadge state="PERFORMING" />)

		expect(screen.getByText("PERFORMING (ON STAGE)")).toBeInTheDocument()

		const badge = screen.getByText("PERFORMING (ON STAGE)").closest("div")
		expect(badge).toHaveClass("text-emerald-700", "dark:text-emerald-200")
		expect(badge).toHaveClass("bg-emerald-100", "dark:bg-emerald-900/30")
	})

	it("should render badge for READY TO GO state", () => {
		render(<StateBadge state="READY TO GO" />)

		expect(screen.getByText("READY TO GO")).toBeInTheDocument()

		const badge = screen.getByText("READY TO GO").closest("div")
		expect(badge).toHaveClass("text-amber-700", "dark:text-amber-200")
		expect(badge).toHaveClass("bg-amber-100", "dark:bg-amber-900/30")
	})

	it("should render badge for DONE state", () => {
		render(<StateBadge state="DONE" />)

		expect(screen.getByText("DONE")).toBeInTheDocument()
	})

	it("should render badge for IN PROGRESS state", () => {
		render(<StateBadge state="IN PROGRESS" />)

		expect(screen.getByText("IN PROGRESS")).toBeInTheDocument()
	})

	it("should have consistent structure and styling", () => {
		render(<StateBadge state="CHECKED IN" />)

		const badge = screen.getByText("CHECKED IN").closest("div")

		// Check for consistent structure
		expect(badge).toHaveClass("flex", "items-center", "gap-4")
		expect(badge).toHaveClass("px-6", "py-3", "rounded-md")
		expect(badge).toHaveClass("shadow-md")
		expect(badge).toHaveClass("border-2", "border-slate-200", "dark:border-slate-700")

		// Check text styling
		const text = screen.getByText("CHECKED IN")
		expect(text).toHaveClass("font-bold", "uppercase")
		expect(text).toHaveClass("text-lg", "md:text-2xl", "tracking-wider")
	})

	it("should handle edge cases with unknown states gracefully", () => {
		// This tests the fallback behavior when an unknown state is passed
		render(<StateBadge state={"UNKNOWN_STATE" as Item["state"]} />)

		// Should render with fallback NONE styling but show the state text
		expect(screen.getByText("UNKNOWN_STATE")).toBeInTheDocument()

		const badge = screen.getByText("UNKNOWN_STATE").closest("div")
		expect(badge).toHaveClass("text-muted-foreground")
		expect(badge).toHaveClass("bg-transparent")
	})
})
