import { Card, CardContent, CardDescription, CardTitle } from "~/components/ui/card"

type Props = {
	name: string
	href?: string
	description?: string
	imagePath: string
}

export default function YACard({ name, href, description, imagePath }: Props) {
	return (
		<Card className="h-full overflow-hidden transition-transform duration-300 hover:scale-105">
			<CardContent className="aspect-[3/4] flex flex-col items-center justify-center">
				{href ? (
					<a href={href} target="_blank" rel="noreferrer">
						<img src={imagePath} alt={name} className="h-auto max-h-96 rounded-lg object-contain" />
					</a>
				) : (
					<img src={imagePath} alt={name} className="h-auto max-h-96 rounded-lg object-contain" />
				)}
				<CardTitle className="text-lg text-center">{name}</CardTitle>
				{description && <CardDescription className="text-center text-sm mt-1">{description}</CardDescription>}
			</CardContent>
		</Card>
	)
}
