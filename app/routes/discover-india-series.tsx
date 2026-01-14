export default function DiscoverIndiaSeries() {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <title>Discover India Series | Hum Sub</title>
      <h1 className="text-3xl md:text-5xl font-black text-primary mb-6">Discover India Series</h1>

      <figure className="mb-10 shadow-2xl rounded-3xl overflow-hidden border bg-muted/5">
        <img
          src="/assets/discover-india-series-2025.jpeg"
          alt="Discover India Series 2025"
          className="w-full h-auto object-cover max-h-[500px]"
        />
      </figure>

      <div className="text-lg leading-relaxed text-muted-foreground mb-12 max-w-4xl">
        <p>
          Hum Sub's Discover India Series offers engaging workshops and presentations that explore India's rich culture.
          Learn about Indian art, music, dance, food, and traditions through interactive sessions led by experts. Open
          to all ages and backgrounds, this series is a great way to discover and celebrate the beauty of Indian
          culture.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 not-prose">
        {[
          {
            title: "The Indian spice story",
            presenter: "Nikhat Khan and Taruja Borker",
            details: [
              "May 3, Saturday, Eva Perry library, 3:30 to 4:30 pm",
              "Sept 7, Sunday, Cary Regional Library, 2 pm to 4 pm",
            ],
            description:
              "Spices have long been intertwined with India's trade history. Dive into the aromatic sea of Indian spices at this talk and walk out with a “secret” recipe or two!",
            link: "https://nccaryweb.myvscloud.com/webtrac/web/iteminfo.html?Module=AR&FMID=32492554&InterfaceParameter=WebTrac",
          },
          {
            title: "Bollywood 101",
            presenter: "Sanskrit Inamdar and team",
            details: ["May 22, Thursday, 6:30 pm to 8:30 pm, Herbert C Young Community Center"],
            description:
              "Join us for a fun, interactive session as we walk you through the typical themes of Hindi-language films, their song-and-dance routines, and more!",
            link: "https://nccaryweb.myvscloud.com/webtrac/web/iteminfo.html?Module=AR&FMID=32494597&InterfaceParameter=WebTrac",
          },
          {
            title: "Making Waves with Weaves",
            presenter: "Hum Sub team and volunteers",
            details: ["Aug 9-17, Apex Town Hall"],
            description:
              "Get a ringside view of India's eclectic tradition in handwoven textiles, from sheer muslins to heavy silks.",
          },
          {
            title: "Sounds of Unity",
            presenter: "Gowri Srinivas, Purvi Patel, Partha Aji, and Sandeep Hattangady",
            details: ["Aug 23, 3:30 - 4:30 pm, Eva Perry library"],
            description:
              "Catch the soul stirring sounds of Indian string, wind, and percussion instruments in an intimate library setting.",
          },
          {
            title: "Exhibition at the State Capitol",
            presenter: "Hum Sub team and community volunteers",
            details: ["Sept 5-Sept 30, State Capitol"],
            description:
              "A month-long exhibition featuring Indian marriage traditions, Hindu temples, and Indian-American corporate and academic contributions.",
          },
          {
            title: "Diwali at the Library",
            presenter: "Hum Sub team and Ramya Desika, Gond artist",
            details: ["Oct 17-22, Morrisville library"],
            description:
              "Imbibe the spirit of Diwali at this weeklong exhibition of Indian artifacts and weaving traditions.",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-muted/30 rounded-2xl p-6 border border-muted shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-bold text-primary mb-3">{item.title}</h2>
            <div className="space-y-3 text-sm">
              <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              <div>
                <span className="font-bold text-primary/70 uppercase text-[10px] tracking-widest block mb-1">
                  Presenter
                </span>
                <p className="font-semibold">{item.presenter}</p>
              </div>
              <div>
                <span className="font-bold text-primary/70 uppercase text-[10px] tracking-widest block mb-1">
                  Schedule
                </span>
                <ul className="space-y-1">
                  {item.details.map((d, i) => (
                    <li key={i} className="font-medium">
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block mt-2 text-primary font-bold hover:underline"
                >
                  Register Now →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
