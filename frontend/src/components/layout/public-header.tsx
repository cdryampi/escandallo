import { Link } from '@tanstack/react-router'
import { Menu, Moon, SunMedium, X } from 'lucide-react'
import { motion } from 'motion/react'
import { useState } from 'react'
import { useCmsMenu } from '@/api/cms'
import { appConfig } from '@/app/config'
import type { PublicThemeMode } from '@/features/public-site/hooks/use-public-theme-mode'
import type { BrandingConfig } from '@/features/public-site/types/landing.types'

interface Props {
  branding?: BrandingConfig
  mode: PublicThemeMode
  onToggleTheme: () => void
}

export const PublicHeader = ({ branding, mode, onToggleTheme }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const { data: cmsMenu } = useCmsMenu()

  const links = cmsMenu?.map((item) => ({ to: item.slug, label: item.label })) ?? []
  const brandName = branding?.name?.trim() || appConfig.appName
  const brandTagline = branding?.tagline?.trim() || 'Calma operativa para cocina y sala'

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/88 text-foreground backdrop-blur-xl">
      <div className="relative border-b border-border/55">
        <div className="mx-auto flex max-w-[80rem] items-center justify-between gap-4 px-6 py-2 text-foreground/50">
          <p className="type-label-md text-[9px] font-semibold uppercase tracking-[0.16em]">{brandTagline}</p>
          <div className="hidden items-center gap-6 text-[9px] font-semibold uppercase tracking-[0.16em] md:flex">
            <span>Reserva</span>
            <span>Cocina</span>
            <span>Control</span>
          </div>
        </div>
      </div>

      <div className="relative mx-auto grid h-[5.5rem] max-w-[80rem] grid-cols-[1fr_auto] items-center gap-6 px-6 md:grid-cols-[1fr_auto_1fr]">
        <Link to="/" className="group flex min-w-0 items-center gap-4" onClick={() => setIsOpen(false)}>
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-[0.22em] text-foreground/36">Escandallo</p>
            <p className="truncate font-heading text-[1.55rem] font-normal tracking-[-0.03em] text-brand-strong dark:text-foreground">
              {brandName}
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 justify-self-center md:flex" aria-label="Navegacion principal">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="type-label-md relative py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground/52 transition-colors hover:text-brand-strong dark:hover:text-foreground"
            >
              {({ isActive }) => (
                <>
                  <span className={isActive ? 'text-brand-strong dark:text-foreground' : ''}>{link.label}</span>
                  {isActive ? <span className="absolute -bottom-2 left-1/2 h-px w-6 -translate-x-1/2 bg-brand/50" /> : null}
                </>
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center justify-self-end gap-3 md:flex">
          <button
            type="button"
            onClick={onToggleTheme}
            className="public-outline-button min-h-12 px-4"
            aria-label={mode === 'dark' ? 'Activar tema claro' : 'Activar tema oscuro'}
            title={mode === 'dark' ? 'Tema claro' : 'Tema oscuro'}
          >
            {mode === 'dark' ? <SunMedium className="size-4" /> : <Moon className="size-4" />}
            <span>{mode === 'dark' ? 'Claro' : 'Oscuro'}</span>
          </button>
          <Link to="/contacto" className="public-outline-button">
            Contacto
          </Link>
          <Link to="/backoffice" className="public-solid-button px-5">
            Acceso
          </Link>
        </div>

        <button
          className="justify-self-end rounded-full border border-border/70 bg-surface-elevated p-3 text-brand-strong shadow-soft dark:text-foreground md:hidden"
          onClick={() => setIsOpen((current) => !current)}
          aria-label={isOpen ? 'Cerrar menu' : 'Abrir menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {isOpen ? (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative border-t border-border/70 bg-background px-6 py-6 shadow-overlay md:hidden"
        >
          <div className="space-y-2">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between rounded-2xl border border-border/70 bg-surface-elevated px-4 py-4 text-sm font-medium text-brand-strong transition-colors hover:border-brand/25 hover:bg-surface dark:text-foreground"
              >
                <span>{link.label}</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-foreground/38">Ir</span>
              </Link>
            ))}
          </div>

          <div className="mt-8 grid gap-3">
            <button
              type="button"
              onClick={onToggleTheme}
              className="public-outline-button w-full"
              aria-label={mode === 'dark' ? 'Activar tema claro' : 'Activar tema oscuro'}
            >
              {mode === 'dark' ? <SunMedium className="size-4" /> : <Moon className="size-4" />}
              <span>{mode === 'dark' ? 'Tema claro' : 'Tema oscuro'}</span>
            </button>
            <Link to="/contacto" onClick={() => setIsOpen(false)} className="public-outline-button w-full">
              Reservas y contacto
            </Link>
            <Link to="/backoffice" onClick={() => setIsOpen(false)} className="public-solid-button w-full">
              Acceso personal
            </Link>
          </div>
        </motion.div>
      ) : null}
    </header>
  )
}
