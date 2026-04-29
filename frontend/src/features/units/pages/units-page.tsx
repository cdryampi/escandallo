import { ModulePlaceholder } from '@/components/feedback/module-placeholder'
import { BackofficePageHeader } from '@/components/layout/backoffice-page-header'

export const UnitsPage = () => (
  <div className="space-y-6">
    <BackofficePageHeader title="Unidades" description="Shell funcional para unidades y conversiones." />
    <ModulePlaceholder title="Unidades y conversiones" description="Ruta preparada para listados, forms y tabla paginada." />
  </div>
)
