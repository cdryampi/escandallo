import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ErrorStateProps {
  title?: string
  description?: string
  actionLabel?: string
  onRetry?: () => void
}

export const ErrorState = ({
  title = 'No se ha podido cargar la información',
  description = 'Ha ocurrido un error al intentar recuperar los datos. Por favor, verifica tu conexión o vuelve a intentarlo en unos instantes.',
  actionLabel = 'Reintentar operación',
  onRetry,
}: ErrorStateProps) => (
  <div className="flex min-h-[320px] flex-col items-center justify-center gap-4 rounded-[var(--ds-radius-lg)] border border-danger/20 bg-danger-soft/10 p-8 text-center">
    <div className="rounded-full bg-danger-soft p-3">
      <AlertTriangle className="size-6 text-danger" />
    </div>
    <div className="max-w-md space-y-2">
      <h3 className="type-headline-sm text-foreground font-semibold">{title}</h3>
      <p className="type-body-md text-muted-foreground">{description}</p>
    </div>
    {onRetry ? (
      <Button variant="outline" onClick={onRetry} className="mt-2 border-danger/20 hover:bg-danger-soft/50 hover:text-danger">
        {actionLabel}
      </Button>
    ) : null}
  </div>
)
