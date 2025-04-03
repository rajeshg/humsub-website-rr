import { Outlet } from "react-router";
import { preload } from "react-dom";
import blogCss from "~/blog.css?url";

export async function clientLoader() {
  preload(blogCss, { as: "style" });
  return {};
}

export default function Events() {
  return (
    <>
      <title>Events | Hum Sub</title>
      <meta
        name="description"
        content="Upcoming events and activities at Hum Sub"
      />
      <link href={blogCss} rel="stylesheet" />
      <Outlet />
    </>
  );
}
