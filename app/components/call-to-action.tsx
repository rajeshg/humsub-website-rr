import { Button } from "./ui/button"

export function CallToAction({
	title,
	description,
	buttonText,
	buttonLink,
}: { title: string; description: string; buttonText: string; buttonLink: string }) {
	return (
		<div className="flex items-center justify-center">
			<div className="w-full max-w-md">
				<div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
					<h2 className="text-2xl font-semibold mb-2">{title}</h2>
					<p className="mb-4">{description}</p>
					<div className="flex justify-end">
						<a href={buttonLink}>
							<Button>{buttonText}</Button>
						</a>
					</div>
				</div>
			</div>
		</div>
	)
}
