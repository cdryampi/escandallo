import { Link } from '@tanstack/react-router'

export const PublicFooter = () => (
  <footer className="border-t border-border bg-brand-strong text-brand-foreground">
    <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="type-body-md font-medium text-brand-foreground">Escandallo Restaurante</p>
        <p className="type-body-sm text-brand-muted">Landing pública desacoplada del backoffice interno.</p>
      </div>
      <div className="flex flex-wrap items-center gap-4 type-body-md">
        <Link to="/legal">Legal</Link>
        <Link to="/privacidad">Privacidad</Link>
        <Link to="/contacto">Contacto</Link>
      </div>
    </div>
  </footer>
)
