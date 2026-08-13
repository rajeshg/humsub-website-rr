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
    <Card className="flex flex-col items-center shadow-sm gap-0 py-2">
      <CardContent className="p-2 pb-1 flex justify-center items-center">
        <div className="flex items-center justify-center p-1 gap-2">
          {images.map((img) => (
            <React.Fragment key={`${img}-${name}`}>
              {href ? (
                <a href={href} target="_blank" rel="noopener noreferrer">
                  <img
                    src={img}
                    alt={name}
                    loading="lazy"
                    className="h-24 w-auto max-w-full object-contain rounded-lg bg-white p-1 shadow-sm"
                  />
                </a>
              ) : (
                <img
                  src={img}
                  alt={name}
                  loading="lazy"
                  className="h-24 w-auto max-w-full object-contain rounded-lg bg-white p-1 shadow-sm"
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </CardContent>
      <CardHeader className="p-3 pt-0 text-center w-full">
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
