export default function VisionMission() {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <title>Vision & Mission | Hum Sub</title>
      <div className="not-prose max-w-4xl mx-auto py-8 md:py-12">
        <h1 className="text-4xl md:text-5xl font-black text-primary mb-10 tracking-tight">Vision & Mission</h1>

        <div className="space-y-12 text-lg leading-relaxed text-muted-foreground">
          <section className="bg-primary/5 rounded-3xl p-8 md:p-10 border border-primary/10">
            <h2 className="text-2xl font-bold text-primary mb-4">Our Vision</h2>
            <p className="text-foreground font-medium italic">
              "To share the wide, varied culture and heritage of India with the communities of the North Carolina
              Triangle area and beyond through family-oriented cultural events geared toward learning, diversity
              awareness and inclusivity while helping to build a stronger foundation for our next generation."
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 border-b pb-2">Our Mission</h2>
            <p>
              Hum Sub's mission is to spread awareness of the social and cultural traditions of India in the Triangle
              area and beyond. We do so by promoting, supporting and organizing family-oriented events throughout the
              year that generate greater cultural awareness to build a foundation of inclusivity, harmony and
              appreciation of the value of diversity amongst our citizenry.
            </p>
            <p className="mt-4">
              Our focal areas include Youth Leadership, Community Outreach, Senior Citizen Inclusion just to name a few.
              We partner with local arts and cultural agencies, as well as with town governments, so that all our events
              and activities are easily accessible to the broader Triangle area and include and attract participation
              from the entire community.
            </p>
          </section>

          <section className="bg-muted/30 rounded-3xl p-8 border border-muted">
            <h2 className="text-2xl font-bold text-foreground mb-4">Core Focus</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none pl-0 font-medium text-foreground">
              <li className="flex items-center gap-3 bg-background p-4 rounded-xl border shadow-sm">
                <span className="text-primary font-bold">✓</span>
                <span>Youth Leadership</span>
              </li>
              <li className="flex items-center gap-3 bg-background p-4 rounded-xl border shadow-sm">
                <span className="text-primary font-bold">✓</span>
                <span>Community Outreach</span>
              </li>
              <li className="flex items-center gap-3 bg-background p-4 rounded-xl border shadow-sm">
                <span className="text-primary font-bold">✓</span>
                <span>Inclusivity & Diversity</span>
              </li>
              <li className="flex items-center gap-3 bg-background p-4 rounded-xl border shadow-sm">
                <span className="text-primary font-bold">✓</span>
                <span>Cultural Awareness</span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}
