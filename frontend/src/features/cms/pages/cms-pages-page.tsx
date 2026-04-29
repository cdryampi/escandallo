import { ModulePlaceholder } from '@/components/feedback/module-placeholder'
import { BackofficePageHeader } from '@/components/layout/backoffice-page-header'

export const CmsPagesPage = () => (
  <div className="space-y-6">
    <BackofficePageHeader title="CMS" description="Shell funcional para páginas y secciones con orden drag and drop futuro." />
    <ModulePlaceholder title="Páginas CMS" description="Backoffice separado de landing pública y del dominio de escandallo." />
  </div>
)
