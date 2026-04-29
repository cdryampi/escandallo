import { ModulePlaceholder } from '@/components/feedback/module-placeholder'
import { BackofficePageHeader } from '@/components/layout/backoffice-page-header'

export const ReportsPage = () => (
  <div className="space-y-6">
    <BackofficePageHeader title="Reportes" description="Skeleton preparado para análisis específico separado del dashboard." />
    <ModulePlaceholder title="Reportes operativos" description="Dashboard y reportes mantienen responsabilidades separadas." />
  </div>
)
