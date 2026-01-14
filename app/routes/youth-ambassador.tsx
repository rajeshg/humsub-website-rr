import YACard from "~/components/ya-card"

export default function YouthAmbassador() {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <title>Youth Ambassador | Hum Sub</title>
      <div className="not-prose">
        <h1 className="text-3xl md:text-4xl font-black text-primary mb-6">Youth Ambassador</h1>
        <div className="space-y-6 text-lg leading-relaxed text-muted-foreground mb-8">
          <p>
            A key focus area for Hum Sub in recent years has been Youth Leadership. This year, we are evolving our Youth
            Ambassador (YA) Program to a two-year internship, open to 9th and 10th graders. The goal is to provide a
            platform for growing young minds for community engagement to promote Indian culture and heritage in the
            Triangle area and beyond, as well as enhance their personal/professional development skills by engaging them
            in the planning, management and decision-making processes. The broad vision here is to bring in new energy
            and knowledge to Hum Sub's mission and vision, as well as contribute to positive youth development at an
            early age and help youth grow into engaged and responsible leaders in the future.
          </p>
          <p>
            Those selected for this program should have had some volunteering experience at Hum Sub events in the past
            years or have volunteering experience with other local organizations. In keeping with our efforts to be
            diverse and inclusive, we will also open up the program to youth of non-Indian origin to serve as Youth
            Ambassadors.
          </p>
        </div>

        <figure className="mb-12 shadow-xl rounded-3xl overflow-hidden border">
          <img
            src="/assets/ya/youth-ambassadors-2022.jpg"
            alt="2022 Hum Sub Youth Ambassadors"
            title="2022 Hum Sub Youth Ambassadors"
            className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
          />
        </figure>

        <div className="bg-muted/30 rounded-2xl p-6 md:p-8 mb-12">
          <h2 className="text-2xl font-bold mb-4">Benefits of becoming a Youth Ambassador:</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none pl-0">
            {[
              "Develop individual competencies and leadership skills",
              "Develop time management skills",
              "Develop program planning, management and organizational skills",
              "Build positive self-identity and confidence through meaningful contribution to the local community",
              "Increase ability to be self-reflective and think critically about their experience",
              "Achieve recognition for community service and engagement",
            ].map((benefit, i) => (
              <li key={i} className="flex items-start gap-3 bg-background p-4 rounded-xl border shadow-sm">
                <span className="text-primary font-bold">✓</span>
                <span className="text-sm font-medium">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6 mb-12">
          <p>
            Hum Sub will involve YAs in various Hum Sub activities planned throughout the year. The goal here is to
            provide high-schoolers with a wide array of opportunities to experience and contribute to real-world program
            planning, decision making, program management and execution (on the event day) and help them develop key
            leadership skills.
          </p>
          <p className="font-bold">Specifically, some examples of YA engagement include the following:</p>
          <ol className="grid grid-cols-1 sm:grid-cols-2 gap-3 list-decimal pl-6">
            <li>Program planning</li>
            <li>Social media, publicity, and marketing</li>
            <li>Program management</li>
            <li>Program evaluation and documentation</li>
            <li className="sm:col-span-2">Networking and relationship-building with other local organizations</li>
          </ol>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold border-b pb-2 mb-6">Youth Ambassadors (2025-2026)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <YACard name="Rishi Sankaran" imagePath="/assets/ya/rishi-sankaran.jpeg" />
            <YACard name="Apaarpreet Bajaj" imagePath="/assets/ya/Apaarpreet-Bajaj.jpeg" />
            <YACard name="Ahana Satija" imagePath="/assets/ya/ahana-satija.jpeg" />
            <YACard name="Ishaan Kancharla" imagePath="/assets/ya/ishaan-kancharla.jpeg" />
            <YACard name="Janhawi Patil" imagePath="/assets/ya/janhawi-patil.jpeg" />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold border-b pb-2 mb-6">Youth Ambassadors (2024-2025)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <YACard name="Sonia Daptardar" imagePath="/assets/ya/Sonia-Daptardar.jpeg" />
            <YACard name="Ishita Bafna" imagePath="/assets/ya/Ishita-Bafna.jpg" />
            <YACard name="Rishi Sankaran" imagePath="/assets/ya/rishi-sankaran.jpeg" />
            <YACard name="Apaarpreet Bajaj" imagePath="/assets/ya/Apaarpreet-Bajaj.jpeg" />
            <YACard name="Sanvi Pawar" imagePath="/assets/ya/Sanvi-Pawar.jpg" />
            <YACard name="Tanmayi Panasa" imagePath="/assets/ya/tanmayi-panasa.jpg" />
            <YACard name="Madhu Shri Gupta" imagePath="/assets/ya/madhu-shri-gupta.jpeg" />
          </div>
        </section>
      </div>
    </div>
  )
}
