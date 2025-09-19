import path from "node:path"
import { defineConfig } from "vitest/config"

export default defineConfig({
	test: {
		environment: "jsdom",
		setupFiles: ["./test/setup.ts"],
		globals: true,
		css: true,
		coverage: {
			provider: "v8",
			reporter: ["text", "json", "html", "lcov"],
			reportsDirectory: "./coverage",
			exclude: [
				"node_modules/",
				"test/",
				"**/*.test.{ts,tsx}",
				"**/__tests__/",
				"build/",
				"public/",
				"*.config.{js,ts}",
				".github/",
			],
		},
		reporters: ["default", "junit"],
		outputFile: {
			junit: "./test-results.xml",
		},
	},
	resolve: {
		alias: {
			"~": path.resolve(__dirname, "./app"),
		},
	},
})
