import {
  ArrowRight,
  Clock,
  Coffee,
  Heart,
  MapPin,
  Shield,
  Star,
  Utensils,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import type { FeatureListBlockData } from '@/types/cms'

interface Props {
  data: FeatureListBlockData
}

const FEATURE_ICONS: Record<string, LucideIcon> = {
  Utensils,
  Clock,
  MapPin,
  Star,
  Shield,
  Zap,
  Heart,
  Coffee,
}

export const FeatureListBlock = ({ data }: Props) => {
  if (!data.title && data.features.length === 0) {
    return null
  }

  const [leadFeature, ...otherFeatures] = data.features
  const LeadIcon = FEATURE_ICONS[leadFeature?.icon || 'Star'] || Star

  return (
    <section className="public-section bg-surface">
      <div className="public-container relative space-y-14">
        <div className="public-heading">
          <p className="ui-kicker">Metodo y capacidades</p>
          {data.title ? <h2 className="mt-6 type-display-md text-brand-strong dark:text-foreground">{data.title}</h2> : null}
          <div className="public-divider" />
          <p className="public-intro type-body-lg">
            Capacidades presentadas con aire y orden. Menos gesto de sistema. Mas claridad de metodo.
          </p>
        </div>

        {leadFeature ? (
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <article className="public-surface-card relative overflow-hidden p-8 md:p-10">
              <div className="flex size-16 items-center justify-center rounded-full border border-brand/10 bg-brand/[0.05] text-brand">
                <LeadIcon className="size-7" />
              </div>
              <p className="mt-10 type-label-md text-[10px] text-brand/44">Pieza central</p>
              <h3 className="mt-4 max-w-lg font-heading text-5xl leading-[0.98] tracking-[-0.04em] text-brand-strong dark:text-foreground">
                {leadFeature.title}
              </h3>
              <p className="mt-6 max-w-xl type-body-lg text-muted-foreground">{leadFeature.description}</p>
              <div className="mt-10 flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-brand/52">
                <span>Lectura principal</span>
                <ArrowRight className="size-4" />
              </div>
            </article>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
              {otherFeatures.map((feature, index) => {
                const Icon = FEATURE_ICONS[feature.icon || 'Star'] || Star
                return (
                  <article
                    key={`${feature.title}-${index}`}
                    className="public-surface-card group flex gap-5 p-6 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-full border border-brand/10 bg-brand/[0.05] text-brand">
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <p className="type-label-md text-[10px] text-brand/36">Pieza {(index + 2).toString().padStart(2, '0')}</p>
                      <h3 className="mt-3 type-headline-sm text-brand-strong dark:text-foreground">{feature.title}</h3>
                      <p className="mt-3 type-body-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}
