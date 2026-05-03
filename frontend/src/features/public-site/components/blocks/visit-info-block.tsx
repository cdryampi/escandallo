import { Link } from '@tanstack/react-router'
import { ArrowRight, Clock3, Mail, MapPinned, Phone } from 'lucide-react'
import type { VisitInfoBlockData } from '@/types/cms'

interface Props {
  data: VisitInfoBlockData
}

const isExternalHref = (value: string) =>
  value.startsWith('http://') || value.startsWith('https://') || value.startsWith('mailto:') || value.startsWith('tel:')

export const VisitInfoBlock = ({ data }: Props) => {
  if (!data.title) {
    return null
  }

  const mapUrl = data.map_url ?? '#'
  const primaryCtaUrl = data.primary_cta_url ?? '#'

  return (
    <section className="public-section bg-background">
      <div className="public-container grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="public-surface-card relative overflow-hidden p-8 md:p-10">
          <div className="relative">
            <p className="ui-kicker">Logistica y contacto</p>
            <h2 className="mt-6 type-display-md text-brand-strong dark:text-foreground">{data.title}</h2>
            <div className="public-divider" />
            <p className="public-intro type-body-lg">{data.intro}</p>

            <div className="mt-12 space-y-4">
              <InfoStrip icon={MapPinned} label="Direccion" value={data.address} />
              <InfoStrip icon={Phone} label="Telefono" value={data.phone} />
              <InfoStrip icon={Mail} label="Email" value={data.email} />
            </div>
          </div>
        </div>

        <div className="public-surface-card relative overflow-hidden p-8 md:p-10">
          <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-brand/[0.04] blur-3xl" />
          <div className="relative">
            <div className="flex items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-full border border-brand/10 bg-brand/[0.05] text-brand">
                <Clock3 className="size-5" />
              </div>
              <div>
                <p className="type-label-md text-[10px] tracking-[0.16em] text-brand/42">Servicio</p>
                <h3 className="mt-2 font-heading text-[2rem] tracking-[-0.03em] text-brand-strong dark:text-foreground">Horarios de Casa</h3>
              </div>
            </div>

            <div className="mt-10 divide-y divide-border/70">
              {data.hours.map((hour, index) => (
                <div key={`${hour.label}-${index}`} className="flex items-center justify-between gap-4 py-4">
                  <span className="text-sm font-semibold tracking-tight text-brand-strong dark:text-foreground">{hour.label}</span>
                  <span className="font-sans text-sm text-muted-foreground">{hour.value}</span>
                </div>
              ))}
            </div>

            <div className="mt-12 flex flex-wrap gap-4">
              <a href={mapUrl} target="_blank" rel="noreferrer" className="public-outline-button">
                Ver en Google Maps
              </a>
              {isExternalHref(primaryCtaUrl) ? (
                <a href={primaryCtaUrl} target="_blank" rel="noreferrer" className="public-solid-button">
                  {data.primary_cta_text}
                </a>
              ) : (
                <Link to={primaryCtaUrl} className="public-solid-button">
                  {data.primary_cta_text}
                </Link>
              )}
              <span className="public-ghost-link text-brand/62">
                <span>Lectura clara del servicio</span>
                <ArrowRight className="size-4" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

interface InfoStripProps {
  icon: typeof MapPinned
  label: string
  value: string
}

const InfoStrip = ({ icon: Icon, label, value }: InfoStripProps) => (
  <div className="flex items-start gap-4 rounded-[1.1rem] border border-border/70 bg-background px-5 py-5">
    <div className="flex size-11 shrink-0 items-center justify-center rounded-full border border-brand/10 bg-brand/[0.05] text-brand">
      <Icon className="size-5" />
    </div>
    <div>
      <p className="type-label-md text-[10px] tracking-[0.14em] text-brand/38">{label}</p>
      <p className="mt-2 text-sm font-semibold text-brand-strong dark:text-foreground">{value}</p>
    </div>
  </div>
)
