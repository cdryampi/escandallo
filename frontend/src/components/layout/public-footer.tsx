import { Link } from '@tanstack/react-router'
import { appConfig } from '@/app/config'

export const PublicFooter = () => (
  <footer className="border-t border-border bg-brand-strong text-white">
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        {/* Marca */}
        <div className="space-y-4">
          <Link to="/" className="flex flex-col" aria-label="Ir al inicio">
            <span className="ui-kicker text-brand-muted text-[10px] leading-tight tracking-widest">
              Restaurante
            </span>
            <span className="type-headline-sm tracking-tight text-white">{appConfig.appName}</span>
          </Link>
          <p className="type-body-sm text-brand-muted max-w-xs leading-relaxed">
            Cocina de temporada y producto cuidado en el centro de Madrid.
            Una mesa que merece la pena reservar.
          </p>
        </div>

        {/* Navegación */}
        <div className="space-y-4">
          <h4 className="type-label-md text-white">La carta y el local</h4>
          <nav className="flex flex-col gap-2 type-body-sm text-brand-muted" aria-label="Navegación secundaria">
            <Link to="/" className="hover:text-white transition-colors">Inicio</Link>
            <Link to="/carta" className="hover:text-white transition-colors">La Carta</Link>
            <Link to="/contacto" className="hover:text-white transition-colors">Reservas</Link>
          </nav>
        </div>

        {/* Contacto */}
        <div className="space-y-4">
          <h4 className="type-label-md text-white">Contacto</h4>
          <div className="flex flex-col gap-2 type-body-sm text-brand-muted">
            <a href="tel:+34915200480" className="hover:text-white transition-colors">
              +34 915 200 480
            </a>
            <a href="mailto:reservas@restaurante.test" className="hover:text-white transition-colors">
              reservas@restaurante.test
            </a>
          </div>
        </div>

        {/* Ubicación y horario */}
        <div className="space-y-4">
          <h4 className="type-label-md text-white">Dónde estamos</h4>
          <div className="type-body-sm text-brand-muted space-y-2">
            <p>
              Calle Arenal, 14<br />
              28013 Madrid
            </p>
            <p className="text-brand-muted/70 text-[12px]">
              Mar–Sáb: 13:30–16:00 / 20:30–23:30<br />
              Dom: 13:30–16:30 · Lun: cerrado
            </p>
          </div>
        </div>
      </div>

      {/* Barra inferior */}
      <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="type-body-sm text-brand-muted/60">
          © {new Date().getFullYear()} {appConfig.appName}. Todos los derechos reservados.
        </p>
        <nav className="flex items-center gap-6 type-body-sm text-brand-muted/50" aria-label="Navegación legal">
          <Link to="/legal" className="hover:text-brand-muted transition-colors">Aviso Legal</Link>
          <Link to="/privacidad" className="hover:text-brand-muted transition-colors">Privacidad</Link>
          <Link
            to="/login"
            className="hover:text-brand-muted/80 transition-colors"
            aria-label="Acceso al área de gestión interna"
          >
            Acceso staff
          </Link>
        </nav>
      </div>
    </div>
  </footer>
)
