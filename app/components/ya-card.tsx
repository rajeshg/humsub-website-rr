interface Props {
    name: string;
    href?: string;
    description?: string;
    imagePath: string;
}

type ImageMetadata = {
    src: string;
    width: number;
    height: number;
    format: "jpeg" | "jpg" | "png" | "tiff" | "webp" | "gif" | "svg" | "avif";
    orientation?: number;
};

export default function YACard({ name, href, description, imagePath }: Props) {
    return (
        <div className="card card-sm bg-base-100 dark:bg-gray-800 shadow-sm">
            <figure className="mb-2 p-4">
                {
                    href ? (
                        <a href={href} target="_blank">
                            <img
                                src={imagePath}
                                alt={name}
                                className="h-auto min-w-48 max-w-64 max-h-96 rounded-lg object-contain"
                            />
                        </a>
                    ) : (
                        <img
                            src={imagePath}
                            alt={name}
                            className="h-auto min-w-48 max-w-64 max-h-96 rounded-lg object-contain"
                        />
                    )
                }
            </figure>
            <div className="card-body mt-0">
                <h2 className="text-xl text-center justify-center mt-0 mb-2">{name}</h2>
                <p className="text-center">{description}</p>
            </div>
        </div>
    );
}
