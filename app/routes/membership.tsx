import { Link } from "react-router"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion"
import { Button } from "~/components/ui/button"

export function meta() {
  return [
    { title: "Membership | Hum Sub" },
    {
      name: "description",
      content:
        "One-time Hum Sub membership: $12 early bird (through Oct 6, 2026) / $15 from Oct 7, 2026, per person, per calendar year. Includes reserved seating at Hum Sub Diwali.",
    },
  ]
}

export default function Membership() {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <title>Membership | Hum Sub</title>
      <div className="not-prose max-w-4xl mx-auto py-8 md:py-12">
        <h1 className="text-4xl md:text-5xl font-black text-center mb-10 text-primary tracking-tight">
          Hum Sub Membership
        </h1>

        <div className="bg-gradient-to-br from-green-500/5 to-emerald-600/10 rounded-3xl border border-green-200/50 dark:border-green-800/30 p-8 md:p-12 mb-12 shadow-xl">
          <div className="text-center mb-8">
            <div className="text-5xl font-black text-green-600 dark:text-green-400 mb-2">
              $12 <span className="text-lg font-bold text-muted-foreground uppercase tracking-widest">early bird</span>
            </div>
            <div className="text-lg text-muted-foreground font-medium">
              $15 from Oct 7, 2026 · per person, per calendar year · one-time membership
            </div>
            <div className="text-sm text-muted-foreground mt-1">Early bird pricing available through Oct 6, 2026</div>
          </div>

          <p className="text-lg leading-relaxed text-center mb-10 max-w-2xl mx-auto">
            Membership is a one-time purchase that includes reserved seating at Hum Sub Diwali, granted for the whole
            day. Your membership helps connect you to Hum Sub's mission and support its many initiatives.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              {
                title: "Reserved Seating Included",
                desc: "Your membership includes reserved seating at Hum Sub Diwali, valid for the whole day — from gates open at 9:00 AM through the fireworks finale.",
              },
              {
                title: "One-Time, No Recurring",
                desc: "Membership is a one-time purchase, per person, per calendar year. No renewals, no recurring charges.",
              },
              {
                title: "Support Hum Sub",
                desc: "Your membership helps connect you to Hum Sub's mission and support its many initiatives.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white/50 dark:bg-black/20 backdrop-blur-sm p-6 rounded-2xl border border-white/50 dark:border-white/10 shadow-sm"
              >
                <div className="text-green-600 mb-3 text-2xl">✅</div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/membership/signup" aria-label="Open membership sign-up">
              <Button
                size="lg"
                className="rounded-full px-10 h-14 text-lg shadow-xl hover:shadow-green-500/20 transition-all bg-green-600 hover:bg-green-700"
              >
                Get Membership
              </Button>
            </Link>
          </div>
        </div>

        <section className="bg-muted/30 rounded-3xl p-8 md:p-12 border">
          <h2 className="text-3xl font-black mb-8 text-center tracking-tight">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {[
              {
                q: "What does my membership include?",
                a: (
                  <>
                    Your membership includes reserved seating at Hum Sub Diwali, valid for the whole day. Your
                    membership helps connect you to Hum Sub's mission and support its many initiatives. Entry to the
                    event itself is free for everyone. To secure membership in advance, visit our{" "}
                    <Link to="/membership/signup" className="text-primary font-bold hover:underline">
                      membership sign‑up page
                    </Link>
                    .
                  </>
                ),
              },
              {
                q: "Is membership recurring?",
                a: "No. Membership is a one-time purchase, per person, per calendar year — there are no renewals or recurring charges.",
              },
              {
                q: "How much does membership cost?",
                a: "Membership is $12 early bird through Oct 6, 2026, and $15 from Oct 7, 2026 — per person, per calendar year.",
              },
              {
                q: "Do I need a membership even though entry is free?",
                a: "No — the event is open to everyone. Membership is for those who want guaranteed reserved seating for the whole day and want to support Hum Sub's mission.",
              },
              {
                q: "Can we get membership in person at an event?",
                a: (
                  <>
                    Yes. You can purchase membership at the event or in advance via our{" "}
                    <Link to="/membership/signup" className="text-primary font-bold hover:underline">
                      membership sign‑up page
                    </Link>
                    .
                  </>
                ),
              },
              {
                q: "Is seating reserved for members?",
                a: "Yes — membership includes reserved seating for the whole day. Gates open at 9:00 AM, and we recommend arriving early to make the most of the day. Your seat is yours for the whole day, but if you leave and come back, we can't guarantee your seat will still be available.",
              },
              {
                q: "I am a member — can I bring family members?",
                a: (
                  <>
                    Membership is per person. You may{" "}
                    <Link to="/membership/signup" className="text-primary font-bold hover:underline">
                      purchase additional memberships
                    </Link>{" "}
                    for family members online or at the event.
                  </>
                ),
              },
              {
                q: "Do I need a membership to take photos?",
                a: "The front-stage seating and photo area at Hum Sub Diwali are reserved for our members. 📸 Your membership helps connect you to Hum Sub's mission and support its many initiatives.",
              },
            ].map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border rounded-2xl px-6 bg-background">
                <AccordionTrigger className="text-left font-bold py-4 hover:no-underline">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </div>
    </div>
  )
}
