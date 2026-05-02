import { Link } from '@tanstack/react-router'
import { appConfig } from '@/app/config'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { motion } from 'motion/react'
import { useCmsMenu } from '@/api/cms'

export const PublicHeader = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { data: cmsMenu } = useCmsMenu()

  const links = cmsMenu?.map(item => ({ to: item.slug, label: item.label })) ?? []

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="type-display-sm font-black tracking-tighter text-brand">
            {appConfig.appName.toUpperCase()}
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="type-label-md text-foreground transition-colors hover:text-brand"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/backoffice"
            className="rounded-lg bg-brand px-6 py-2.5 type-label-md text-white transition-all hover:bg-brand-strong shadow-sm"
          >
            Acceso Personal
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-foreground p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isOpen}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden border-t border-border bg-background px-6 py-8 space-y-6"
        >
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className="block type-display-md text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/backoffice"
            onClick={() => setIsOpen(false)}
            className="block w-full rounded-lg bg-brand py-4 text-center type-label-md text-white"
          >
            Acceso Personal
          </Link>
        </motion.div>
      )}
    </header>
  )
}
