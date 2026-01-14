import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion"

export default function CulturalFAQ() {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <title>Cultural FAQ | Hum Sub</title>
      <div className="not-prose max-w-4xl mx-auto py-8 md:py-12">
        <h1 className="text-4xl md:text-5xl font-black text-primary mb-10 tracking-tight text-center">Cultural FAQ</h1>

        <div className="bg-muted/30 rounded-3xl p-6 md:p-10 border border-muted shadow-sm">
          <Accordion type="single" collapsible defaultValue="item-1" className="w-full space-y-4">
            <AccordionItem value="item-1" className="border rounded-2xl px-6 bg-background">
              <AccordionTrigger className="font-bold text-left py-4 hover:no-underline">
                What is the timeline for Basant Bahar event?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                <p className="mb-4">Basant Bahar is a spring event (March - April). Tentative schedule below:</p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Application Open: Late November</li>
                  <li>Auditions: Early February</li>
                  <li>Stage Rehearsal: Close to the event day in March/April</li>
                </ul>
                <p>
                  For more details, please check our event calendar at{" "}
                  <a className="text-primary font-bold hover:underline" href="/events/">
                    humsub.org/events
                  </a>
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border rounded-2xl px-6 bg-background">
              <AccordionTrigger className="font-bold text-left py-4 hover:no-underline">
                What is the timeline for Hum Sub Diwali event?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                <p className="mb-4">Hum Sub Diwali is a Fall event (October). Tentative schedule below:</p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Application Open: Early May</li>
                  <li>Auditions: Mid-late August</li>
                  <li>Stage Rehearsal: Close to the event day in October</li>
                </ul>
                <p>
                  For more details, please check our event calendar at{" "}
                  <a className="text-primary font-bold hover:underline" href="/events/">
                    humsub.org/events
                  </a>
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border rounded-2xl px-6 bg-background">
              <AccordionTrigger className="font-bold text-left py-4 hover:no-underline">
                Does Hum Sub allow solo performance?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                Hum Sub is committed to maximizing participation, so we do not allow solo performances at either Basant
                Bahar or Hum Sub Diwali.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border rounded-2xl px-6 bg-background">
              <AccordionTrigger className="font-bold text-left py-4 hover:no-underline">
                Is there a minimum age requirement?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                The minimum age for participants is 7 years. The performer must be 7 years old by the day of the
                audition.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border rounded-2xl px-6 bg-background">
              <AccordionTrigger className="font-bold text-left py-4 hover:no-underline">
                Who is authorized to make changes to a group's item?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                The committee will only accept requests from the group's choreographer or coordinator, or any person
                explicitly authorized by them via email to the cultural committee.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="border rounded-2xl px-6 bg-background">
              <AccordionTrigger className="font-bold text-left py-4 hover:no-underline">
                What exactly is the theme about?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                The theme is open-ended. Performances can look at contemporary or yesteryear songs (music and dance are
                reflections of the times). Choreographers are encouraged to be as creative as possible in interpreting
                the theme.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8" className="border rounded-2xl px-6 bg-background">
              <AccordionTrigger className="font-bold text-left py-4 hover:no-underline">
                Is there any limit to the number of participants?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                The Committee has only set a minimum number of participants, as the Hum Sub stage is very large. There
                is no upper limit.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-9" className="border rounded-2xl px-6 bg-background">
              <AccordionTrigger className="font-bold text-left py-4 hover:no-underline">
                How to subscribe to the cultural mailing list?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                Send an email to{" "}
                <a className="text-primary font-bold hover:underline" href="mailto:cultural_programs@humsub.net">
                  cultural_programs@humsub.net
                </a>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  )
}
