import { Link, useRouterState } from '@tanstack/react-router'
import { ChevronRight, Home } from 'lucide-react'

const segmentTitle = (segment: string) =>
  segment
    .replace(/\$/g, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (character) => character.toUpperCase())

export const BackofficeBreadcrumbs = () => {
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const segments = pathname.split('/').filter(Boolean)

  return (
    <nav aria-label="Breadcrumbs" className="flex items-center space-x-2 py-2">
      <Link
        to="/backoffice"
        className="flex items-center text-muted-foreground/60 hover:text-brand transition-colors"
      >
        <Home className="size-4" />
        <span className="sr-only">Inicio</span>
      </Link>

      {segments.map((segment, index) => {
        const path = `/${segments.slice(0, index + 1).join('/')}`
        const isLast = index === segments.length - 1

        // Skip 'backoffice' segment as it is covered by the home icon or would be redundant
        if (segment.toLowerCase() === 'backoffice' && index === 0) return null

        return (
          <div key={`${segment}-${index}`} className="flex items-center gap-2">
            <ChevronRight className="size-3.5 text-muted-foreground/30" />
            {isLast ? (
              <span className="type-body-sm text-foreground font-semibold lowercase first-letter:uppercase tracking-tight">
                {segmentTitle(segment)}
              </span>
            ) : (
              <Link
                to={path as '/backoffice'}
                className="type-body-sm text-muted-foreground hover:text-brand transition-colors lowercase first-letter:uppercase tracking-tight"
              >
                {segmentTitle(segment)}
              </Link>
            )}
          </div>
        )
      })}
    </nav>
  )
}
