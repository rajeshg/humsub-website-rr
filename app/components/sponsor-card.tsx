import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"

export default function SponsorCard({
	name,
	href,
	description,
	imagePath,
}: { name: string; href?: string; description?: string; imagePath: string }) {
	return (
		<Card className="flex flex-col items-center shadow-sm">
			<CardContent className="p-4 pb-2 flex justify-center items-center">
				{href ? (
					<a href={href} target="_blank" rel="noreferrer">
						<img src={imagePath} alt={name} loading="lazy" className="max-h-[120px] max-w-[200px] object-contain" />
					</a>
				) : (
					<img src={imagePath} alt={name} loading="lazy" className="max-h-[120px] max-w-[200px] object-contain" />
				)}
			</CardContent>
			<CardHeader className="p-4 pt-0 text-center w-full">
				<CardTitle className="text-xl mb-2">
					{href ? (
						<a href={href} target="_blank" rel="noopener noreferrer" className="text-xl mb-2">
							{name}
						</a>
					) : (
						<span>{name}</span>
					)}
				</CardTitle>
				{description && <CardDescription className="italic px-2">{description}</CardDescription>}
			</CardHeader>
		</Card>
	)
}
