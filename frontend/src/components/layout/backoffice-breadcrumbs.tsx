import { useRouterState } from '@tanstack/react-router'

const segmentTitle = (segment: string) =>
  segment
    .replace(/\$/g, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (character) => character.toUpperCase())

export const BackofficeBreadcrumbs = () => {
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const segments = pathname.split('/').filter(Boolean)

  return (
    <nav aria-label="Breadcrumbs" className="flex flex-wrap items-center gap-2 type-body-sm text-muted-foreground">
      <span>Inicio</span>
      {segments.map((segment, index) => (
        <div key={`${segment}-${index}`} className="flex items-center gap-2">
          <span>/</span>
          <span className="capitalize text-foreground">{segmentTitle(segment)}</span>
        </div>
      ))}
    </nav>
  )
}
