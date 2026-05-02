import { Database } from 'lucide-react'

interface EmptyStateProps {
  title: string
  description: string
  action?: React.ReactNode
}

export const EmptyState = ({ title, description, action }: EmptyStateProps) => (
  <div className="flex min-h-[320px] flex-col items-center justify-center gap-6 rounded border border-border bg-surface-muted/10 px-8 py-16 text-center shadow-sm">
    <div className="rounded-full bg-brand/5 p-5 border border-brand/10 text-brand/40">
      <Database className="size-10" />
    </div>
    <div className="max-w-md space-y-3">
      <h3 className="type-headline-sm text-foreground font-bold tracking-tight">{title}</h3>
      <p className="type-body-md text-muted-foreground leading-relaxed">{description}</p>
    </div>
    {action && <div className="mt-4">{action}</div>}
  </div>
)
