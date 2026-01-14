import YACard from "~/components/ya-card"

export default function OurTeam() {
  return (
    <div>
      <title>Our Team | Hum Sub</title>
      <h1>Our Team</h1>
      <p>
        We are a passionate team of volunteers dedicated to sharing the social and cultural traditions of India with
        residents of the North Carolina Triangle area and beyond. Our diverse backgrounds and expertise allow us to
        approach challenges from multiple perspectives.
      </p>
      <img
        src="../assets/team/humsub-bod-team-2024.jpeg"
        alt="2025 Board of Directors"
        title="2025 Board of Directors"
        className="mx-auto"
      />

      <h2>2026 Board Of Directors of Hum Sub Inc</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-transparent">
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
        <YACard name="Sandeep Sharma" imagePath="/assets/team/male-profile-image-placeholder.png" description="BOD" />
        <YACard name="Anandakrishnan Narayanan" imagePath="/assets/team/anand-narayanan.jpg" description="BOD" />
        <YACard name="Dipendra Lamichhane (Dipu)" imagePath="/assets/team/dipendra-lamichhane.jpg" description="BOD" />
        <YACard name="Harjeet Kaur Lotay" imagePath="/assets/team/harjeet-kaur-lotay.jpg" description="BOD" />
        <YACard name="Nishant Munjal" imagePath="/assets/team/nishant-munjal.jpeg" description="BOD" />
        <YACard name="Alka Sinha" imagePath="/assets/team/male-profile-image-placeholder.png" description="BOD" />
        <YACard name="Gurleen Baja" imagePath="/assets/team/male-profile-image-placeholder.png" description="BOD" />
        <YACard name="Shraddha Joshi" imagePath="/assets/team/male-profile-image-placeholder.png" description="BOD" />
      </div>

      <h2>2026 Board Of Trustees of Hum Sub Inc</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-transparent">
        <YACard name="Satish Garimella" imagePath="/assets/team/satish-garimella-boa.jpg" />
        <YACard name="Mamta Bisarya" imagePath="/assets/team/mamta-bisarya-boa.jpeg" />
        <YACard name="Dipak Prasad" imagePath="/assets/team/dipak-prasad-boa.jpg" />
        <YACard name="V S Jeyakumar" imagePath="/assets/team/male-profile-image-placeholder.png" />
      </div>
    </div>
  )
}
