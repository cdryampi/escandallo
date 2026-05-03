import { Outlet } from '@tanstack/react-router'
import { useLandingData } from '@/api/cms'
import { PublicHeader } from '@/components/layout/public-header'
import { PublicFooter } from '@/components/layout/public-footer'
import { usePublicThemeMode } from '@/features/public-site/hooks/use-public-theme-mode'
import { buildPublicThemeVars } from '@/features/public-site/lib/public-theme'

export const PublicLayout = () => {
  const { data } = useLandingData()
  const { mode, toggleMode } = usePublicThemeMode()

  return (
    <div
      className={`${mode === 'dark' ? 'dark' : ''} flex min-h-screen flex-col bg-background selection:bg-brand/10 selection:text-brand-strong transition-colors duration-300`}
      style={buildPublicThemeVars(data?.branding?.palette)}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-brand focus:px-4 focus:py-2 focus:text-white focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
      >
        Saltar al contenido
      </a>

      <PublicHeader branding={data?.branding} mode={mode} onToggleTheme={toggleMode} />
      <main role="main" id="main-content" className="flex-grow">
        <Outlet />
      </main>
      <PublicFooter branding={data?.branding} footer={data?.footer} />
    </div>
  )
}
