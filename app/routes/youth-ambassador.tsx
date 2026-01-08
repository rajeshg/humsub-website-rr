import YACard from "~/components/ya-card"

export default function YouthAmbassador() {
	return (
		<div>
			<title>Youth Ambassador | Hum Sub</title>
			<h1>Youth Ambassador</h1>
			<p>
				A key focus area for Hum Sub in recent years has been Youth Leadership. This year, we are evolving our Youth
				Ambassador (YA) Program to a two-year internship, open to 9th and 10th graders. The goal is to provide a
				platform for growing young minds for community engagement to promote Indian culture and heritage in the Triangle
				area and beyond, as well as enhance their personal/professional development skills by engaging them in the
				planning, management and decision-making processes. The broad vision here is to bring in new energy and
				knowledge to Hum Sub's mission and vision, as well as contribute to positive youth development at an early age
				and help youth grow into engaged and responsible leaders in the future.
			</p>
			<p>
				Those selected for this program should have had some volunteering experience at Hum Sub events in the past years
				or have volunteering experience with other local organizations. In keeping with our efforts to be diverse and
				inclusive, we will also open up the program to youth of non-Indian origin to serve as Youth Ambassadors.
			</p>
			<img
				src="/assets/ya/youth-ambassadors-2022.jpg"
				alt="2022 Hum Sub Youth Ambassadors"
				title="2022 Hum Sub Youth Ambassadors"
				className="justify-center block mx-auto object-contain transition-transform duration-300 hover:scale-105"
			/>
			<h2>Benefits of becoming a Youth Ambassador:</h2>
			<ul>
				<li>Develop individual competencies and leadership skills</li>
				<li>Develop time management skills</li>
				<li>Develop program planning, management and organizational skills</li>
				<li>Build positive self-identity and confidence through meaningful contribution to the local community</li>
				<li>Increase ability to be self-reflective and think critically about their experience</li>
				<li>Achieve recognition for community service and engagement</li>
			</ul>
			<p>
				Hum Sub will involve YAs in various Hum Sub activities planned throughout the year. The goal here is to provide
				high-schoolers with a wide array of opportunities to experience and contribute to real-world program planning,
				decision making, program management and execution (on the event day) and help them develop key leadership
				skills.
			</p>
			<p>Specifically, some examples of YA engagement include the following:</p>
			<ol>
				<li>Program planning</li>
				<li>Social media, publicity, and marketing</li>
				<li>Program management</li>
				<li>Program evaluation and documentation</li>
				<li>Networking and relationship-building with other local organizations</li>
			</ol>
			<h2>Youth Ambassadors (2025-2026)</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-transparent">
				<YACard name="Rishi Sankaran" imagePath="/assets/ya/rishi-sankaran.jpeg" />
				<YACard name="Apaarpreet Bajaj" imagePath="/assets/ya/Apaarpreet-Bajaj.jpeg" />
				<YACard name="Ahana Satija" imagePath="/assets/ya/ahana-satija.jpeg" />
				<YACard name="Ishaan Kancharla" imagePath="/assets/ya/ishaan-kancharla.jpeg" />
				<YACard name="Janhawi Patil" imagePath="/assets/ya/janhawi-patil.jpeg" />
			</div>
			<h2>Youth Ambassadors (2024-2025)</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-transparent">
				<YACard name="Sonia Daptardar" imagePath="/assets/ya/Sonia-Daptardar.jpeg" />
				<YACard name="Ishita Bafna" imagePath="/assets/ya/Ishita-Bafna.jpg" />
				<YACard name="Rishi Sankaran" imagePath="/assets/ya/rishi-sankaran.jpeg" />
				<YACard name="Apaarpreet Bajaj" imagePath="/assets/ya/Apaarpreet-Bajaj.jpeg" />
				<YACard name="Sanvi Pawar" imagePath="/assets/ya/Sanvi-Pawar.jpg" />
				<YACard name="Tanmayi Panasa" imagePath="/assets/ya/tanmayi-panasa.jpg" />
				<YACard name="Madhu Shri Gupta" imagePath="/assets/ya/madhu-shri-gupta.jpeg" />
			</div>
		</div>
	)
}
