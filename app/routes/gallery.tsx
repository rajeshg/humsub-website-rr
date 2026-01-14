import { useEffect } from "react"
import { useSearchParams } from "react-router"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import YoutubeGallery from "~/components/youtube-gallery"

export default function GalleryPage() {
  const [searchParams, setSearchParams] = useSearchParams()

  const view = searchParams.get("view") || "pictures"

  useEffect(() => {
    if (view !== "pictures" && !searchParams.get("view")) {
      setSearchParams({ view }, { replace: true })
    }
    if (view === "pictures" && searchParams.get("view")) {
      searchParams.delete("view")
      setSearchParams(searchParams, { replace: true })
    }
  }, [setSearchParams, searchParams, view])

  const handleTabChange = (value: string) => {
    if (value === "pictures") {
      searchParams.delete("view")
      setSearchParams(searchParams, { replace: true })
    } else {
      setSearchParams({ view: value }, { replace: true })
    }
  }

  return (
    <div className="prose dark:prose-invert max-w-none">
      <title>Gallery | Hum Sub</title>
      <h1>Gallery - Pictures & Videos</h1>

      <Tabs defaultValue={view} className="md:min-w-[800px]" onValueChange={handleTabChange}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pictures">Pictures</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
        </TabsList>
        <TabsContent value="pictures">
          <ul className="prose dark:prose-invert">
            <li>
              <a href="https://flic.kr/s/aHBqjC8Z2S">Holi 2025</a>
            </li>
            <li>
              <a href="https://flic.kr/s/aHBqjC8m6g">Basant Bahar 2025</a>
            </li>
            <li>
              <a href="https://photos.app.goo.gl/YjXYubCGCdYyfQ4b9">YAA Luncheon 2024</a>
            </li>
            <li>
              <a href="https://drive.google.com/drive/folders/1m_ddmbgVrZrToUh-79_Xn5wZuqffL3Bt?usp=sharing">
                Hum Sub Diwali 2024
              </a>
            </li>
            <li>
              <a href="https://hum-sub-basant-bahar.pictogenix.com/">Basant Bahar 2024</a>
            </li>
            <li>
              <a href="https://flic.kr/s/aHBqjB2U7L">YAA Luncheon 2023</a>
            </li>
            <li>Hum Sub Diwali 2023:</li>
            <ul>
              <li>
                <a href="https://flic.kr/s/aHBqjAYDAn">John Tal Collection</a>
              </li>
              <li>
                <a href="https://flic.kr/s/aHBqjB31Wb">ABFotos Collection</a>
              </li>
            </ul>
            <li>
              <a href="https://flic.kr/s/aHBqjATEX3">Lazy Daze - Aug 2023(Partner Event)</a>
            </li>
            <li>
              <a href="https://flic.kr/s/aHBqjAEzGx">Cultural Festival 2023 @TMSA (Partner Event)</a>
            </li>
            <li>
              <a href="https://flic.kr/s/aHBqjAEzBY">Sponsorship Dinner 2023</a>
            </li>
            <li>
              <a href="https://flic.kr/s/aHBqjABPpu">EarthFest 2023 (Partner Event)</a>
            </li>
            <li>
              <a href="https://flic.kr/s/aHBqjABTUH">Spring Daze 2023 (Partner Event)</a>
            </li>
            <li>
              <a href="https://flic.kr/s/aHBqjABSCR">Sterling International Festival 2023 (Partner Event)</a>
            </li>
            <li>
              <a href="https://flic.kr/s/aHBqjAvSQK">Basant Bahar 2023 Pictures</a>
            </li>
            <li>
              <a href="https://www.flickr.com/gp/155699555@N08/rMVgdHP0n6">Youth Achievement Award Luncheon 2022</a>
            </li>
            <li>
              <a href="https://flic.kr/s/aHBqjAbHT1">Hum Sub Diwali 2022 (Set 1)- All Pictures</a>
            </li>
            <li>Hum Sub Diwali 2022 (Set 2)</li>
            <ul>
              <li>
                <a href="https://flic.kr/s/aHBqjAbLQJ">Hum Sub Diwali 2022 - Morning Segment</a>
              </li>
              <li>
                <a href="https://flic.kr/s/aHBqjAbLS2">Hum Sub Diwali 2022 - Evening Segment</a>
              </li>
            </ul>
            <li>
              <a href="https://flic.kr/s/aHBqjACK3D">Indian Culture Learning Series 2022</a>
            </li>
            <li>
              <a href="https://flic.kr/s/aHBqjzGxgu">Basant Bahar 2022 Pictures</a>
            </li>
            <li>
              <a href="https://www.flickr.com/gp/155699555@N08/sQXd20">Cary Diwali 2021 Pictures</a>
            </li>
            <li>
              <a href="https://www.flickr.com/photos/155699555@N08/sets/72157711624058531">
                2019 Youth Achievement Award Luncheon
              </a>
            </li>
            <li>
              <a href="https://www.flickr.com/photos/155699555@N08/sets/72157711624058531">
                2019 Youth Achievement Award Luncheon
              </a>
            </li>
            <li className="">
              <a href="https://flic.kr/s/aHsmHMUWxx">Cary Diwali 2019 Pictures</a>
            </li>
            <li className="">
              <a href="https://www.flickr.com/gp/155699555@N08/B690SZ">Basant Bahar 2019 pictures</a>
            </li>
            <li>
              <a href="https://www.flickr.com/photos/155699555@N08/albums/72157673134563367">
                2018 Youth Achievement Award Luncheon Pics
              </a>
            </li>
            <li>
              <a href="https://www.flickr.com/gp/155699555@N08/ZxeM2b">Cary Diwali 2018 Pics</a>
            </li>
            <li>
              <a href="https://www.flickr.com/photos/155699555@N08/albums/72157693950842184">Basant Bahar 2018 Pics</a>
            </li>
            <li>
              <a href="https://www.flickr.com/photos/155457582@N04/albums/72157688152144823">Cary Diwali 2017 Pics</a>
            </li>
          </ul>
        </TabsContent>
        <TabsContent value="videos">{view === "videos" && <YoutubeGallery />}</TabsContent>
      </Tabs>
    </div>
  )
}
