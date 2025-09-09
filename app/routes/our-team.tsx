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
			/>

			<h2>2025 Board Of Directors of Hum Sub Inc</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-transparent">
				<YACard name="Sachin Joshi" imagePath="/assets/team/sachin-joshi.png" description="President" />
				<YACard name="Amardeep Bajaj" imagePath="/assets/team/amardeep-bajaj.jpg" description="Vice President" />
				<YACard name="Ekta Bhatia" imagePath="/assets/team/ekta-bhatia.jpeg" description="Secretary" />
				<YACard name="Kaajal Nanavati" imagePath="/assets/team/kaajal-nanavati.jpg" description="Treasurer" />
				<YACard name="Anandakrishnan Narayanan" imagePath="/assets/team/anand-narayanan.jpg" />
				<YACard name="Prakash Punj" imagePath="/assets/team/prakash-punj.jpeg" />
				<YACard name="Usha Sankar" imagePath="/assets/team/usha-sankar.jpg" />
				<YACard name="Dipendra Lamichhane" imagePath="/assets/team/dipendra-lamichhane.jpg" />
				<YACard name="Narendra Kalyankar" imagePath="/assets/team/narendra-kalyankar.jpg" />
				<YACard name="Nishant Munjal" imagePath="/assets/team/nishant-munjal.jpeg" />
				<YACard name="Vandana Pawar" imagePath="/assets/team/vandana-pawar.jpg" />
				<YACard name="Harjeet Kaur Lotay" imagePath="/assets/team/harjeet-kaur-lotay.jpg" />
				<YACard name="Hema Pandey" imagePath="/assets/team/hema-pandey.jpeg" />
				<YACard name="Padmaja Sharma" imagePath="/assets/team/padmaja-sharma.jpg" />
				<YACard name="Rajesh Gollapudi" imagePath="/assets/team/rajesh-gollapudi.jpg" />
			</div>

			<h2>2025 Board Of Trustees of Hum Sub Inc</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-transparent">
				<YACard name="Sridevi Jagannath" imagePath="/assets/team/sridevi-jagannath-boa.jpg" />
				<YACard name="Satish Garimella" imagePath="/assets/team/satish-garimella-boa.jpg" />
				<YACard name="Mamta Bisarya" imagePath="/assets/team/mamta-bisarya-boa.jpeg" />
				<YACard name="Dipak Prasad" imagePath="/assets/team/dipak-prasad-boa.jpg" />
			</div>
		</div>
	)
}
