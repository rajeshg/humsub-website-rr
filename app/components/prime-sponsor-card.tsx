type PrimeSponsorCardProps = {
  name: string
  href?: string
  description?: string
  imagePaths?: string[]
  // Set when the logo already contains the name (avoids showing it twice)
  hideName?: boolean
}

export default function PrimeSponsorCard({ name, href, description, imagePaths, hideName }: PrimeSponsorCardProps) {
  const images: string[] = imagePaths && imagePaths.length > 0 ? imagePaths : []

  return (
    <div className="md:w-full md:w-[2/3] bg-base-100 shadow-sm flex flex-col justify-center place-items-center">
      <figure className="mb-2 p-4 flex flex-col md:flex-row flex-wrap justify-center items-center gap-4 bg-white rounded-lg">
        {images.map((img) =>
          href ? (
            <a key={img} href={href} target="_blank" rel="noreferrer" className="flex justify-center items-center">
              <img src={img} alt={name} width={400} className="mx-auto max-h-48" />
            </a>
          ) : (
            <img key={img} src={img} alt={name} width={400} className="mx-auto max-h-48" />
          )
        )}
      </figure>
      <div className="mt-0">
        {!hideName && (
          <h2 className="text-xl text-center justify-center mt-0 mb-2">
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl text-center justify-center mt-0 mb-2"
              >
                {name}
              </a>
            ) : (
              <span className="text-xl text-center justify-center mt-0 mb-2">{name}</span>
            )}
          </h2>
        )}
        <p className="text-center italic px-2">{description}</p>
      </div>
    </div>
  )
}
