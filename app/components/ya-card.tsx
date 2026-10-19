import { Card, CardContent, CardDescription, CardTitle } from "~/components/ui/card"

type Props = {
  name: string
  href?: string
  description?: string
  imagePath: string
}

export default function YACard({ name, href, description, imagePath }: Props) {
  return (
    <Card className="overflow-hidden transition-transform duration-300 pointer-fine:hover:scale-105">
      <CardContent className="w-full p-0">
        <div className="aspect-[3/4] w-full overflow-hidden bg-muted">
          {href ? (
            <a href={href} target="_blank" rel="noreferrer">
              <img src={imagePath} alt={name} loading="lazy" className="h-full w-full object-cover object-top" />
            </a>
          ) : (
            <img src={imagePath} alt={name} loading="lazy" className="h-full w-full object-cover object-top" />
          )}
        </div>
        <div className="px-3 py-3">
          <CardTitle className="text-base sm:text-lg text-center">{name}</CardTitle>
          {description && <CardDescription className="text-center text-sm mt-1">{description}</CardDescription>}
        </div>
      </CardContent>
    </Card>
  )
}
