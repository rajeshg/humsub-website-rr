import { Link } from "react-router"
import { Button } from "~/components/ui/button"

export default function Volunteer() {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <title>Volunteer | Hum Sub</title>
      <div className="not-prose max-w-4xl mx-auto py-8 md:py-12">
        <h1 className="text-4xl md:text-5xl font-black text-primary mb-8 tracking-tight">Volunteer</h1>

        <figure className="mb-10 shadow-2xl rounded-3xl overflow-hidden border">
          <img
            src="/assets/volunteers.jpeg"
            alt="Hum Sub Volunteers"
            className="w-full h-auto object-cover max-h-[400px]"
          />
        </figure>

        <div className="space-y-6 text-lg leading-relaxed text-muted-foreground mb-10">
          <p className="font-semibold text-foreground">Volunteers are the backbone of any organization.</p>
          <p>
            We at Hum Sub value, cherish, and appreciate volunteers in all age groups (minimum age of volunteer is 14;
            minimum age to register independently is 16) who support us during our events by giving us their time,
            talent, support, and hard work. It takes many hands and many hearts to complete our mission.
          </p>

          <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
            <p className="m-0">
              To volunteer with us, we kindly ask that you become a member first. This ensures our volunteers are part
              of our community and get priority access to opportunities.{" "}
              <Link
                to="/membership"
                className="text-primary font-bold underline underline-offset-4 hover:text-primary/80"
              >
                Sign up for membership here
              </Link>
              .
            </p>
          </div>

          <p>
            By working together, great things can be accomplished. Unity provides a strength that is denied to the
            individual. At Hum Sub, our strength lies in our volunteer system. We encourage you to sign up for volunteer
            duties at our events Basant Bahar in the spring, Hum Sub Diwali in the fall, and special events held by the
            Town of Cary.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 bg-muted/30 rounded-3xl p-8 md:p-12 border border-muted text-center">
          <h2 className="text-2xl font-bold mb-2">Ready to make a difference?</h2>
          <p className="text-muted-foreground mb-6 max-w-md">
            Please sign up with your details on our portal and we will contact you to assign volunteer duties.
          </p>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://portal.humsub.org/index.php/login/volunteer"
            className="w-full sm:w-auto"
          >
            <Button
              size="lg"
              className="w-full sm:px-12 h-14 rounded-full text-lg shadow-xl hover:shadow-primary/20 transition-all"
            >
              Sign up to volunteer
            </Button>
          </a>
        </div>
      </div>
    </div>
  )
}
