import { resolveMediaUrl } from '@/lib/resolve-media-url'
import type { HeroBlockData } from '@/types/cms'

interface Props {
  data: HeroBlockData
}

const isExternalHref = (value: string) =>
  value.startsWith('http://') || value.startsWith('https://') || value.startsWith('mailto:') || value.startsWith('tel:')

export const HeroBlock = ({ data }: Props) => {
  const imageUrl = resolveMediaUrl(data.image_url)
  const hasContent = data.title.trim().length > 0 || (data.subtitle?.trim().length ?? 0) > 0 || imageUrl !== null

  if (!hasContent) {
    return null
  }

  return (
    <section className="relative overflow-hidden bg-surface-container-lowest py-24">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex flex-wrap items-center">
          <div className="mb-16 w-full lg:mb-0 lg:w-1/2">
            <div className="max-w-xl">
              <span className="mb-4 inline-block text-sm font-bold uppercase tracking-widest text-accent font-display">
                Excelencia culinaria
              </span>
              {data.title ? (
                <h1 className="mb-8 text-5xl font-bold leading-tight text-on-surface font-display lg:text-6xl">
                  {data.title}
                </h1>
              ) : null}
              {data.subtitle ? (
                <p className="mb-10 text-lg leading-relaxed text-on-surface-variant font-body">{data.subtitle}</p>
              ) : null}
              {data.cta_text && data.cta_url ? (
                <div className="flex flex-wrap gap-4">
                  <a
                    href={data.cta_url}
                    target={isExternalHref(data.cta_url) ? '_blank' : undefined}
                    rel={isExternalHref(data.cta_url) ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-4 font-bold text-white shadow-md transition-all duration-200 hover:bg-primary-container hover:shadow-lg active:scale-[0.98]"
                  >
                    {data.cta_text}
                  </a>
                </div>
              ) : null}
            </div>
          </div>
          {imageUrl ? (
            <div className="w-full lg:w-1/2">
              <div className="relative">
                <div className="absolute -inset-4 -rotate-2 rounded-3xl bg-primary/5" />
                <img
                  src={imageUrl}
                  alt={data.title || 'Imagen editorial'}
                  className="relative h-[500px] w-full rounded-2xl border border-border/50 object-cover shadow-xl"
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
