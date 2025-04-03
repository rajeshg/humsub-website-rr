// Still paying dividends: https://github.com/pcattori/remix-blog-mdx/tree/main/app/routes

export type Frontmatter = {
  title: string;
  description: string;
  published: string; // YYYY-MM-DD
  featured: boolean;
};

export type PostMeta = {
  slug: string;
  frontmatter: Frontmatter;
};

export const getPosts = async (): Promise<PostMeta[]> => {
  const modules = import.meta.glob<{ frontmatter: Frontmatter }>(
    "./content/blog-posts/*.mdx",
    { eager: true },
  );

  const build = await import("virtual:react-router/server-build");

  const posts = Object.entries(modules).map(([file, post]) => {
    const id = file.replace("./", "").replace(/\.mdx$/, "");
    const slug = build.routes[id]?.path;

    if (slug === undefined) throw new Error(`No route for ${id}`);

    return {
      slug,
      frontmatter: post.frontmatter,
    };
  });
  return sortBy(posts, (post) => post.frontmatter.published, "desc");
};

export const getFeaturedOrLatestPosts = async (): Promise<PostMeta[]> => {
  let posts = await getPosts();
  
  posts = posts.slice(0, 3).map((post, index) => ({
    ...post,
    frontmatter: {
      ...post.frontmatter,
      featured: index <= 2, // Mark the latest post as featured
    },
  }));

  const featuredPosts = posts.filter((post) => post.frontmatter.featured);
  return featuredPosts;
};

function sortBy<T>(
  arr: T[],
  key: (item: T) => any,
  dir: "asc" | "desc" = "asc",
) {
  return arr.sort((a, b) => {
    const res = compare(key(a), key(b));
    return dir === "asc" ? res : -res;
  });
}

function compare<T>(a: T, b: T): number {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}
