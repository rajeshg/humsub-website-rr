import { Button } from "./ui/button"

export function CallToAction({
  title,
  description,
  buttonText,
  buttonLink,
}: {
  title: string
  description: string
  buttonText: string
  buttonLink: string
}) {
  return (
    <div className="not-prose flex items-center justify-center w-full max-w-md">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 flex flex-col space-y-3">
        <h2 className="text-2xl font-semibold !mt-0">{title}</h2>
        <p>{description}</p>
        <div className="flex justify-end">
          <a href={buttonLink} target="_blank" rel="noopener noreferrer">
            <Button>{buttonText}</Button>
          </a>
        </div>
      </div>
    </div>
  )
}
