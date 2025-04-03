export default function CulturalFAQ() {
    return (
        <div className="flex flex-col gap-2">
            <title>Cultural FAQ | Hum Sub</title>
            <h1>Hum Sub - Cultural FAQ</h1>
            <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-2" checked={true} />
                <div className="collapse-title font-semibold">
                    What is the timeline for Basant Bahar event?
                </div>
                <div className="collapse-content text-sm">
                    <p>
                        Basant Bahar is a spring event ( March - April). Tentative
                        schedule below
                    </p>
                    <ul>
                        <li>Application Open: Late November</li>
                        <li>Auditions: Early February</li>
                        <li>
                            Stage Rehearsal: Close to the event day in March/April
                        </li>
                    </ul>
                    <p>
                        For more details, please check our event calendar at {" "}
                        <a href="/events/">https://humsub.org/events/</a>
                    </p>
                </div>
            </div>

            <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title font-semibold">
                    What is the timeline for Hum Sub Diwali event?
                </div>
                <div className="collapse-content text-sm">
                    <p>
                        Hum Sub Diwali is a Fall event (October). Tentative schedule
                        below:
                    </p>
                    <ul>
                        <li>Application Open: Early May</li>
                        <li>Auditions: Mid-late August</li>
                        <li>Stage Rehearsal: Close to the event day in October</li>
                    </ul>
                    <p>
                        For more details, please check our event calendar at
                        <a href="https://humsub.org/events/"
                        >https://humsub.org/events/</a
                        >
                    </p>
                </div>
            </div>

            <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title font-semibold">
                    Does Hum Sub allow solo performance for Basant Bahar or Hum Sub
                    Diwali?
                </div>
                <div className="collapse-content text-sm">
                    Hum Sub is committed to maximizing participants, so we do not
                    allow solo performances at either event.
                </div>
            </div>

            <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title font-semibold">
                    Is there a minimum age requirement for a participant?
                </div>
                <div className="collapse-content text-sm">
                    Minimum age for participant is 7 years. The performer should
                    have turned 7 years of age by the day of the audition.
                </div>
            </div>

            <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title font-semibold">
                    Who is authorized to get information or make changes to a
                    group's item?
                </div>
                <div className="collapse-content text-sm">
                    The committee will only accept requests from the group's
                    choreographer or coordinator, or any other person authorized by
                    them via email to the cultural committee.
                </div>
            </div>

            <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title font-semibold">
                    What exactly is the theme about ?
                </div>
                <div className="collapse-content text-sm">
                    The theme is rather open-ended. One way of integrating it into
                    the performances could be to also look at yesteryear songs,
                    given that music and dance, both popular ones as well as those
                    of more classical vintage, are a reflection of the times.
                    Choreographers are encouraged to be as creative as possible in
                    interpreting the theme.
                </div>
            </div>

            <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title font-semibold">
                    How early will choreographers receive confirmation of their song
                    selections ?
                </div>
                <div className="collapse-content text-sm">
                    The sooner the Committee receives them, the better. Songs will
                    be allotted on a first-come, first- serve basis.
                </div>
            </div>

            <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title font-semibold">
                    Is there any limit to the number of participants ?
                </div>
                <div className="collapse-content text-sm">
                    The Committee has only set a minimum number of participants, as
                    the Hum Sub Diwali stage is a big stage. There is no upper
                    limit.
                </div>
            </div>

            <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title font-semibold">
                    How to subscribe or unsubscribe from cultural mailing list
                </div>
                <div className="collapse-content text-sm">
                    Send email to <a href="mailto:cultural_programs@humsub.net"
                    >cultural_programs@humsub.net</a
                    >
                </div>
            </div>
        </div>
    )
}