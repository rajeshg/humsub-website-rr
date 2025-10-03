import { cloudflare } from "@cloudflare/vite-plugin"
import mdx from "@mdx-js/rollup"
import { reactRouter } from "@react-router/dev/vite"
import tailwindcss from "@tailwindcss/vite"
import rehypePrettyCode from "rehype-pretty-code"
import remarkFrontmatter from "remark-frontmatter"
import remarkMdxFrontmatter from "remark-mdx-frontmatter"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"
import { imageManifestPlugin } from "./vite-plugin-image-manifest"

export default defineConfig({
	server: { port: 3000 },
	plugins: [
		imageManifestPlugin(),
		cloudflare({ viteEnvironment: { name: "ssr" } }),
		tailwindcss(),
		mdx({
			remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
			rehypePlugins: [rehypePrettyCode],
		}),
		reactRouter(),
		tsconfigPaths(),
	],
})
