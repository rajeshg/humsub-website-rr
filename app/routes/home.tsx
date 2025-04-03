import type { Route } from "./+types/home";
import { Welcome } from "~/components/welcome";
import { getBindings } from "~/middleware/bindings.server";
import { getStore } from "~/middleware/store.client";
import { getAllEvents } from "./events-home";
import { type Event } from "~/routes/events-home";

export async function loader({ context }: Route.LoaderArgs) {
  let { KV } = getBindings(context);
  let value = await KV.get("upcomingEvents");

  if (!value) {
    const events = await getAllEvents();
    const upcomingEvents = events.filter(event => new Date(event.frontmatter.startDate) >= new Date()).sort((a, b) => new Date(a.frontmatter.startDate).getTime() - new Date(b.frontmatter.startDate).getTime()).slice(0, 3);
  
    value = JSON.stringify(upcomingEvents);
    await KV.put("upcomingEvents", value, {
      expirationTtl: 60 * 60 * 24, // 1 day
    });
  }
  
  return { upcomingEvents: value };
}

export async function clientLoader({
  serverLoader,
  context,
}: Route.ClientLoaderArgs) {
  let store = getStore(context);
  if (store.has("upcomingEvents")) return { upcomingEvents: store.get("upcomingEvents") as string };
  let serverData = await serverLoader();
  store.set("upcomingEvents", serverData.upcomingEvents);
  return serverData
}

export default function Home({ loaderData }: Route.ComponentProps) {
  if (!loaderData.upcomingEvents) {
    return <div>Loading...</div>;
  }
  const upcomingEvents = JSON.parse(loaderData.upcomingEvents) as Event[];
  return <Welcome events={upcomingEvents} />;
}
