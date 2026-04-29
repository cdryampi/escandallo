import { ModulePlaceholder } from '@/components/feedback/module-placeholder'
import { BackofficePageHeader } from '@/components/layout/backoffice-page-header'

export const SuppliersPage = () => (
  <div className="space-y-6">
    <BackofficePageHeader title="Proveedores" description="Shell funcional para proveedores y alta/edición futuras." />
    <ModulePlaceholder title="Gestión de proveedores" description="Se mantiene aislado del módulo de ingredientes salvo contratos públicos." />
  </div>
)
