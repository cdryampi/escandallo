import { ArrowRight, ShieldCheck } from 'lucide-react'
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
    <section className="public-section min-h-[calc(100vh-6rem)] bg-background text-foreground">
      <div className="public-mesh" />

      <div className="public-container relative">
        <div className="grid gap-14 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:gap-12">
          <div className="relative z-10">
            <div className="public-chip mb-8 w-fit px-4">
              <span className="size-2 rounded-full bg-accent" />
              <span className="type-label-md text-[9px] text-foreground/60">Direccion serena</span>
            </div>

            {data.title ? (
              <h1 className="max-w-2xl font-heading text-[clamp(3.25rem,7vw,6.2rem)] font-normal leading-[0.94] tracking-[-0.045em] text-brand-strong dark:text-foreground">
                {data.title}
              </h1>
            ) : null}

            {data.subtitle ? (
              <p className="mt-7 max-w-xl text-base leading-8 text-muted-foreground md:text-lg">
                {data.subtitle}
              </p>
            ) : null}

            <div className="mt-10 flex flex-wrap items-center gap-4">
              {data.cta_text && data.cta_url ? (
                <a
                  href={data.cta_url}
                  target={isExternalHref(data.cta_url) ? '_blank' : undefined}
                  rel={isExternalHref(data.cta_url) ? 'noopener noreferrer' : undefined}
                  className="public-solid-button group min-h-14 px-8 text-[12px]"
                >
                  <span>{data.cta_text}</span>
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 [stroke-width:var(--ds-icon-stroke)]" />
                </a>
              ) : null}

              <div className="public-chip px-4 text-foreground/68">
                <ShieldCheck className="size-4 text-brand [stroke-width:var(--ds-icon-stroke)]" />
                <span className="type-label-md text-[10px] tracking-[0.14em]">Coste, merma y ritmo en una sola lectura</span>
              </div>
            </div>

            <div className="mt-14 grid gap-8 border-t border-border/70 pt-10 md:grid-cols-3">
              {[
                { label: 'Coste', value: 'Claro', desc: 'Cada cifra puesta al servicio del margen.' },
                { label: 'Servicio', value: 'Sereno', desc: 'Operacion ordenada sin perder sensibilidad.' },
                { label: 'Lectura', value: 'Limpia', desc: 'Menos ruido. Mejor criterio cada dia.' },
              ].map((stat) => (
                <div key={stat.label} className="space-y-3">
                  <p className="type-label-md text-[10px] tracking-[0.16em] text-brand/42">{stat.label}</p>
                  <p className="font-heading text-3xl tracking-[-0.03em] text-brand-strong dark:text-foreground">{stat.value}</p>
                  <div className="public-stat-rule" />
                  <p className="type-body-sm max-w-[15rem] text-muted-foreground">{stat.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="public-surface-card relative overflow-hidden p-3 md:p-4">
              <div className="absolute inset-x-6 top-6 z-10 flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-brand-strong/34 dark:text-white/40">
                <span>Vista principal</span>
                <span>Escandallo</span>
              </div>

              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={data.title || 'Presentacion principal'}
                  className="aspect-[4/5] w-full rounded-[1.1rem] object-cover object-center"
                />
              ) : (
                <div className="flex aspect-[4/5] w-full items-center justify-center rounded-[1.1rem] bg-surface">
                  <div className="type-label-md text-[10px] tracking-[0.28em] text-foreground/26">Imagen principal pendiente</div>
                </div>
              )}

              <div className="absolute inset-3 rounded-[1.1rem] bg-gradient-to-t from-[rgba(17,12,10,0.22)] via-transparent to-transparent" />

              <div className="absolute bottom-8 left-8 right-8">
                <div className="rounded-[1.35rem] border border-white/40 bg-[rgba(253,252,251,0.72)] p-5 shadow-soft backdrop-blur-md">
                  <p className="type-label-md text-[10px] text-brand/48">Firma</p>
                  <p className="mt-2 font-heading text-[1.7rem] leading-tight tracking-[-0.03em] text-brand-strong dark:text-foreground">
                    Operacion mas calma. Margen mas visible. Mejor mesa.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
