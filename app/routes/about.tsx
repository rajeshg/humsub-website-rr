export default function About() {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <title>About | Hum Sub</title>
      <div className="not-prose max-w-4xl mx-auto py-8 md:py-12">
        <h1 className="text-4xl md:text-5xl font-black text-primary mb-10 tracking-tight">About Hum Sub</h1>

        <div className="space-y-12 text-lg leading-relaxed text-muted-foreground">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 border-b pb-2">Who we are</h2>
            <p>
              Hum Sub is a non-profit organization dedicated to share the social and cultural traditions of India with
              residents of the North Carolina Triangle area and beyond. Membership and participation is open to all
              people who are interested in promoting and/or appreciating Indian culture and history.
            </p>
            <p className="mt-4">
              Since its inception, Hum Sub's primary focus has been to promote, support and organize family-oriented
              cultural activities to help build a stronger foundation for the youth in our community. We rely entirely
              on community support and local business sponsorships to make our programs and events possible.
            </p>
          </section>

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
          </section>

          <section className="bg-muted/30 rounded-3xl p-8 border border-muted">
            <h2 className="text-2xl font-bold text-foreground mb-6">How it all began</h2>
            <p className="mb-6">
              The Hindi phrase <span className="font-bold text-primary">"Hum Sub"</span> means{" "}
              <span className="italic">"All of us."</span> Hum Sub, Inc. was founded in 2001 by a group of Indian
              Americans living in the Triangle area of NC, to address the growing need to share India's diverse and
              colorful cultural heritage with the local community at large.
            </p>

            <div className="bg-background rounded-2xl p-6 shadow-sm border mb-6">
              <p className="font-bold text-sm uppercase tracking-widest text-primary/70 mb-4">The Founding Families</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 list-none pl-0 text-sm font-medium text-foreground">
                <li>• Poonam and Dr. Ajay Ajmani</li>
                <li>• Mamta and Pradeep Bisarya</li>
                <li>• Madhu and Inder Dev</li>
                <li>• Pam and Dilip Gandhi</li>
                <li>• Poonam and Gyan Gupta</li>
                <li>• Bimal Shah</li>
                <li>• Ritu and DK Singh</li>
              </ul>
            </div>

            <p>
              After their first successful sold-out event, Basant Bahar, the group approached the Town of Cary with the
              idea of a public partnership. The first Cary Diwali was held with a record crowd of over 2500 people.
              Since then, both Basant Bahar and Cary Diwali have grown into signature Triangle events. Hum Sub Diwali is
              now the biggest free-to-attend event of its kind in the southeastern United States.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
