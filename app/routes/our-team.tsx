import type { MetaFunction } from "react-router"
import YACard from "~/components/ya-card"

export const meta: MetaFunction = () => {
  return [
    { title: "Our Team | Hum Sub" },
    { name: "description", content: "Meet the Hum Sub Board of Directors and volunteers." },
  ]
}

export default function OurTeam() {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <title>Our Team | Hum Sub</title>
      <h1 className="text-3xl md:text-5xl font-black text-primary mb-6">Our Team</h1>

      <div className="text-lg leading-relaxed text-muted-foreground mb-10 max-w-4xl">
        <p>
          We are a passionate team of volunteers dedicated to sharing the social and cultural traditions of India with
          residents of the North Carolina Triangle area and beyond. Our diverse backgrounds and expertise allow us to
          approach challenges from multiple perspectives.
        </p>
      </div>

      <figure className="mb-16 shadow-2xl rounded-3xl overflow-hidden border bg-muted/5">
        <img
          src="/assets/team/humsub-bod-team-2024.jpeg"
          alt="2025 Board of Directors"
          title="2025 Board of Directors"
          className="w-full h-auto object-cover max-h-[600px]"
        />
      </figure>

      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold border-b pb-3 mb-8">2026 Board Of Directors</h2>
        <div className="not-prose grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <YACard name="Usha Sankar" imagePath="/assets/team/usha-sankar.jpg" description="President" />
          <YACard name="Rajesh Gollapudi" imagePath="/assets/team/rajesh-gollapudi.jpg" description="Vice President" />
          <YACard name="Ekta Bhatia" imagePath="/assets/team/ekta-bhatia.jpeg" description="Secretary" />
          <YACard
            name="Prathik Nanavati"
            imagePath="/assets/team/male-profile-image-placeholder.png"
            description="Treasurer"
          />
          <YACard name="Prakash Punj" imagePath="/assets/team/prakash-punj.jpeg" description="BOD" />
          <YACard name="Hema Pandey" imagePath="/assets/team/hema-pandey.jpeg" description="BOD" />
          <YACard name="Sandeep Sharma" imagePath="/assets/team/sandeep-sharma-bod.jpg" description="BOD" />
          <YACard name="Anandakrishnan Narayanan" imagePath="/assets/team/anand-narayanan.jpg" description="BOD" />
          <YACard
            name="Dipendra Lamichhane (Dipu)"
            imagePath="/assets/team/dipendra-lamichhane.jpg"
            description="BOD"
          />
          <YACard name="Harjeet Kaur Lotay" imagePath="/assets/team/harjeet-kaur-lotay.jpg" description="BOD" />
          <YACard name="Nishant Munjal" imagePath="/assets/team/nishant-munjal.jpeg" description="BOD" />
          <YACard name="Alka Sinha" imagePath="/assets/team/alka-sinha-bod.jpeg" description="BOD" />
          <YACard name="Gurleen Bajaj" imagePath="/assets/team/male-profile-image-placeholder.png" description="BOD" />
          <YACard name="Shraddha Joshi" imagePath="/assets/team/male-profile-image-placeholder.png" description="BOD" />
          <YACard
            name="Manisha Bijjaragi"
            imagePath="/assets/team/male-profile-image-placeholder.png"
            description="BOD"
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl md:text-3xl font-bold border-b pb-3 mb-8">2026 Board Of Trustees</h2>
        <div className="not-prose grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <YACard name="Mamta Bisarya" imagePath="/assets/team/mamta-bisarya-boa.jpeg" description="Trustee" />
          <YACard name="Dipak Prasad" imagePath="/assets/team/dipak-prasad-boa.jpg" description="Trustee" />
          <YACard name="Satish Garimella" imagePath="/assets/team/satish-garimella-boa.jpg" description="Trustee" />
          <YACard
            name="V S Jeyakumar"
            imagePath="/assets/team/male-profile-image-placeholder.png"
            description="Trustee"
          />
        </div>
      </section>
    </div>
  )
}
