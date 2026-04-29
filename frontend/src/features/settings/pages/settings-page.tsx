import { ModulePlaceholder } from '@/components/feedback/module-placeholder'
import { BackofficePageHeader } from '@/components/layout/backoffice-page-header'

export const SettingsPage = () => (
  <div className="space-y-6">
    <BackofficePageHeader title="Ajustes" description="Shell funcional para la configuración general del restaurante." />
    <ModulePlaceholder title="Configuración del negocio" description="Feature separado para settings del restaurante y del sitio." />
  </div>
)
