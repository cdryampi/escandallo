import { SearchX } from 'lucide-react'

interface EmptyStateProps {
  title: string
  description: string
}

export const EmptyState = ({ title, description }: EmptyStateProps) => (
  <div className="flex min-h-72 flex-col items-center justify-center gap-3 rounded-[var(--ds-radius-lg)] border border-dashed border-border bg-surface-raised p-8 text-center">
    <SearchX className="size-8 text-muted-foreground" />
    <div className="space-y-1">
      <p className="type-headline-sm text-foreground">{title}</p>
      <p className="type-body-sm text-muted-foreground">{description}</p>
    </div>
  </div>
)
