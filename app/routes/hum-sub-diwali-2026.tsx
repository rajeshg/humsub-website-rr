import { useEffect, useState } from "react"
import { CalendarDays, Car, MapPin, ShieldCheck, Users } from "lucide-react"
import { Link } from "react-router"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { sponsors as sponsors2025 } from "~/lib/sponsors"
import { useTimeUntil } from "~/lib/timeuntil"

// Web banner for Diwali 2026 hero (16:9, 1920x1080).
// Source: "WEB BANNER 1920x1080.jpg" from Downloads.
// Other variants seen in Downloads:
// - "WEB BANNER 1300x650.jpg" (2:1, lighter, good mobile fallback)
// - "WEB BANNER 500x500.jpg" / "WEB BANNER 640x480.jpg" (square-ish, text too small for hero)
const DIWALI_2026_BANNER_SRC = "/assets/events/hum-sub-diwali-2026-web-banner.jpg"

export function meta() {
  const title = "Hum Sub Diwali 2026 Celebration"
  const date = "October 10, 2026"
  const location = "Triangle Area of North Carolina"

  const ogUrl = new URL("https://humsub.org/api/og")
  ogUrl.searchParams.set("title", title)
  ogUrl.searchParams.set("date", date)
  ogUrl.searchParams.set("location", location)

  return [
    { title: `${title} | Hum Sub` },
    {
      name: "description",
      content: `Join Hum Sub for Diwali 2026 on ${date} at Koka Booth Amphitheatre, Cary, NC — free admission, cultural performances, food vendors, and fireworks finale.`,
    },
    { property: "og:title", content: `${title} | Hum Sub` },
    { property: "og:image", content: ogUrl.toString() },
    { property: "og:url", content: "https://humsub.org/hum-sub-diwali-2026" },
  ]
}

interface HeroProps {
  eventDate: Date
}

