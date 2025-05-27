import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion"

export default function CulturalFAQ() {
	return (
		<div className="flex flex-col gap-2">
			<title>Cultural FAQ | Hum Sub</title>
			<h1>Hum Sub - Cultural FAQ</h1>
			<Accordion type="single" collapsible defaultValue="item-1" className="w-full">
				<AccordionItem value="item-1">
					<AccordionTrigger className="font-semibold text-left">
						What is the timeline for Basant Bahar event?
					</AccordionTrigger>
					<AccordionContent>
						<p>Basant Bahar is a spring event ( March - April). Tentative schedule below</p>
						<ul className="list-disc ml-5">
							<li>Application Open: Late November</li>
							<li>Auditions: Early February</li>
							<li>Stage Rehearsal: Close to the event day in March/April</li>
						</ul>
						<p>
							For more details, please check our event calendar at{" "}
							<a className="link link-primary" href="/events/">
								https://humsub.org/events/
							</a>
						</p>
					</AccordionContent>
				</AccordionItem>

				<AccordionItem value="item-2">
					<AccordionTrigger className="font-semibold text-left">
						What is the timeline for Hum Sub Diwali event?
					</AccordionTrigger>
					<AccordionContent>
						<p>Hum Sub Diwali is a Fall event (October). Tentative schedule below:</p>
						<ul className="list-disc ml-5">
							<li>Application Open: Early May</li>
							<li>Auditions: Mid-late August</li>
							<li>Stage Rehearsal: Close to the event day in October</li>
						</ul>
						<p>
							For more details, please check our event calendar at{" "}
							<a className="link link-primary" href="https://humsub.org/events/">
								https://humsub.org/events/
							</a>
						</p>
					</AccordionContent>
				</AccordionItem>

				<AccordionItem value="item-3">
					<AccordionTrigger className="font-semibold text-left">
						Does Hum Sub allow solo performance for Basant Bahar or Hum Sub Diwali?
					</AccordionTrigger>
					<AccordionContent>
						Hum Sub is committed to maximizing participants, so we do not allow solo performances at either event.
					</AccordionContent>
				</AccordionItem>

				<AccordionItem value="item-4">
					<AccordionTrigger className="font-semibold text-left">
						Is there a minimum age requirement for a participant?
					</AccordionTrigger>
					<AccordionContent>
						Minimum age for participant is 7 years. The performer should have turned 7 years of age by the day of the
						audition.
					</AccordionContent>
				</AccordionItem>

				<AccordionItem value="item-5">
					<AccordionTrigger className="font-semibold text-left">
						Who is authorized to get information or make changes to a group's item?
					</AccordionTrigger>
					<AccordionContent>
						The committee will only accept requests from the group's choreographer or coordinator, or any other person
						authorized by them via email to the cultural committee.
					</AccordionContent>
				</AccordionItem>

				<AccordionItem value="item-6">
					<AccordionTrigger className="font-semibold text-left">What exactly is the theme about ?</AccordionTrigger>
					<AccordionContent>
						The theme is rather open-ended. One way of integrating it into the performances could be to also look at
						yesteryear songs, given that music and dance, both popular ones as well as those of more classical vintage,
						are a reflection of the times. Choreographers are encouraged to be as creative as possible in interpreting
						the theme.
					</AccordionContent>
				</AccordionItem>

				<AccordionItem value="item-7">
					<AccordionTrigger className="font-semibold text-left">
						How early will choreographers receive confirmation of their song selections ?
					</AccordionTrigger>
					<AccordionContent>
						The sooner the Committee receives them, the better. Songs will be allotted on a first-come, first- serve
						basis.
					</AccordionContent>
				</AccordionItem>

				<AccordionItem value="item-8">
					<AccordionTrigger className="font-semibold text-left">
						Is there any limit to the number of participants ?
					</AccordionTrigger>
					<AccordionContent>
						The Committee has only set a minimum number of participants, as the Hum Sub Diwali stage is a big stage.
						There is no upper limit.
					</AccordionContent>
				</AccordionItem>

				<AccordionItem value="item-9">
					<AccordionTrigger className="font-semibold text-left">
						How to subscribe or unsubscribe from cultural mailing list
					</AccordionTrigger>
					<AccordionContent>
						Send email to{" "}
						<a className="link link-primary" href="mailto:cultural_programs@humsub.net">
							cultural_programs@humsub.net
						</a>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	)
}
