import { useState } from 'react'
import { useParams } from '@tanstack/react-router'
import { useAdminPage, useUpdatePageVersion } from '@/api/cms'
import { Search } from 'lucide-react'
import { toast } from 'sonner'
import { SeoSettingsForm } from '../components/SeoSettingsForm'
import type { SeoSettingsValues } from '../schemas/cms.schema'

export const CmsEditorSeoPage = () => {
  const { pageId } = useParams({ from: '/backoffice/cms/pages/$pageId' })
  const parsedPageId = Number(pageId)

  const { data: page } = useAdminPage(parsedPageId)
  const updateVersion = useUpdatePageVersion()
  const [seoDraft, setSeoDraft] = useState<SeoSettingsValues | null>(null)

  if (!page) return null

  const seoValues: SeoSettingsValues = seoDraft ?? {
    meta_title: page.meta_title ?? '',
    meta_description: page.meta_description ?? '',
    meta_image_url: page.meta_image_url ?? '',
    show_in_menu: page.show_in_menu ?? false,
  }

  const handleUpdateSeo = (values: SeoSettingsValues) => {
    setSeoDraft(values)
    updateVersion.mutate(
      {
        versionId: page.draft_version?.id || page.published_version?.id || 0,
        data: values,
      },
      {
        onSuccess: () => toast.success('SEO guardado con exito.'),
        onError: () => toast.error('Error al guardar SEO.'),
      },
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">SEO y Metadatos</h2>
      </div>

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
            <SeoSettingsForm
              defaultValues={seoValues}
              onSubmit={handleUpdateSeo}
              onCancel={() => undefined}
            />
          </div>
        </div>

        <div className="space-y-6 lg:col-span-5">
          <div className="space-y-4 rounded-xl border border-border bg-white p-6 shadow-sm">
            <h3 className="flex items-center gap-2 border-b border-border pb-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
              <Search className="size-4" />
              Previsualizacion en Google
            </h3>
            <div className="space-y-1.5 overflow-hidden">
              <p className="truncate text-sm font-medium text-[#1a0dab]">
                {seoValues.meta_title || 'Sin titulo SEO'}
              </p>
              <p className="text-xs text-[#006621]">escandallo.test › {page.slug}</p>
              <p className="line-clamp-2 text-xs text-[#545454]">
                {seoValues.meta_description || 'Configura una descripcion para ver como aparecera este resultado en buscadores.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
