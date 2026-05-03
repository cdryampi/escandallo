import { Link } from '@tanstack/react-router'
import { appConfig } from '@/app/config'
import type { BrandingConfig, FooterConfig } from '@/features/public-site/types/landing.types'

interface Props {
  branding?: BrandingConfig
  footer?: FooterConfig
}

export const PublicFooter = ({ branding, footer }: Props) => {
  const brandName = branding?.name?.trim() || appConfig.appName
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden border-t border-border/70 bg-surface pt-20 pb-10 text-foreground">
      <div className="public-container relative space-y-16">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_0.7fr_0.7fr_1fr] lg:items-start">
          <div className="max-w-md space-y-6">
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-foreground/36">Escandallo</p>
              <h2 className="mt-3 font-heading text-4xl font-normal tracking-[-0.03em] text-brand-strong dark:text-foreground">
                {brandName}
              </h2>
            </div>
            <p className="type-body-lg max-w-sm text-muted-foreground">
              {branding?.tagline || 'Direccion culinaria serena, control claro y una presencia visual sin ruido.'}
            </p>
            <Link to="/contacto" className="public-solid-button w-fit px-6">
              Reservar
            </Link>
          </div>

          <div className="space-y-5">
            <h4 className="type-label-md text-[11px] tracking-[0.14em] text-foreground/42">Explorar</h4>
            <nav className="flex flex-col gap-4 text-sm text-muted-foreground">
              <Link to="/" className="transition-colors hover:text-brand-strong dark:hover:text-foreground">Inicio</Link>
              <Link to="/contacto" className="transition-colors hover:text-brand-strong dark:hover:text-foreground">Reservas</Link>
              <Link to="/backoffice" className="transition-colors hover:text-brand-strong dark:hover:text-foreground">Acceso personal</Link>
            </nav>
          </div>

          <div className="space-y-5">
            <h4 className="type-label-md text-[11px] tracking-[0.14em] text-foreground/42">Marco</h4>
            <nav className="flex flex-col gap-4 text-sm text-muted-foreground">
              <Link to="/legal" className="transition-colors hover:text-brand-strong dark:hover:text-foreground">Aviso Legal</Link>
              <Link to="/privacidad" className="transition-colors hover:text-brand-strong dark:hover:text-foreground">Privacidad</Link>
              <Link to="/cookies" className="transition-colors hover:text-brand-strong dark:hover:text-foreground">Cookies</Link>
            </nav>
          </div>

          <div className="public-surface-card p-7">
            <p className="type-label-md text-[11px] tracking-[0.14em] text-foreground/42">Ubicacion y contacto</p>
            <div className="mt-6 space-y-4 text-sm text-muted-foreground">
              <p>{footer?.address || 'Calle Arenal, 14 - Madrid'}</p>
              <p>{footer?.phone || '+34 915 200 480'}</p>
              <p>{footer?.email || 'reservas@restaurante.test'}</p>
            </div>
            <div className="mt-8 public-stat-rule" />
            <p className="mt-5 text-[11px] uppercase tracking-[0.18em] text-foreground/34">
              Servicio con calma
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-5 border-t border-border/70 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-[11px] uppercase tracking-[0.16em] text-foreground/42">
            &copy; {currentYear} {brandName}. Precision tranquila.
          </p>
          <div className="flex items-center gap-6 text-[10px] uppercase tracking-[0.18em] text-foreground/28">
            <span>Hecho con rigor</span>
            <span>Paleta viva</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
