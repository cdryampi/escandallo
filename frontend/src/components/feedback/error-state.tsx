import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ErrorStateProps {
  title?: string
  description?: string
  actionLabel?: string
  onRetry?: () => void
}

export const ErrorState = ({
  title = 'No se pudo cargar el contenido',
  description = 'Revisa tu sesión o la disponibilidad del backend.',
  actionLabel = 'Reintentar',
  onRetry,
}: ErrorStateProps) => (
  <div className="flex min-h-72 flex-col items-center justify-center gap-4 rounded-[var(--ds-radius-lg)] border border-dashed border-danger/30 bg-danger-soft/60 p-8 text-center">
    <AlertTriangle className="size-8 text-danger" />
    <div className="space-y-1">
      <p className="type-headline-sm text-foreground">{title}</p>
      <p className="type-body-sm text-muted-foreground">{description}</p>
    </div>
    {onRetry ? (
      <Button variant="outline" onClick={onRetry}>
        {actionLabel}
      </Button>
    ) : null}
  </div>
)
