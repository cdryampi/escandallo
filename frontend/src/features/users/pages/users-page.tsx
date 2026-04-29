import { ModulePlaceholder } from '@/components/feedback/module-placeholder'
import { BackofficePageHeader } from '@/components/layout/backoffice-page-header'

export const UsersPage = () => (
  <div className="space-y-6">
    <BackofficePageHeader title="Usuarios" description="Skeleton preparado para permisos y gestión de cuentas." />
    <ModulePlaceholder title="Usuarios y permisos" description="La autorización real seguirá viviendo en Laravel." />
  </div>
)
