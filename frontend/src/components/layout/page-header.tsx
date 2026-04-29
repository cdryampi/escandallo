import type { PropsWithChildren } from 'react'

interface PageHeaderProps extends PropsWithChildren {
  title: string
  description?: string
}

export const PageHeader = ({ title, description, children }: PageHeaderProps) => (
  <div className="flex flex-col gap-4 border-b border-border pb-5 md:flex-row md:items-end md:justify-between">
    <div className="space-y-2">
      <h1 className="type-display-md text-foreground">{title}</h1>
      {description ? <p className="type-body-md max-w-3xl text-muted-foreground">{description}</p> : null}
    </div>
    {children ? <div className="flex flex-wrap items-center gap-3">{children}</div> : null}
  </div>
)
