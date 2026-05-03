import { Link } from '@tanstack/react-router'
import { cn } from '@/lib/utils'

const items = [
  {
    label: 'General',
    to: '/backoffice/settings/general' as const,
  },
  {
    label: 'Estilos',
    to: '/backoffice/settings/styles' as const,
  },
]

export const SettingsSubnav = () => (
  <nav className="flex flex-wrap gap-2 rounded-2xl border border-border bg-white p-2 shadow-sm" aria-label="Submenu de ajustes">
    {items.map((item) => (
      <Link
        key={item.to}
        to={item.to}
        activeOptions={{ exact: true }}
        activeProps={{
          className: 'bg-brand text-brand-foreground shadow-sm',
        }}
        className={cn(
          'rounded-xl px-4 py-2 text-sm font-semibold transition-colors',
          'text-muted-foreground hover:bg-surface-container-low hover:text-foreground',
        )}
      >
        {item.label}
      </Link>
    ))}
  </nav>
)
