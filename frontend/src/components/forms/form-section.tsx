import type { PropsWithChildren } from 'react'

interface FormSectionProps extends PropsWithChildren {
  title: string
  description?: string
}

export const FormSection = ({ title, description, children }: FormSectionProps) => (
  <section className="space-y-4 rounded-[var(--ds-radius-lg)] border border-border bg-surface-raised p-5">
    <div className="space-y-1">
      <h2 className="type-headline-sm text-foreground">{title}</h2>
      {description ? <p className="type-body-sm text-muted-foreground">{description}</p> : null}
    </div>
    {children}
  </section>
)
