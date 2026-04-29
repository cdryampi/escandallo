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
  warning: 'bg-warning',
}

const iconToneClass: Record<MetricTone, string> = {
  default: 'bg-brand-muted text-brand',
  success: 'bg-success-soft text-success-foreground',
  warning: 'bg-warning-soft text-warning-foreground',
}

export const MetricCard = ({ title, value, description, icon: Icon, tone = 'default' }: MetricCardProps) => (
  <Card className="overflow-hidden">
    <div className="grid grid-cols-[4px_1fr]">
      <div className={cn(signalToneClass[tone])} />
      <div>
        <CardHeader className="flex-row items-start justify-between gap-4 space-y-0">
          <div>
            <CardDescription className="type-label-md text-muted-foreground">{title}</CardDescription>
            <CardTitle className="mt-2 text-foreground type-display-md type-tabular">{value}</CardTitle>
          </div>
          <div className={cn('rounded-[var(--ds-radius-lg)] p-3', iconToneClass[tone])}>
            <Icon className="size-5" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="type-body-sm text-muted-foreground">{description}</p>
        </CardContent>
      </div>
    </div>
  </Card>
)
