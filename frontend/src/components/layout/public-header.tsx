import { Link } from '@tanstack/react-router'
import { appConfig } from '@/app/config'

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/carta', label: 'Carta' },
  { to: '/contacto', label: 'Contacto' },
  { to: '/login', label: 'Backoffice' },
]

export const PublicHeader = () => (
  <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
      <div>
        <p className="ui-kicker">Restaurante</p>
        <p className="type-headline-sm text-foreground">{appConfig.appName}</p>
      </div>
      <nav className="flex items-center gap-4 type-body-md text-foreground">
        {links.map((link) => (
          <Link key={link.to} to={link.to} className="transition-colors hover:text-brand">
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  </header>
)
