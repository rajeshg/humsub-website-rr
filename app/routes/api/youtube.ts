// This will fetch videos on the server and send them to the client without exposing the API key.

import { env } from "cloudflare:workers"
import type { Route } from "./+types/youtube"

const CHANNEL_ID = "UCAAnYBbBb9gJ2cNOeG7lfNQ"
const MAX_RESULTS = 50

type YouTubeSearchResponse = {
  items: {
    id: {
      videoId: string
    }
  }[]
  nextPageToken?: string
}

export async function loader({ request }: Route.LoaderArgs) {
  const cachedVideos = await env.KV.get("youtube-videos")
  const YOUTUBE_API_KEY = env.YOUTUBE_API_KEY

  if (cachedVideos) {
    return {
      videos: JSON.parse(cachedVideos),
    }
  }

  // If not cached, fetch the videos from YouTube API
  console.warn("Cache MISS. Fetching videos from YouTube API")
  let videos: string[] = []
  const requestUrl = new URL(request.url)
  let nextPageToken = requestUrl.searchParams.get("nextPageToken") || undefined

  try {
    do {
      let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${MAX_RESULTS}&order=date&type=video&channelId=${CHANNEL_ID}&key=${YOUTUBE_API_KEY}`
      if (nextPageToken) {
        url += `&pageToken=${nextPageToken}`
      }
      const response = await fetch(url)
      const data = (await response.json()) as YouTubeSearchResponse
      videos = [...videos, ...data.items.map((item) => item.id.videoId)]
      nextPageToken = data.nextPageToken || ""
    } while (nextPageToken)
  } catch (error) {
    console.error("error", error)
    return new Response(JSON.stringify({ error: "Failed to fetch videos" }), {
      status: 500,
    })
  }
  // put the videos in the cache
  try {
    await env.KV.put("youtube-videos", JSON.stringify(videos), {
      expirationTtl: 60 * 60 * 24, // Cache for 1 day
    })
  } catch (error) {
    console.error("Error caching videos:", error)
  }

  return new Response(
    JSON.stringify({
      videos,
    })
  )
}
