import { type RouteConfig, index, route } from "@react-router/dev/routes";
// Use Vite's import.meta.glob to statically import MDX files
// This works at build time rather than runtime
const mdxImports = import.meta.glob('../app/blog-posts/*.mdx');

const mdxFiles = Object.entries(mdxImports).map(([importPath, _]) => {
    // Extract filename from the import path
    const fileName = importPath.split('/').pop() || '';
    return {
        path: fileName.replace('.mdx', ''),
        file: `blog-posts/${fileName}`,
    };
});

console.log('mdxFiles', mdxFiles);
export default [index("routes/home.tsx"), 
    route("blog", "routes/blog-layout.tsx", [
        index("routes/blog-home.tsx"),
        ...mdxFiles.map(({ path: routePath, file }) => route(routePath, file)),
    ])
] satisfies RouteConfig;
