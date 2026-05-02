import type { FeatureListBlockData } from '@/types/cms'
import {
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

  return (
    <section className="relative overflow-hidden bg-brand-strong py-24 text-white">
      <div className="absolute top-0 right-0 -mt-32 -mr-32 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute bottom-0 left-0 -mb-32 -ml-32 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative z-10 container mx-auto max-w-7xl px-4">
        {data.title ? (
          <div className="mb-20 text-center">
            <h2 className="text-3xl font-bold font-display md:text-4xl">{data.title}</h2>
            <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-brand-muted" />
          </div>
        ) : null}

        <div className="grid gap-12 md:grid-cols-3">
          {data.features.map((feature, index) => {
            const Icon = FEATURE_ICONS[feature.icon || 'Star'] || Star

            return (
              <div
                key={`${feature.title}-${index}`}
                className="group flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-2"
              >
                <div className="mb-6 rounded-2xl bg-white/10 p-5 shadow-inner ring-1 ring-white/20 transition-colors group-hover:bg-white/20">
                  <Icon className="h-10 w-10 text-brand-muted" />
                </div>
                <h3 className="mb-4 text-2xl font-bold font-display">{feature.title}</h3>
                <p className="max-w-xs leading-relaxed text-brand-muted/80 font-body">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
