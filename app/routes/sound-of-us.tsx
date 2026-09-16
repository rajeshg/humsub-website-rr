import { Link } from "react-router"
import { Award, CalendarDays, ClipboardList, MapPin, Mic, Music, ShieldCheck, Trophy, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"

const SUBMISSION_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdr4YDKXx8UbePt9eAaBeuM0QeBWC-beycnYMwJCreVmrhW2w/viewform?usp=publish-editor"

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
    description: "All ages and all communities are welcome. You do not need to be a professional musician.",
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
    value: "Saturday, October 3, 2026, 11:59 PM ET",
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
        <div className="flex flex-col items-center w-full max-w-5xl mx-auto px-4 py-6">
          {/* Header */}
          <div className="text-center mb-6">
            <p className="text-sm font-bold uppercase tracking-widest text-primary mb-2">
              Hum Sub x Lune Spark present
            </p>
            <h1 className="text-4xl md:text-5xl font-black text-primary mb-4 tracking-tight">The Sound of Us</h1>
            <p className="text-lg font-semibold max-w-2xl mx-auto">Hum Sub Theme Music Competition</p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mt-2">
              Create an original 30–60 second musical theme inspired by the idea of all of us coming together. The
              competition is open to everyone across the Triangle community — the music can come from any genre,
              culture, or tradition and does not need to sound Indian. What matters is that it feels inspiring,
              evocative, memorable, and anthemic.
            </p>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto mt-2 italic">
              Hum Sub means &ldquo;All of Us.&rdquo; What does that sound like?
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
              <a
                href={SUBMISSION_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-lg font-bold text-primary-foreground hover:opacity-90 transition-opacity no-underline w-full sm:w-auto"
              >
                Submit an Entry
              </a>
              <a
                href="#guidelines"
                className="inline-flex items-center justify-center rounded-full border px-8 py-3 text-lg font-bold hover:opacity-90 transition-opacity w-full sm:w-auto"
              >
                Guidelines
              </a>
            </div>
          </div>

          {/* Flyer Image */}
          <figure className="w-full max-w-4xl mb-8 shadow-2xl rounded-3xl overflow-hidden border bg-muted/5 flex items-center justify-center p-4">
            <img
              src="/assets/sound-of-us-flyer.jpg"
              alt="Hum Sub - The Sound of Us theme music competition flyer"
              className="max-w-full h-auto object-contain mx-auto transition-transform duration-500 hover:scale-[1.02]"
            />
          </figure>

          {/* Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-5xl mb-4">
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
          <p className="text-sm text-muted-foreground max-w-5xl w-full mb-8">
            Entries may be submitted by individuals or teams. Participants under 18 must have parent/guardian consent.
          </p>

          {/* Originality / No Generative AI */}
          <Card className="w-full max-w-5xl mb-8 shadow-lg border-primary/10 overflow-hidden">
            <CardHeader className="bg-primary/5 border-b border-primary/10 pt-6">
              <CardTitle
                className="text-2xl font-bold text-primary flex items-center gap-2"
                role="heading"
                aria-level={2}
              >
                <ShieldCheck className="h-6 w-6" />
                Original Work — No Generative AI
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-5 space-y-3">
              <p className="text-muted-foreground leading-relaxed">
                The composition must be original work created by the participant(s). AI-generated music is not permitted
                — any entry created wholly or partially using generative AI music tools to generate the composition,
                melody, harmony, rhythm, vocals, or finished music will be disqualified.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Standard music-production tools are permitted, including DAWs, virtual instruments, synthesizers,
                effects, editing, mixing, and mastering tools. Any third-party samples or material used must be properly
                licensed and must not prevent Hum Sub from using or adapting the selected theme.
              </p>
            </CardContent>
          </Card>

          {/* Key Dates */}
          <Card className="w-full max-w-5xl mb-8 shadow-lg border-primary/10 overflow-hidden">
            <CardHeader className="bg-primary/5 border-b border-primary/10 pt-6">
              <CardTitle
                className="text-2xl font-bold text-primary flex items-center gap-2"
                role="heading"
                aria-level={2}
              >
                <CalendarDays className="h-6 w-6" />
                Key Dates
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-5">
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {keyDates.map((date) => (
                  <div key={date.label}>
                    <dt className="text-sm font-bold text-primary uppercase tracking-widest">{date.label}</dt>
                    <dd className="text-lg mt-1">{date.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="text-sm text-muted-foreground mt-6 flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0" />
                Koka Booth Amphitheatre, Cary, NC
              </p>
            </CardContent>
          </Card>

          {/* How to Participate */}
          <Card
            id="guidelines"
            className="w-full max-w-5xl mb-8 shadow-lg border-primary/10 overflow-hidden scroll-mt-24"
          >
            <CardHeader className="bg-primary/5 border-b border-primary/10 pt-6">
              <CardTitle
                className="text-2xl font-bold text-primary flex items-center gap-2"
                role="heading"
                aria-level={2}
              >
                <ClipboardList className="h-6 w-6" />
                How to Participate
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-5 space-y-3">
              <p className="text-muted-foreground leading-relaxed">
                Submit the following through the official competition form:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>A 30–60 second recording of your original theme.</li>
                <li>Your name / team name and contact information.</li>
                <li>A short note (up to 100 words) about the idea or inspiration behind the music.</li>
                <li>Names of collaborators, if any.</li>
                <li>Confirmation that the composition is original and does not use generative AI music tools.</li>
                <li>Disclosure of any third-party samples or licensed material used.</li>
              </ul>
              <p className="font-semibold text-destructive">Late submissions will not be considered.</p>
            </CardContent>
          </Card>

          {/* Selection & Winning Theme */}
          <Card className="w-full max-w-5xl mb-8 shadow-lg border-primary/10 overflow-hidden">
            <CardHeader className="bg-primary/5 border-b border-primary/10 pt-6">
              <CardTitle
                className="text-2xl font-bold text-primary flex items-center gap-2"
                role="heading"
                aria-level={2}
              >
                <Award className="h-6 w-6" />
                Selection &amp; the Winning Theme
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-5 space-y-3">
              <p className="text-muted-foreground leading-relaxed">
                A panel representing Hum Sub and Lune Spark will review eligible submissions. Entries will be considered
                for originality, emotional impact, memorability, musical execution, and how strongly they capture the
                spirit of The Sound of Us.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Selected creators may be featured through Hum Sub and Lune Spark channels. The winning composition may
                be refined or recorded with support from the Lune Spark music team before its final presentation — and
                is planned to be recognized and featured at Hum Sub Diwali on Saturday, October 10, 2026.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                By submitting, entrants confirm that they created or control the rights to the music and give Hum Sub
                and Lune Spark permission to review and share the submission for competition administration, judging,
                and promotion. If selected, the winner will complete a separate written usage agreement covering Hum
                Sub&apos;s ongoing use, performance, reproduction, adaptation, and promotion of the final theme, and
                will be recognized as its composer/creator.
              </p>
            </CardContent>
          </Card>

          {/* Why Participate */}
          <div className="w-full max-w-5xl mb-8 text-center rounded-3xl border border-muted/50 bg-muted/5 py-6 px-4 sm:px-6">
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
            <p className="text-muted-foreground max-w-2xl mx-auto mt-6 leading-relaxed">
              A piano. A tabla. A guitar. A beat. A voice. An orchestra. A laptop — or something we have not imagined
              yet. There is no single sound we are looking for. We are looking for the one that makes us feel something
              together.
            </p>
            <p className="text-xl font-semibold text-primary mt-6">Your Music. Our Community. A Brighter Together.</p>
            <p className="text-lg font-semibold mt-1">Different voices. A stronger tomorrow.</p>
          </div>

          {/* Submit Section */}
          <div id="submit" className="w-full max-w-5xl text-center py-8 border-t border-dashed border-muted">
            <h2 className="text-3xl font-black text-primary mb-4 flex items-center justify-center gap-2">
              <Mic className="h-7 w-7" />
              Submit Your Music
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-4">
              Applications open September 14, 2026. The submission deadline is Saturday, October 3, 2026 at 11:59 PM ET.
            </p>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8 flex items-center justify-center gap-2">
              <Users className="h-5 w-5 shrink-0" />
              Questions? Reach out via our contact page.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={SUBMISSION_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-lg font-bold text-primary-foreground hover:opacity-90 transition-opacity no-underline w-full sm:w-auto"
              >
                Submit Your Entry
              </a>
              <Link
                to="/contact-us"
                className="inline-flex items-center justify-center rounded-full border px-8 py-3 text-lg font-bold hover:opacity-90 transition-opacity"
              >
                Contact Us
              </Link>
            </div>
            <p className="text-sm text-muted-foreground mt-6">Music brings people together. So does community.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
