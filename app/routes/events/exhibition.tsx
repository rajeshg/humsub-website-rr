export default function Exhibition() {
	return (
		<div className="prose dark:prose-invert mx-auto max-w-5xl px-4 py-8">
			<h1>Exhibition</h1>
			<div>
				<p>
					The Hum Sub Exhibition is an annual celebration of Indian heritage, designed to share the vibrant traditions,
					stories, and artistry of India with the wider North Carolina community. Each year, the exhibition explores a
					new theme, offering visitors a fresh perspective on the rich tapestry of Indian culture.
				</p>
				<p>
					Past exhibitions have delved into diverse topics such as the grandeur and symbolism of Indian weddings, the
					intricate beauty of regional art forms, and the inspiring journeys of women personalities who have shaped
					Indian society. Through carefully curated displays, interactive experiences, and authentic artifacts, the
					exhibition brings to life the customs, creativity, and values that define India's multifaceted identity.
				</p>
				<p>
					By rotating themes annually, Hum Sub ensures that each exhibition offers something unique—whether it's
					showcasing traditional costumes and wedding rituals, highlighting classical and folk arts, or celebrating the
					achievements of Indian women across generations. This approach not only educates and entertains but also
					fosters a deeper appreciation for the diversity and dynamism of Indian culture.
				</p>
				<p>
					The exhibition is made possible through the generous contributions of community members, local artists, and
					cultural organizations. Together, we invite you to experience the sights, sounds, and stories of India, and to
					discover how these traditions continue to enrich our shared community in North Carolina.
				</p>
			</div>
			<div className="flex flex-col items-center mt-12">
				<span className="text-sm text-muted-foreground mb-2">Presented by</span>
				<img
					src="/assets/sponsors/pinnacle-financial-partners-color.jpg"
					alt="Pinnacle Financial Partners"
					className="h-12 w-auto"
					loading="lazy"
				/>
			</div>
		</div>
	)
}
