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
      <CardContent className="max-w-xs w-full flex flex-col items-center p-2">
        {href ? (
          <a href={href} target="_blank" rel="noreferrer">
            <img
              src={imagePath}
              alt={name}
              className="max-w-[80%] max-h-48 w-auto h-auto mx-auto mb-2 rounded-lg object-contain"
            />
          </a>
        ) : (
          <img
            src={imagePath}
            alt={name}
            className="max-w-[80%] max-h-48 w-auto h-auto mx-auto mb-2 rounded-lg object-contain"
          />
        )}
        <CardTitle className="text-base sm:text-lg text-center mt-2">{name}</CardTitle>
        {description && <CardDescription className="text-center text-sm mt-1">{description}</CardDescription>}
      </CardContent>
    </Card>
  )
}
