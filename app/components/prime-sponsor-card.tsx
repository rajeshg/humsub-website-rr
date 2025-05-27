export default function PrimeSponsorCard({
	name,
	href,
	description,
	imagePath,
}: { name: string; href?: string; description?: string; imagePath: string }) {
	return (
		<div className="max-w-sm md:w-full md:w-[2/3] bg-base-100 shadow-sm flex flex-col justify-center place-items-center">
			<figure className="mb-2 p-4">
				{href ? (
					<a href={href} target="_blank" rel="noreferrer">
						<img src={imagePath} alt={name} width={600} height={400} />
					</a>
				) : (
					<img src={imagePath} alt={name} width={600} height={400} />
				)}
			</figure>
			<div className="mt-0">
				<h2 className="text-xl text-center justify-center mt-0 mb-2">{name}</h2>
				<p className="text-center italic px-2">{description}</p>
			</div>
		</div>
	)
}
