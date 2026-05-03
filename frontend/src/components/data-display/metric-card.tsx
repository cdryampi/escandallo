import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/cn'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

type MetricTone = 'default' | 'success' | 'warning'

interface MetricCardProps {
  title: string
  value: string
  description: string
  icon: LucideIcon
  tone?: MetricTone
}

const signalToneClass: Record<MetricTone, string> = {
  default: 'bg-brand',
  success: 'bg-success',
  warning: 'bg-accent',
}

const iconToneClass: Record<MetricTone, string> = {
  default: 'bg-brand/10 text-brand-strong',
  success: 'bg-success-soft text-success-foreground',
  warning: 'bg-accent-soft/30 text-accent-foreground',
}

export const MetricCard = ({ title, value, description, icon: Icon, tone = 'default' }: MetricCardProps) => (
  <Card className="relative overflow-hidden group transition-all duration-300 hover:border-brand/20 shadow-soft">
    {/* Refined Signal Indicator - Thinner and more subtle */}
    <div className={cn('absolute left-0 top-0 bottom-0 w-0.5', signalToneClass[tone])} />
    
    <CardHeader className="flex-row items-start justify-between gap-4 space-y-0 pb-2 border-none bg-transparent">
      <div>
        <CardDescription className="type-label-md text-brand-strong/60 font-semibold uppercase tracking-wider">{title}</CardDescription>
        <CardTitle className="mt-1.5 text-foreground type-display-md type-tabular tabular-nums leading-none tracking-tight">{value}</CardTitle>
      </div>
      <div className={cn('rounded-sm p-2 transition-transform group-hover:scale-105', iconToneClass[tone])}>
        <Icon className="size-4.5 stroke-[var(--ds-icon-stroke)]" />
      </div>
    </CardHeader>
    <CardContent className="pt-0">
      <p className="type-body-sm text-muted-foreground/80 leading-relaxed">{description}</p>
    </CardContent>
  </Card>
)
