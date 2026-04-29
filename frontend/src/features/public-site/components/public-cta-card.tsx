import { Link } from '@tanstack/react-router'

export const PublicCtaCard = () => (
  <div className="rounded-[var(--ds-radius-xl)] border border-border bg-surface-raised p-8 shadow-overlay">
    <p className="ui-kicker">Backoffice serio</p>
    <h2 className="mt-3 type-display-md text-foreground">Costes claros, recetas auditables, contenidos separados.</h2>
    <p className="mt-3 max-w-2xl type-body-lg text-muted-foreground">
      Landing pública desacoplada del backoffice y preparada para consumir CMS cuando el backend lo exponga.
    </p>
    <div className="mt-6 flex flex-wrap gap-3">
      <Link
        to="/login"
        className="rounded-full bg-brand px-5 py-3 type-body-md font-medium text-brand-foreground transition-colors hover:bg-brand-strong"
      >
        Entrar al backoffice
      </Link>
      <Link
        to="/contacto"
        className="rounded-full border border-border px-5 py-3 type-body-md font-medium text-foreground transition-colors hover:bg-surface-muted"
      >
        Contactar
      </Link>
    </div>
  </div>
)
