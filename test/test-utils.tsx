import { type RenderOptions, render } from "@testing-library/react"
import type { ReactElement } from "react"

// Custom render function for tests
export function renderComponent(ui: ReactElement, options?: RenderOptions) {
	return render(ui, options)
}

// Mock WebSocket helpers for tests
export class TestWebSocket {
	static instances: TestWebSocket[] = []

	onopen: ((event: Event) => void) | null = null
	onmessage: ((event: MessageEvent) => void) | null = null
	onclose: ((event: CloseEvent) => void) | null = null
	onerror: ((event: Event) => void) | null = null

	url: string

	constructor(url: string) {
		this.url = url
		TestWebSocket.instances.push(this)
	}

	send(data: string) {
		// Mock implementation for testing
		void data
	}

	close() {
		const index = TestWebSocket.instances.indexOf(this)
		if (index > -1) {
			TestWebSocket.instances.splice(index, 1)
		}
	}

	// Test helper to simulate receiving a message
	simulateMessage(data: unknown) {
		if (this.onmessage) {
			this.onmessage(new MessageEvent("message", { data: JSON.stringify(data) }))
		}
	}

	// Test helper to simulate connection opening
	simulateOpen() {
		if (this.onopen) {
			this.onopen(new Event("open"))
		}
	}

	// Clear all instances for test cleanup
	static clearInstances() {
		TestWebSocket.instances = []
	}
}
