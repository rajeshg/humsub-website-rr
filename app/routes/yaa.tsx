import YACard from "~/components/ya-card"

export default function YAA() {
	return (
		<>
			<title>Youth Achievement Award | Hum Sub</title>
			<div>
				<h1>Youth Achievement Award</h1>
				<p>
					The Hum Sub Youth Achievement Award (YAA) is inspired by Buddha's parting message to his disciples – "Aapo
					Deepo Bhava", or "Be a light unto yourself". Instituted back in 2014, YAA is Hum Sub's highly successful
					initiative toward recognizing well-rounded youth (academics, extracurricular, volunteering, etc.) in our
					community and enabling them to become great future leaders. This program has recognized a lot of children
					through the years. The felicitation ceremony takes place annually on the much-acclaimed Hum Sub Diwali stage
					where the winners accept the awards in front of a 15,000-strong audience.
				</p>
				<p>
					Youth from all ethnicities and backgrounds are eligible and this award is not restricted to youth of
					Asian-Indian descent. We have a diverse and elite panel of judges who evaluate applications. Since 2022, Hum
					Sub has put in extra efforts to push for diversity in the applicant pool. We have partnered with local
					non-profits to get this message out. These efforts have paid off since we have seen a consistent jump in
					applications year over year. Keeping conflict of interest and bias concerns in mind, Hum Sub has consistently
					maintained the policy of not allowing its board members' kids to apply to this award.
				</p>
				<p>
					Hum Sub will give out cash awards to top two applicants in the middle and high-school categories each, for
					their outstanding achievements and will be recognized at our flagship Hum Sub Diwali event. Hum Sub is
					extremely grateful to the team at Coastal Credit Union (Diamond sponsor) for their 3-year commitment to pick
					up the sponsorship for YAA. Hum Sub’s goal is for the YAA program to be featured on school newsletters as one
					of the coveted scholarships.
				</p>

				<div className="flex flex-col items-center px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-800">
					<img
						src="/assets/sponsors/coastal-logo.png"
						alt="Coastal Credit Union Logo - Diamond Sponsor"
						className="max-h-32 mx-auto object-contain mb-4"
						title="Coastal Credit Union - Diamond Sponsor"
					/>
					<span className="text-blue-700 dark:text-blue-300 font-medium">Sponsored by Coastal Credit Union</span>
				</div>
				<p>
					For more information, please check at{" "}
					<a href="https://humsub.org/assets/YAA-2025-Guidelines.pdf" target="_blank" rel="noopener noreferrer">
						YAA Guidelines
					</a>
					.
				</p>
				<ul>
					<li>
						<a href="/assets/YAA-2025-Guidelines.pdf">YAA-2025 Guideline updates</a>
					</li>
					<li>
						<a href="https://form.jotform.com/250638631820152" target="_blank" rel="noopener noreferrer">
							YAA-2025 Application Link
						</a>
					</li>
				</ul>
				<p>YAA-2025 timeline is as follows:</p>
				<ul>
					<li>Applications Deadline: Sep 14, 2025</li>
					<li>Winners Notified: Oct 11, 2025 at Hum Sub Diwali</li>
					<li>Awards presented at Hum Sub Diwali 2025: Oct 11, 2025</li>
				</ul>
				<img
					src="/assets/YAA-2025-Application-QRcode.png"
					alt="QR Code for YAA 2025 Application"
					className="max-h-48 justify-center block mx-auto object-contain transition-transform duration-300 hover:scale-110"
					title="QR Code for YAA 2025 Application"
				/>
				<h2>2024 WINNERS</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-transparent">
					<YACard name="Soham Vaidya Gaonkar" imagePath="/assets/yaa/2024/Soham-Gaonkar.jpg" />
					<YACard name="Nachammai Annamalai" imagePath="/assets/yaa/2024/Nachammai-Annamalai.png" />
					<YACard name="Rishikesh T. Sankaran" imagePath="/assets/yaa/2024/rishi-sankaran.jpeg" />
					<YACard name="Shashank Venkata Mantrala" imagePath="/assets/yaa/2024/Shashank-Mantrala.png" />
				</div>
				<h2>2023 WINNERS</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-transparent">
					<YACard name="Ishita Prasanna Bafna" imagePath="/assets/yaa/2023/Ishita-Bafna.jpg" />
					<YACard name="Swayam Bhavik Shah" imagePath="/assets/yaa/2023/Swayam-Bhavik-Shah.jpg" />
					<YACard name="Saesha Agarwal" imagePath="/assets/yaa/2023/saesha-agarwal.jpeg" />
					<YACard name="Sonia Prasanna Daptardar" imagePath="/assets/yaa/2023/Sonia-Daptardar.jpeg" />
					<YACard name="Simran Gulati" imagePath="/assets/yaa/2023/simran-gulati.jpeg" />
					<YACard name="Sai Amrutha Harshini Sree Kara" imagePath="/assets/yaa/2023/Sai-Amrutha-Kara.jpeg" />
				</div>
				<h2>2022 WINNERS</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-transparent">
					<YACard name="Melody Lee" imagePath="/assets/yaa/2022/melody-lee.jpg" />
					<YACard name="Ashna Singh" imagePath="/assets/yaa/2022/ashna-singh.jpg" />
					<YACard name="Tanmayi Panasa" imagePath="/assets/yaa/2022/tanmayi-panasa.jpg" />
					<YACard name="Kavya Sriram" imagePath="/assets/yaa/2022/kavya-sriram.jpeg" />
					<YACard name="Ashwin Sivakumaran" imagePath="/assets/yaa/2022/ashwin-sivakumaran.jpg" />
				</div>
				<h2>2021 WINNERS</h2>
				<ul>
					<li>Anika Arora</li>
				</ul>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-transparent">
					<YACard name="Shaurya Sharma" imagePath="/assets/yaa/2021/Shaurya-Sharma.jpg" />
					<YACard name="Esha Agarwal" imagePath="/assets/yaa/2021/Esha-Agarwal.jpg" />
					<YACard name="Sachi Agarwal" imagePath="/assets/yaa/2021/Sachi-Agarwal.jpg" />
				</div>
				<h2>2020 WINNERS</h2>
				<ul>
					<li>Uma Bhat</li>
				</ul>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-transparent">
					<YACard name="Suhani Gulati" imagePath="/assets/yaa/2020/Suhani-Gulati.png" />
					<YACard name="Akshar Srivats" imagePath="/assets/yaa/2020/Akshar-Srivats.jpg" />
					<YACard name="Shreya Nadendla" imagePath="/assets/yaa/2020/Shreya-Nadendla.jpeg" />
				</div>
				<h2>2019 WINNERS</h2>
				<ul>
					<li>Shriya Komaragiri</li>
					<li>Yutika Aggarwal</li>
					<li>Tiffanie Lee</li>
					<li>Rishi Ranabothu</li>
				</ul>
				<h2>2018 WINNERS</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-transparent">
					<YACard name="Priyanshi S. Aeron" imagePath="/assets/yaa/2018/Priyanshi-Aeron.png" />
					<YACard name="Sai Pranav Kosuri" imagePath="/assets/yaa/2018/Sai-Pranav-Kosuri.jpeg" />
					<YACard name="Kaviya Anjali Sathish" imagePath="/assets/yaa/2018/Kaviya-Sathish.jpg" />
					<YACard name="Arushi Bhatia" imagePath="/assets/yaa/2018/Arushi-Bhatia.jpg" />
				</div>
			</div>
			<h2>2017 WINNERS</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-transparent">
				<YACard name="Radha Varadan" imagePath="/assets/yaa/2017/Radha-Varadan.jpg" />
				<YACard name="Rohan Deshpande" imagePath="/assets/yaa/2017/Rohan-Deshpande.jpg" />
				<YACard name="Maya S. Nair" imagePath="/assets/yaa/2017/Maya-Nair.jpg" />
				<YACard name="Rahul Bhatia" imagePath="/assets/yaa/2017/Rahul-Bhatia.jpg" />
			</div>
			<h2>2016 WINNERS</h2>
			<ul>
				<li>Shaily Shah</li>
				<li>Prarthana Kalmath</li>
				<li>Sachin Raghavendran</li>
			</ul>
			<h2>2015 WINNERS</h2>
			<ul>
				<li>Meghana</li>
				<li>Arjun Arora</li>
				<li>Kaveen Chandra</li>
				<li>Smit Doshi</li>
			</ul>
			<h2>2014 WINNERS</h2>
			<ul>
				<li>Sweta Bhatnagar</li>
				<li>Anuj Thakkar</li>
			</ul>
		</>
	)
}
