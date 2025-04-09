export default function SponsorCard({
	name,
	href,
	description,
	imagePath,
}: { name: string; href?: string; description?: string; imagePath: string }) {
	return (
		<div className="card card-sm bg-base-100 shadow-sm flex justify-center place-items-center">
			<figure className="mb-2 p-4">
				{href ? (
					<a href={href} target="_blank" rel="noreferrer">
						<img
							src={imagePath}
							alt={name}
							width="200"
							height="200"
							loading="lazy"
							className="flex place-items-center justify-center"
						/>
					</a>
				) : (
					<img src={imagePath} alt={name} width="250" height="200" className="flex place-items-center justify-center" />
				)}
			</figure>
			<div className="mt-0">
				<h2 className="text-xl text-center justify-center mt-0 mb-2">{name}</h2>
				<p className="text-center italic px-2">{description}</p>
			</div>
		</div>
	)
}
