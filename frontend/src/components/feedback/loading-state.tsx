import { LoaderCircle } from 'lucide-react'

interface LoadingStateProps {
  title?: string
  description?: string
}

export const LoadingState = ({
  title = 'Cargando contenido',
  description = 'Esperando respuesta del servidor.',
}: LoadingStateProps) => (
  <div className="flex min-h-72 flex-col items-center justify-center gap-3 rounded-[var(--ds-radius-lg)] border border-dashed border-border bg-surface-raised p-8 text-center">
    <LoaderCircle className="size-8 animate-spin text-brand" />
    <div className="space-y-1">
      <p className="type-headline-sm text-foreground">{title}</p>
      <p className="type-body-sm text-muted-foreground">{description}</p>
    </div>
  </div>
)