function Hero({ eventDate }: HeroProps) {
  const timeLeft = useTimeUntil(eventDate)
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  // Render a stable placeholder on SSR + first client paint so server HTML
  // matches and we avoid hydration mismatch (Date.now() differs per render).
  if (!mounted) {
    return (
      <div
        aria-hidden="true"
        className="mx-auto bg-white/20 dark:bg-slate-800/30 backdrop-blur-md rounded-xl p-6 border border-orange-200/30 dark:border-orange-600/30 shadow-2xl min-h-[112px]"
      />
    )
  }

  return (
    <>
      {/* Countdown Timer */}
      {!timeLeft.isExpired && (
        <div className="mx-auto bg-white/20 dark:bg-slate-800/30 backdrop-blur-md rounded-xl p-6 border border-orange-200/30 dark:border-orange-600/30 shadow-2xl">
          <div
            className="flex justify-center items-center gap-2 md:gap-4 flex-wrap"
            role="timer"
            aria-live="off"
            suppressHydrationWarning
          >
            {timeLeft.months > 0 && (
              <>
                <div className="bg-orange-100/80 dark:bg-orange-900/60 backdrop-blur-sm rounded-lg p-3 md:p-4 min-w-[70px] md:min-w-[80px] border border-orange-300/50 dark:border-orange-600/50">
                  <div className="text-xl md:text-2xl lg:text-3xl font-bold text-orange-800 dark:text-orange-200 tabular-nums">
                    {timeLeft.months.toString().padStart(2, "0")}
                  </div>
                  <div className="text-xs md:text-sm text-orange-700 dark:text-orange-300 uppercase tracking-wide">
                    Months
                  </div>
                </div>
                <div
                  aria-hidden="true"
                  className="text-xl md:text-2xl lg:text-3xl font-bold text-orange-800 dark:text-orange-200"
                >
                  :
                </div>
              </>
            )}
            <div className="bg-orange-100/80 dark:bg-orange-900/60 backdrop-blur-sm rounded-lg p-3 md:p-4 min-w-[70px] md:min-w-[80px] border border-orange-300/50 dark:border-orange-600/50">
              <div className="text-xl md:text-2xl lg:text-3xl font-bold text-orange-800 dark:text-orange-200 tabular-nums">
                {timeLeft.days.toString().padStart(2, "0")}
              </div>
              <div className="text-xs md:text-sm text-orange-700 dark:text-orange-300 uppercase tracking-wide">
                Days
              </div>
            </div>
            <div
              aria-hidden="true"
              className="text-xl md:text-2xl lg:text-3xl font-bold text-orange-800 dark:text-orange-200"
            >
              :
            </div>
            <div className="bg-orange-100/80 dark:bg-orange-900/60 backdrop-blur-sm rounded-lg p-3 md:p-4 min-w-[70px] md:min-w-[80px] border border-orange-300/50 dark:border-orange-600/50">
              <div className="text-xl md:text-2xl lg:text-3xl font-bold text-orange-800 dark:text-orange-200 tabular-nums">
                {timeLeft.hours.toString().padStart(2, "0")}
              </div>
              <div className="text-xs md:text-sm text-orange-700 dark:text-orange-300 uppercase tracking-wide">
                Hours
              </div>
            </div>
            <div
              aria-hidden="true"
              className="text-xl md:text-2xl lg:text-3xl font-bold text-orange-800 dark:text-orange-200"
            >
              :
            </div>
            <div className="bg-orange-100/80 dark:bg-orange-900/60 backdrop-blur-sm rounded-lg p-3 md:p-4 min-w-[70px] md:min-w-[80px] border border-orange-300/50 dark:border-orange-600/50">
              <div className="text-xl md:text-2xl lg:text-3xl font-bold text-orange-800 dark:text-orange-200 tabular-nums">
                {timeLeft.minutes.toString().padStart(2, "0")}
              </div>
              <div className="text-xs md:text-sm text-orange-700 dark:text-orange-300 uppercase tracking-wide">
                Minutes
              </div>
            </div>
          </div>
          <span className="sr-only" aria-live="polite">
            {timeLeft.months > 0 && `${timeLeft.months} months, `}
            {timeLeft.days} days, {timeLeft.hours} hours, {timeLeft.minutes} minutes until Hum Sub Diwali 2026
          </span>
        </div>
      )}

      {timeLeft.isExpired && (
        <div className="bg-white/20 dark:bg-slate-800/30 backdrop-blur-md rounded-xl p-6 border border-orange-200/30 dark:border-orange-600/30 shadow-2xl">
          <p className="text-lg md:text-xl text-orange-800 dark:text-orange-200 font-semibold [text-shadow:1px_1px_2px_rgba(255,255,255,0.3)]">
            Event has started!
          </p>
        </div>
      )}
    </>
  )
}

function Diwali2026SponsorsGrid() {
  const prime = sponsors2025.filter((s) => s.level === "prime")
  const rest = sponsors2025.filter((s) => s.level !== "prime")
  return (
    <div className="space-y-6">
      {prime.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-6 pb-4 border-b border-gray-100 dark:border-gray-700">
          {prime.map((sponsor, i) => (
            <SponsorLogo key={sponsor.name} sponsor={sponsor} eager={i < 2} large />
          ))}
        </div>
      )}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 items-center justify-center">
        {rest.map((sponsor, i) => (
          <SponsorLogo key={sponsor.name} sponsor={sponsor} eager={i < 6} />
        ))}
      </div>
    </div>
  )
}

