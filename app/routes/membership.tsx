import { Link } from "react-router"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion"
import { Button } from "~/components/ui/button"

export function meta() {
  return [
    { title: "Membership | Hum Sub" },
    {
      name: "description",
      content:
        "Annual membership: $10/year and includes one reserved seat at Hum Sub Diwali, while helping fund community programming.",
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
              $10 <span className="text-lg font-bold text-muted-foreground uppercase tracking-widest">/ year</span>
            </div>
            <div className="text-lg text-muted-foreground font-medium">Annual membership (calendar year)</div>
          </div>

          <p className="text-lg leading-relaxed text-center mb-10 max-w-2xl mx-auto">
            Membership is an annual plan that includes one reserved seat at our Diwali event — while helping fund and
            grow community programming.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {[
              {
                title: "Reserved Seat Included",
                desc: "Your $10 annual membership includes one reserved seat at Hum Sub Diwali (a $12–$15 value).",
              },
              {
                title: "Support Community Programming",
                desc: "Your membership helps fund scholarships, cultural programs, and community initiatives.",
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
                Signup for Membership
              </Button>
            </Link>
          </div>
        </div>

        <section className="bg-muted/30 rounded-3xl p-8 md:p-12 border">
          <h2 className="text-3xl font-black mb-8 text-center tracking-tight">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {[
              {
                q: "What's the difference between a ticket and membership?",
                a: (
                  <>
                    Entry to Hum Sub Diwali is free. Tickets are for reserved seating. Membership is $10/year and
                    includes one reserved seat, and it also helps fund community programming. To secure membership in
                    advance, visit our{" "}
                    <Link to="/membership/signup" className="text-primary font-bold hover:underline">
                      membership sign‑up page
                    </Link>
                    .
                  </>
                ),
              },
              {
                q: "Can I just buy tickets instead of membership?",
                a: "Yes — reserved seating tickets are available online. Entry is free; tickets are for reserved seating. Membership includes one reserved seat and supports our programming.",
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
                a: "Reserved seating is available to members and ticket holders. Membership includes one reserved seat. Gates open at 9:00 AM, and we recommend arriving early to make the most of the day.",
              },
              {
                q: "I am a member — can I bring family members?",
                a: (
                  <>
                    Membership is per person. Adults (18+) need their own membership. You may{" "}
                    <Link to="/membership/signup" className="text-primary font-bold hover:underline">
                      purchase additional memberships
                    </Link>{" "}
                    for family members online or at the event.
                  </>
                ),
              },
              {
                q: "Do I need a ticket or membership to take photos?",
                a: (
                  <>
                    The front-stage seating and photo area at Hum Sub Diwali are reserved for our members and ticket
                    holders. 📸 Your membership supports scholarships, cultural programs, and community initiatives.
                  </>
                ),
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
