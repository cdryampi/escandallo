import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { resolveMediaUrl } from '@/lib/resolve-media-url'
import type { ReservationCtaBlockData } from '@/types/cms'

interface Props {
  data: ReservationCtaBlockData
}

const isExternalHref = (value: string) =>
  value.startsWith('http://') || value.startsWith('https://') || value.startsWith('mailto:') || value.startsWith('tel:')

export const ReservationCtaBlock = ({ data }: Props) => {
  const backgroundUrl = resolveMediaUrl(data.background_image_url)
  const primaryCtaUrl = data.primary_cta_url ?? '#'

  return (
    <section className="public-section bg-surface">
      <div className="public-container relative">
        <div className="public-surface-card relative overflow-hidden rounded-[1.8rem] p-8 md:p-12 lg:p-16">
          {backgroundUrl ? (
            <div
              className="absolute inset-0 bg-cover bg-center opacity-[0.14]"
              style={{ backgroundImage: `url(${backgroundUrl})` }}
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-r from-[rgba(253,252,251,0.9)] via-[rgba(253,252,251,0.82)] to-[rgba(253,252,251,0.72)]" />

          <div className="relative max-w-4xl space-y-8">
            <p className="ui-kicker">{data.eyebrow}</p>
            <h2 className="max-w-3xl font-heading text-[clamp(2.8rem,5vw,5.2rem)] leading-[0.96] tracking-[-0.045em] text-brand-strong dark:text-foreground">
              {data.title}
            </h2>
            <div className="public-divider" />
            <p className="max-w-2xl type-body-lg text-muted-foreground">{data.body}</p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              {renderAction(data.primary_cta_text, primaryCtaUrl, true)}
              {data.secondary_cta_text && data.secondary_cta_url ? renderAction(data.secondary_cta_text, data.secondary_cta_url) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const renderAction = (label: string, href: string, primary = false) => {
  const className = primary
    ? 'public-solid-button px-8'
    : 'public-outline-button px-8'

  const content = (
    <>
      <span>{label}</span>
      <ArrowRight className="size-4" />
    </>
  )

  if (isExternalHref(href)) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {content}
      </a>
    )
  }

  return (
    <Link to={href} className={className}>
      {content}
    </Link>
  )
}