function SponsorLogo({
  sponsor,
  eager = false,
  large = false,
}: {
  sponsor: (typeof sponsors2025)[number]
  eager?: boolean
  large?: boolean
}) {
  const src = Array.isArray(sponsor.imagePath) ? sponsor.imagePath[0] : sponsor.imagePath
  const img = (
    <img
      src={src}
      alt={sponsor.name}
      width={large ? 200 : 120}
      height={large ? 100 : 60}
      className={`${large ? "h-24 w-48" : "h-16 w-28"} object-contain p-2 rounded-lg bg-white border border-gray-100 dark:border-gray-700 transition-transform hover:scale-105`}
      loading={eager ? "eager" : "lazy"}
    />
  )
  if (!sponsor.href) {
    return <div className="flex flex-col items-center text-center">{img}</div>
  }
  return (
    <a
      href={sponsor.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${sponsor.name}${sponsor.label ? ` — ${sponsor.label}` : ""}`}
      className="flex flex-col items-center text-center group"
    >
      {img}
    </a>
  )
}

export default function HumSubDiwali2026() {
  // Set event date to Diwali 2026 - October 10, 2026 at 9:00 AM (gates open)
  const eventDate = new Date(2026, 9, 10, 9, 0, 0) // Month is 0-indexed, so 9 = October

  return (
    <div className="container bg-white dark:bg-black">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-slate-900 dark:via-orange-950 dark:to-amber-950 py-16 md:py-24 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-10 dark:opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-orange-400 dark:bg-orange-600 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-amber-400 dark:bg-amber-600 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-yellow-400 dark:bg-yellow-600 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>

        <div className="w-full px-4 md:px-4 relative z-10">
          {/* Hero Content */}
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            {/* Web Banner */}
            <figure className="mx-auto w-full max-w-5xl overflow-hidden rounded-2xl border border-orange-200/50 bg-white shadow-2xl dark:border-orange-600/30">
              <img
                src={DIWALI_2026_BANNER_SRC}
                alt="Hum Sub Diwali 2026 — Udaan Soaring High, headliner Vidya Vox with Rohith Jayaraman and live band, Oct 10 at Koka Booth Amphitheatre"
                className="block h-auto w-full object-contain"
                loading="eager"
                fetchPriority="high"
                width={1920}
                height={1080}
              />
            </figure>
            {/* Main Title with Enhanced Styling */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white leading-tight animate-in fade-in duration-1000">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 dark:from-orange-300 dark:via-amber-300 dark:to-yellow-300">
                  Hum Sub Diwali
                </span>
                <span className="block text-2xl md:text-3xl lg:text-4xl font-semibold mt-2 text-orange-600 dark:text-orange-300 animate-in slide-in-from-bottom-4 duration-1000 delay-300">
                  2026 Celebration
                </span>
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-amber-500 dark:from-orange-400 dark:to-amber-400 mx-auto rounded-full animate-in zoom-in-50 duration-1000 delay-700"></div>
            </div>

            {/* Event Details with Enhanced Card */}
            <div className="bg-white/90 dark:bg-gray-800/95 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-orange-200/50 dark:border-orange-600/30 shadow-2xl max-w-2xl mx-auto transform hover:scale-105 transition-transform duration-300 animate-in slide-in-from-bottom-4 duration-1000 delay-500 mb-8">
              <div className="space-y-4 text-gray-800 dark:text-gray-100">
                <div className="flex items-center gap-3 md:text-xl font-medium">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900/60 rounded-full">
                    <CalendarDays className="h-6 w-6 text-amber-600 dark:text-amber-300" />
                  </div>
                  <span className="text-balance">October 10, 2026 · 9 AM – 9:30 PM</span>
                </div>
                <div className="flex gap-3 md:text-xl font-medium">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900/60 rounded-full">
                    <MapPin className="h-6 w-6 text-amber-600 dark:text-amber-300" />
                  </div>
                  <span>Koka Booth Amphitheatre, Cary, NC</span>
                </div>
                <div className="text-center pt-2">
                  <Badge
                    variant="default"
                    className="bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-400 dark:to-emerald-400 hover:from-green-600 hover:to-emerald-600 dark:hover:from-green-500 dark:hover:to-emerald-500 text-white text-lg px-6 py-2 rounded-full shadow-lg animate-pulse"
                  >
                    🎉 FREE ADMISSION 🎉
                  </Badge>
                </div>
              </div>
            </div>
            {/* Countdown Timer */}
            <div className="space-y-8">
              <Hero eventDate={eventDate} />

              <div className="animate-in slide-in-from-bottom-4 duration-1000 delay-700">
                <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto font-medium text-center">
                  Join us for a full day of celebration, delicious food, vibrant performances, community booths, and a{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600 font-semibold">
                    spectacular fireworks finale
                  </span>
                  .
                </p>
              </div>
            </div>
            {/* Enhanced Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-6 animate-in slide-in-from-bottom-4 duration-1000 delay-1000">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 hover:from-orange-600 hover:via-orange-700 hover:to-amber-700 text-white font-bold px-10 py-4 rounded-2xl shadow-2xl hover:shadow-orange-500/25 transform hover:scale-110 transition-all duration-300 w-full sm:w-auto border-2 border-orange-400/50 group"
              >
                <a
                  href="https://www.zeffy.com/en-US/ticketing/hum-sub-diwali--2026"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="no-underline flex items-center gap-2"
                >
                  <span>Get Membership — reserved seating</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </Button>
              <Button
                variant="secondary"
                size="lg"
                asChild
                className="bg-white/95 dark:bg-gray-800/95 text-orange-600 dark:text-orange-400 hover:bg-white dark:hover:bg-gray-800 border-2 border-orange-300 dark:border-orange-700 hover:border-orange-400 dark:hover:border-orange-600 font-bold px-10 py-4 rounded-2xl shadow-2xl hover:shadow-orange-500/25 transform hover:scale-110 transition-all duration-300 w-full sm:w-auto backdrop-blur-sm group"
              >
                <a href="/volunteer" className="no-underline flex items-center gap-2">
                  <span>Volunteer With Us</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </Button>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Entry is free. One-time membership — $12 early bird through Oct 6, $15 from Oct 7, per person, per
              calendar year — includes reserved seating for the whole day.{" "}
              <a
                href="https://www.zeffy.com/en-US/ticketing/hum-sub-diwali--2026"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-semibold"
              >
                get membership
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-20 space-y-16 md:space-y-24">
        <nav aria-label="On this page" className="flex flex-wrap items-center justify-center gap-2">
          {[
            ["Venue", "#venue"],
            ["Parking", "#parking"],
            ["Bags & Entry", "#bags-entry"],
            ["Schedule", "#schedule"],
            ["Get Involved", "#get-involved"],
            ["Sponsors", "#sponsors"],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="px-4 py-2 text-sm font-semibold rounded-full border border-orange-300 dark:border-orange-700 text-orange-700 dark:text-orange-300 bg-orange-50 dark:bg-orange-950/30 hover:bg-orange-100 dark:hover:bg-orange-900/40 transition-colors no-underline"
            >
              {label}
            </a>
          ))}
        </nav>
        <section className="space-y-12">
          <div className="text-center space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 dark:from-orange-300 dark:via-amber-300 dark:to-yellow-300 bg-clip-text text-transparent">
              Plan Your Visit
            </h2>
            <div className="flex items-center justify-center gap-4">
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-orange-400 rounded-full"></div>
              <div className="w-8 h-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"></div>
              <div className="w-16 h-0.5 bg-gradient-to-r from-amber-400 to-transparent rounded-full"></div>
            </div>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Everything you need to know for an amazing day at Hum Sub Diwali 2026
            </p>
          </div>

          {/* Venue Details - Enhanced Card */}
          <Card
            id="venue"
            className="scroll-mt-24 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
          >
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl text-primary flex items-center gap-3" role="heading" aria-level={3}>
                <div className="p-2 bg-primary/10 rounded-lg">
                  <MapPin className="h-6 w-6" />
                </div>
                Venue Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="font-semibold text-primary min-w-[100px]">Location:</span>
                  <span>Koka Booth Amphitheatre, 8003 Regency Pkwy, Cary, NC 27518</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="font-semibold text-primary min-w-[100px]">Admission:</span>
                  <Badge
                    variant="default"
                    className="bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1 w-fit"
                  >
                    🎉 FREE TO THE PUBLIC 🎉
                  </Badge>
                </div>
              </div>

              <div className="bg-orange-50 dark:bg-orange-950/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
                <p className="text-sm text-orange-800 dark:text-orange-200">
                  <span className="font-semibold">Reserved seating:</span> Entry is free. Reserved seating comes with
                  Hum Sub membership — $12 early bird through Oct 6, $15 from Oct 7, per person, per calendar year.
                  Membership is a one-time purchase and your seat is valid for the whole day. See membership details on
                  the membership page.
                </p>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <span className="font-semibold">Cashless Venue:</span> Koka Booth Amphitheatre is cashless. Many event
                  vendors will accept cash and cards. No ATMs on-site.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row justify-center gap-3">
              <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700 text-white">
                <a
                  href="https://www.zeffy.com/en-US/ticketing/hum-sub-diwali--2026"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="no-underline"
                >
                  Get Membership
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-white text-orange-600 hover:bg-gray-100 border-2 border-orange-300 dark:border-orange-700"
              >
                <Link to="/membership" className="no-underline">
                  Membership Details
                </Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Parking - Enhanced Card */}
          <Card
            id="parking"
            className="scroll-mt-24 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
          >
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl text-primary flex items-center gap-3" role="heading" aria-level={3}>
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Car className="h-6 w-6" />
                </div>
                Parking
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="font-semibold text-primary min-w-[100px]">General:</span>
                  <span>$10</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="font-semibold text-primary min-w-[100px]">Preferred:</span>
                  <span>$20</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Koka Booth Amphitheatre is cashless — please plan to pay for parking with a card.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <a
                  href="/assets/events/Hum_Sub_Diwali_Parking_KBA_2025.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 transition"
                >
                  Open Parking Map (PDF)
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Bag Policy & Allowed Items - Enhanced Card */}
          <Card
            id="bags-entry"
            className="scroll-mt-24 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
          >
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl text-primary flex items-center gap-3" role="heading" aria-level={3}>
                <div className="p-2 bg-primary/10 rounded-lg">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                Bag Policy & Allowed Items
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Bag Policy</h3>
                <p className="text-sm text-muted-foreground">
                  Koka Booth Amphitheatre has enhanced its public safety policy to include a clear bag policy. See the
                  official{" "}
                  <a
                    href="https://www.boothamphitheatre.com/events-tickets/bag-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline font-semibold"
                  >
                    Bag Policy
                  </a>
                  .
                </p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Bags 6&quot; x 8&quot; or smaller are permitted.</li>
                  <li>Clear bags that do not exceed 12&quot; x 12&quot; x 9&quot;.</li>
                  <li>Medical and parenting bags allowed.</li>
                  <li>All bags are subject to search.</li>
                </ul>
                <p className="text-sm text-muted-foreground">
                  Due to sight line issues and the safety of all guests, umbrellas will not be allowed.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Items Allowed</h3>
                <p className="text-sm text-muted-foreground">
                  Guests are welcome to bring the following items to this event:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Small bags 6&quot; x 8&quot; or smaller, or clear bags up to 12&quot; x 12&quot; x 9&quot;.</li>
                  <li>Small personal items must fit inside the allowed bag.</li>
                  <li>Plastic factory-sealed bottled water (1 per person). No glass, cans, or flavored water.</li>
                  <li>
                    Select lawn chairs: no footrest, canopy, lounge chairs, tri-fold chairs, or swinging chairs.{" "}
                    <a
                      href="https://boothamphitheatre.production.carbonhouse.com/assets/doc/Lawn-Chairs-8.5-x-11-in-Final-2f3ba87149.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline font-semibold"
                    >
                      See examples
                    </a>
                    . Please remove the chair from the bag at the security checkpoint.
                  </li>
                  <li>Raincoats &amp; ponchos</li>
                  <li>Strollers</li>
                  <li>Tablets</li>
                  <li>Reusable bottles (no glass). Water fill stations available in the Cobblestone Courtyard.</li>
                  <li>All allowed bags will be searched.</li>
                </ul>
                <p className="text-sm text-muted-foreground">All patrons will walk through metal detectors.</p>
              </div>
            </CardContent>
          </Card>

          {/* Schedule & Highlights */}
          <Card
            id="schedule"
            className="scroll-mt-24 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
          >
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl text-primary flex items-center gap-3" role="heading" aria-level={3}>
                <div className="p-2 bg-primary/10 rounded-lg">
                  <CalendarDays className="h-6 w-6" />
                </div>
                Schedule & Highlights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-3">
                  <div className="flex items-center gap-4 p-3 bg-white dark:bg-gray-800 rounded-lg border border-orange-100 dark:border-orange-900">
                    <span className="text-lg font-bold text-orange-600 dark:text-orange-400 min-w-[80px]">9:00 AM</span>
                    <span>Gates Open, Food & Vendor Village</span>
                  </div>
                  <div className="flex items-center gap-4 p-3 bg-white dark:bg-gray-800 rounded-lg border border-orange-100 dark:border-orange-900">
                    <span className="text-lg font-bold text-orange-600 dark:text-orange-400 min-w-[80px]">9:45 AM</span>
                    <span>Cultural Performances Begin (Main Stage)</span>
                  </div>
                  <div className="flex items-center gap-4 p-3 bg-white dark:bg-gray-800 rounded-lg border border-orange-100 dark:border-orange-900">
                    <span className="text-lg font-bold text-orange-600 dark:text-orange-400 min-w-[80px]">6:00 PM</span>
                    <span>Vidya Vox — Featured Artist Performance (Main Stage)</span>
                  </div>
                  <div className="flex items-center gap-4 p-3 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                    <span className="text-lg font-bold text-amber-600 dark:text-amber-400 min-w-[80px]">8:45 PM</span>
                    <span className="font-semibold">✨ Grand Fireworks Finale ✨</span>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-blue-800 dark:text-blue-200 text-sm">
                    <span className="font-semibold">All Day:</span> Enjoy exhibition booths, food vendors, and
                    family-friendly activities available throughout the event. Special programs and demonstrations will
                    be held hourly at the exhibition booth until 5 PM.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
        <section id="get-involved" className="scroll-mt-24 space-y-12">
          <div className="text-center space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 dark:from-orange-300 dark:via-amber-300 dark:to-yellow-300 bg-clip-text text-transparent">
              Get Involved
            </h2>
            <div className="flex items-center justify-center gap-4">
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-orange-400 rounded-full"></div>
              <div className="w-8 h-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"></div>
              <div className="w-16 h-0.5 bg-gradient-to-r from-amber-400 to-transparent rounded-full"></div>
            </div>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Join our community and make Hum Sub Diwali 2026 even more special
            </p>
          </div>

          {/* Get Involved Accordion Sections */}
          <div className="mt-16">
            <Accordion type="single" collapsible className="w-full space-y-6">
              <AccordionItem
                value="vendor-participation"
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-lg font-semibold">
                  <span className="flex items-center gap-3 w-full">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-full">
                      <span className="text-xl text-amber-600 dark:text-amber-400">🎪</span>
                    </div>
                    <span>Vendor Participation</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 bg-gray-50/50 dark:bg-gray-800/50">
                  <div className="space-y-6">
                    <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
                      <p className="text-red-800 dark:text-red-200 font-medium">
                        <span className="text-red-600 dark:text-red-400">📋</span> Applications are now closed. Thank
                        you to everyone who submitted!
                      </p>
                      <p className="text-red-700 dark:text-red-300 text-sm mt-2">
                        If you submitted an application, you will receive a response from our team with details about
                        next steps.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="cultural-participation"
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-lg font-semibold">
                  <span className="flex items-center gap-3 w-full">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-full">
                      <span className="text-xl text-purple-600 dark:text-purple-400">🎭</span>
                    </div>
                    <span>Cultural Program Participation</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 bg-gray-50/50 dark:bg-gray-800/50">
                  <div className="space-y-6">
                    <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
                      <p className="text-red-800 dark:text-red-200 font-medium">
                        <span className="text-red-600 dark:text-red-400">🎭</span> Applications are now closed. Thank
                        you to everyone who submitted!
                      </p>
                      <p className="text-red-700 dark:text-red-300 text-sm mt-2">
                        If you submitted an application, you will receive a response from our cultural team with details
                        about auditions.
                      </p>
                    </div>
                    {/*
                    <p className="text-muted-foreground">
                      Are you interested in performing or showcasing your cultural talent at Hum Sub Diwali 2026? We
                      welcome dancers, musicians, artists, and cultural performers!
                    </p>

                    <div className="space-y-3">
                      <h5 className="font-semibold text-gray-900 dark:text-gray-100">📅 Important Dates</h5>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 p-2 bg-white dark:bg-gray-800 rounded border border-orange-100 dark:border-orange-900">
                          <span className="font-bold text-orange-600 dark:text-orange-400 min-w-[90px]">May 24</span>
                          <span className="text-sm text-gray-700 dark:text-gray-300">Forms Open</span>
                        </div>
                        <div className="flex items-center gap-3 p-2 bg-white dark:bg-gray-800 rounded border border-orange-100 dark:border-orange-900">
                          <span className="font-bold text-orange-600 dark:text-orange-400 min-w-[90px]">June 15</span>
                          <span className="text-sm text-gray-700 dark:text-gray-300">Application Deadline</span>
                        </div>
                        <div className="flex items-center gap-3 p-2 bg-white dark:bg-gray-800 rounded border border-orange-100 dark:border-orange-900">
                          <span className="font-bold text-orange-600 dark:text-orange-400 min-w-[90px]">Aug 29</span>
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            Auditions at Cary Arts Center
                          </span>
                        </div>
                        <div className="flex items-center gap-3 p-2 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20 rounded border border-amber-200 dark:border-amber-800">
                          <span className="font-bold text-amber-600 dark:text-amber-400 min-w-[90px]">Oct 10</span>
                          <span className="text-sm text-gray-700 dark:text-gray-300 font-semibold">🎉 Event Day</span>
                        </div>
                      </div>
                    </div>
                    */}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="volunteer"
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-lg font-semibold">
                  <span className="flex items-center gap-3 w-full">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-full">
                      <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <span>Volunteer With Us</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 bg-gray-50/50 dark:bg-gray-800/50">
                  <div className="space-y-4">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                      <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-3 text-lg">
                        <span className="text-purple-600 dark:text-purple-400">🤝</span> Join Our Volunteer Team
                      </h4>
                      <p className="text-muted-foreground mb-4">
                        Volunteers are the backbone of any organization. We at Hum Sub value, cherish, and appreciate
                        volunteers in all age groups (minimum age of volunteer is 14; minimum age to register
                        independently is 16) who support us during our events.
                      </p>
                      <p className="text-muted-foreground mb-4">
                        By working together, great things can be accomplished. At Hum Sub, our strength lies in our
                        volunteer system. We encourage you to sign up for volunteer duties at our events including Hum
                        Sub Diwali, Basant Bahar, and special events.
                      </p>
                      <p className="text-muted-foreground mb-4">
                        To volunteer with us, we kindly ask that you become a member first. This ensures our volunteers
                        are part of our community and get priority access to opportunities.{" "}
                        <Link
                          to="/membership/signup"
                          className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-200"
                        >
                          Sign up for membership here
                        </Link>
                        .
                      </p>
                      <div className="flex justify-center mt-6">
                        <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3">
                          <a
                            href="https://portal.humsub.org/index.php/login/volunteer"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="no-underline"
                          >
                            Sign Up to Volunteer
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
        <section id="sponsors" className="scroll-mt-24 space-y-12">
          <div className="text-center space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 dark:from-orange-300 dark:via-amber-300 dark:to-yellow-300 bg-clip-text text-transparent">
              Our Sponsors
            </h2>
            <div className="flex items-center justify-center gap-4">
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-orange-400 rounded-full"></div>
              <div className="w-8 h-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"></div>
              <div className="w-16 h-0.5 bg-gradient-to-r from-amber-400 to-transparent rounded-full"></div>
            </div>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Thank you to our amazing sponsors who make this celebration possible
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 sm:p-8 md:p-12">
            <Diwali2026SponsorsGrid />
          </div>
        </section>
      </div>
    </div>
  )
}
