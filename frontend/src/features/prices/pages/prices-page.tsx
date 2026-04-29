import { ModulePlaceholder } from '@/components/feedback/module-placeholder'
import { BackofficePageHeader } from '@/components/layout/backoffice-page-header'

export const PricesPage = () => (
  <div className="space-y-6">
    <BackofficePageHeader title="Precios" description="Shell funcional para precios históricos y preferentes." />
    <ModulePlaceholder title="Precios de ingredientes" description="Ruta lista para filtros por proveedor, vigencia y coste base." />
  </div>
)
