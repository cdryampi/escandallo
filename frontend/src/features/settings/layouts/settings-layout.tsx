import { Outlet } from '@tanstack/react-router'
import { BackofficePageHeader } from '@/components/layout/backoffice-page-header'
import { SettingsSubnav } from '@/features/settings/components/settings-subnav'

export const SettingsLayout = () => (
  <div className="space-y-6">
    <BackofficePageHeader
      title="Ajustes"
      description="Configuracion general del negocio y del sitio publico."
    />
    <SettingsSubnav />
    <Outlet />
  </div>
)
