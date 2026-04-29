import { ModulePlaceholder } from '@/components/feedback/module-placeholder'
import { BackofficePageHeader } from '@/components/layout/backoffice-page-header'

export const AllergensPage = () => (
  <div className="space-y-6">
    <BackofficePageHeader title="Alérgenos" description="Skeleton preparado para relaciones con ingredientes y recetas." />
    <ModulePlaceholder title="Gestión de alérgenos" description="Feature listo para crecer con formularios y asociaciones." />
  </div>
)
