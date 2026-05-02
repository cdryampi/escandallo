import { LoaderCircle } from 'lucide-react'

interface LoadingStateProps {
  title?: string
  description?: string
}

export const LoadingState = ({
  title = 'Cargando datos operativos',
  description = 'Estamos recuperando la información del catálogo central. Un momento, por favor.',
}: LoadingStateProps) => (
  <div className="flex min-h-[320px] flex-col items-center justify-center gap-6 rounded border border-border bg-surface px-8 py-16 text-center shadow-sm">
    <div className="relative flex items-center justify-center">
      <div className="size-16 rounded-full border-2 border-brand/5 border-t-brand animate-spin" />
      <div className="absolute size-10 rounded-full bg-brand/5 flex items-center justify-center">
        <LoaderCircle className="size-6 text-brand/40 animate-pulse" />
      </div>
    </div>
    <div className="max-w-md space-y-3">
      <h3 className="type-headline-sm text-foreground font-bold tracking-tight">{title}</h3>
      <p className="type-body-md text-muted-foreground leading-relaxed">{description}</p>
    </div>
  </div>
)
