import { resolveMediaUrl } from '@/lib/resolve-media-url'
import type { GalleryBlockData } from '@/types/cms'

interface Props {
  data: GalleryBlockData
}

export const GalleryBlock = ({ data }: Props) => {
  if (!data.title && data.images.length === 0) {
    return null
  }

  const [leadImage, ...secondaryImages] = data.images

  return (
    <section className="public-section bg-background">
      <div className="public-container relative">
        <div className="grid gap-10 xl:grid-cols-[0.42fr_0.58fr] xl:items-start">
          <div className="xl:sticky xl:top-28">
            <p className="ui-kicker">Ambiente y escena</p>
            {data.title ? <h2 className="mt-6 type-display-md text-brand-strong dark:text-foreground">{data.title}</h2> : null}
            <div className="public-divider" />
            <p className="public-intro type-body-lg">
              {data.intro}
            </p>
          </div>

          <div className="space-y-6">
            {leadImage ? (
              <GalleryFigure
                imageUrl={resolveMediaUrl(leadImage.image_url)}
                alt={leadImage.alt}
                caption={leadImage.caption}
                aspectClass="aspect-[4/3]"
                large
              />
            ) : null}

            {secondaryImages.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2">
                {secondaryImages.map((image, index) => (
                  <GalleryFigure
                    key={`${image.alt}-${index}`}
                    imageUrl={resolveMediaUrl(image.image_url)}
                    alt={image.alt}
                    caption={image.caption}
                    aspectClass={index % 3 === 0 ? 'aspect-[4/5]' : 'aspect-[1/1]'}
                  />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

interface GalleryFigureProps {
  imageUrl: string | null
  alt: string
  caption: string
  aspectClass: string
  large?: boolean
}

const GalleryFigure = ({ imageUrl, alt, caption, aspectClass, large = false }: GalleryFigureProps) => (
  <figure className="group public-surface-card relative overflow-hidden p-3">
    <div className={`overflow-hidden rounded-[1rem] bg-surface ${aspectClass}`}>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={alt}
          className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
      ) : (
        <div className="flex h-full items-center justify-center type-label-md text-[10px] tracking-[0.24em] text-foreground/24">
          Captura editorial pendiente
        </div>
      )}
    </div>

    <div className="absolute inset-3 rounded-[1rem] bg-gradient-to-t from-[rgba(17,12,10,0.18)] via-transparent to-transparent opacity-85 transition-opacity duration-500 group-hover:opacity-100" />
    <figcaption className="absolute bottom-8 left-8 right-8">
      <p className={`${large ? 'text-[2rem]' : 'text-[1.4rem]'} font-heading leading-tight tracking-[-0.03em] text-white`}>
        {caption}
      </p>
      <p className="mt-2 type-label-md text-[9px] tracking-[0.18em] text-white/68">{alt}</p>
    </figcaption>
  </figure>
)
