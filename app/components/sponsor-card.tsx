import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"

export default function SponsorCard({
  name,
  href,
  description,
  imagePath,
}: {
  name: string
  href?: string
  description?: string
  imagePath: string | string[]
}) {
  const images = Array.isArray(imagePath) ? imagePath.slice(0, 2) : [imagePath]
  return (
    <Card className="flex flex-col items-center shadow-sm gap-0 py-2 md:py-4">
      <CardContent className="p-3 pb-2 flex justify-center items-center">
        <div className="flex items-center justify-center p-2 gap-2">
          {images.map((img) => (
            <React.Fragment key={`${img}-${name}`}>
              {href ? (
                <a href={href} target="_blank" rel="noopener noreferrer">
                  <img
                    src={img}
                    alt={name}
                    loading="lazy"
                    className="aspect-square w-full max-w-48 h-full object-contain shadow-sm mt-1 mb-1 p-1 bg-white rounded-lg"
                  />
                </a>
              ) : (
                <img
                  src={img}
                  alt={name}
                  loading="lazy"
                  className="aspect-square w-full max-w-48 h-full object-contain shadow-sm mt-1 mb-1 p-1 bg-white rounded-lg"
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </CardContent>
      <CardHeader className="p-4 pt-0 text-center w-full">
        <CardTitle className="text-xl mb-2">
          {href ? (
            <a href={href} target="_blank" rel="noopener noreferrer">
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
