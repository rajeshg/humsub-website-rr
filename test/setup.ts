import "@testing-library/jest-dom"
import { vi } from "vitest"

// Mock WebSocket globally for tests
global.WebSocket = class MockWebSocket {
	static CONNECTING = 0
	static OPEN = 1
	static CLOSING = 2
	static CLOSED = 3

	constructor(url: string) {
		this.url = url
		this.readyState = MockWebSocket.CONNECTING
		// Simulate connection opening
		setTimeout(() => {
			this.readyState = MockWebSocket.OPEN
			if (this.onopen) {
				this.onopen(new Event("open"))
			}
		}, 0)
	}

	url: string
	readyState: number
	onopen: ((event: Event) => void) | null = null
	onclose: ((event: CloseEvent) => void) | null = null
	onmessage: ((event: MessageEvent) => void) | null = null
	onerror: ((event: Event) => void) | null = null

	send(data: string) {
		// Mock implementation - silent for tests
		void data
	}

	close() {
		this.readyState = MockWebSocket.CLOSED
		if (this.onclose) {
			this.onclose(new CloseEvent("close"))
		}
	}
} as unknown as typeof WebSocket

// Mock window.location for tests
Object.defineProperty(window, "location", {
	value: {
		protocol: "http:",
		host: "localhost:3000",
	},
	writable: true,
})

// Mock Date.now for consistent testing
const originalDateNow = Date.now
let mockTime = originalDateNow()

global.Date.now = vi.fn(() => mockTime)

// Helper to control time in tests
global.setMockTime = (time: number) => {
	mockTime = time
}

global.advanceMockTime = (ms: number) => {
	mockTime += ms
}

// Mock timers
vi.stubGlobal("setInterval", vi.fn())
vi.stubGlobal("clearInterval", vi.fn())

// Mock Cloudflare Workers
vi.mock("cloudflare:workers", () => ({
	DurableObject: class MockDurableObject {},
	WebSocketPair: class MockWebSocketPair {
		constructor() {
			return [{}, {}]
		}
	},
	Response: class MockResponse {
		constructor(body: any, init?: any) {
			this.body = body
			this.init = init
		}
		body: any
		init: any
	},
}))
