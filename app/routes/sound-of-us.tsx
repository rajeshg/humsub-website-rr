import { Link } from "react-router"
import { CalendarDays, MapPin, Mic, Music, Trophy, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"

const pillars = [
  {
    title: "Any Genre",
    description: "From classical to hip-hop, traditional to contemporary — and everything in between.",
  },
  {
    title: "Any Instrumentation",
    description: "Vocal, instrumental or a blend.",
  },
  {
    title: "Any Background",
    description: "All ages and all communities are welcome.",
  },
  {
    title: "One Goal",
    description: "A theme that feels inspiring, memorable and unifies us.",
  },
]

const keyDates = [
  {
    label: "Applications Open",
    value: "September 14, 2026",
  },
  {
    label: "Submission Deadline",
    value: "October 3, 2026, 11:59 PM ET",
  },
  {
    label: "Winning Theme",
    value: "Announced and premiered at Hum Sub Diwali 2026 Celebration",
  },
  {
    label: "Hum Sub Diwali 2026",
    value: "October 10, 2026, 9 AM – 9:30 PM",
  },
]

const perks = [
  "Perform in front of a supportive community",
  "Showcase your passion",
  "Compete for exciting prizes and recognition",
  "Be part of a lasting Hum Sub theme used across events, videos and more",
]

export default function SoundOfUs() {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <title>The Sound of Us | Hum Sub Theme Music Competition</title>
      <div className="not-prose min-h-screen">
        <div className="flex flex-col items-center w-full max-w-5xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-10">
            <p className="text-sm font-bold uppercase tracking-widest text-primary mb-2">
              Hum Sub x Lune Spark present
            </p>
            <h1 className="text-4xl md:text-5xl font-black text-primary mb-4 tracking-tight">The Sound of Us</h1>
            <p className="text-lg font-semibold max-w-2xl mx-auto">Hum Sub Theme Music Competition</p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mt-2">
              Create an original 30–60 second musical theme inspired by the idea of all of us coming together. The
              competition is open to everyone across the Triangle community.
            </p>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto mt-2 italic">
              Hum Sub means &ldquo;All of Us.&rdquo; What does that sound like?
            </p>
          </div>

          {/* Flyer Image */}
          <figure className="w-full max-w-4xl mb-12 shadow-2xl rounded-3xl overflow-hidden border bg-muted/5 flex items-center justify-center p-6">
            <img
              src="/assets/sound-of-us-flyer.jpg"
              alt="Hum Sub - The Sound of Us theme music competition flyer"
              className="max-w-full h-auto object-contain mx-auto transition-transform duration-500 hover:scale-[1.02]"
            />
          </figure>

          {/* Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-5xl mb-12">
            {pillars.map((pillar) => (
              <Card key={pillar.title} className="shadow-lg border-primary/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-bold text-primary">{pillar.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">{pillar.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Key Dates */}
          <Card className="w-full max-w-5xl mb-12 shadow-lg border-primary/10 overflow-hidden">
            <CardHeader className="bg-primary/5 border-b border-primary/10">
              <CardTitle className="text-2xl font-bold text-primary flex items-center gap-2">
                <CalendarDays className="h-6 w-6" />
                Key Dates
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {keyDates.map((date) => (
                  <div key={date.label}>
                    <dt className="text-sm font-bold text-primary uppercase tracking-widest">{date.label}</dt>
                    <dd className="text-lg font-semibold mt-1">{date.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="text-sm text-muted-foreground mt-6 flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0" />
                Koka Booth Amphitheatre, Cary, NC
              </p>
            </CardContent>
          </Card>

          {/* Why Participate */}
          <div className="w-full max-w-5xl mb-12 text-center rounded-3xl border border-muted/50 bg-muted/5 py-8 px-6">
            <h2 className="text-3xl font-black text-primary mb-6 flex items-center justify-center gap-2">
              <Trophy className="h-7 w-7" />
              Why Participate
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-3xl mx-auto">
              {perks.map((perk) => (
                <li key={perk} className="flex items-start gap-2 text-muted-foreground">
                  <Music className="h-5 w-5 shrink-0 text-primary mt-0.5" />
                  <span>{perk}</span>
                </li>
              ))}
            </ul>
            <p className="text-xl font-semibold text-primary mt-8">Your Music. Our Community. A Brighter Together.</p>
            <p className="text-lg font-semibold mt-1">Different voices. A stronger tomorrow.</p>
          </div>

          {/* Submit Section */}
          <div id="submit" className="w-full max-w-5xl text-center py-12 border-t border-dashed border-muted">
            <h3 className="text-3xl font-black text-primary mb-4 flex items-center justify-center gap-2">
              <Mic className="h-7 w-7" />
              Submit Your Music
            </h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-4">
              Applications open September 14, 2026. The submission deadline is October 3, 2026 at 11:59 PM ET.
            </p>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8 flex items-center justify-center gap-2">
              <Users className="h-5 w-5 shrink-0" />
              Submission details will be posted here when applications open. Questions? Reach out via our contact page.
            </p>
            <Link
              to="/contact-us"
              className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-lg font-bold text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Contact Us
            </Link>
            <p className="text-sm text-muted-foreground mt-8">Music brings people together. So does community.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
