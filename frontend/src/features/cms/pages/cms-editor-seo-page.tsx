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

  const [seo, setSeo] = useState<SeoSettingsValues>(() => ({
    meta_title: page?.meta_title ?? '',
    meta_description: page?.meta_description ?? '',
    meta_image_url: page?.meta_image_url ?? '',
    show_in_menu: page?.show_in_menu ?? false,
  }))

  if (!page) return null

  const handleUpdateSeo = (values: SeoSettingsValues) => {
    setSeo(values)
    updateVersion.mutate(
      {
        versionId: page.draft_version?.id || page.published_version?.id || 0,
        data: values,
      },
      {
        onSuccess: () => toast.success('SEO guardado con éxito.'),
        onError: () => toast.error('Error al guardar SEO.'),
      }
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">SEO y Metadatos</h2>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
        <div className="lg:col-span-7">
          <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
            <SeoSettingsForm
              defaultValues={seo}
              onSubmit={handleUpdateSeo}
              onCancel={() => {}} // No cancel button needed in this view
            />
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-xl border border-border bg-white p-6 shadow-sm space-y-4">
            <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground border-b border-border pb-2">
              <Search className="size-4" />
              Previsualización en Google
            </h3>
            <div className="space-y-1.5 overflow-hidden">
              <p className="truncate text-sm font-medium text-[#1a0dab]">
                {seo.meta_title || 'Sin título SEO'}
              </p>
              <p className="text-xs text-[#006621]">
                escandallo.test › {page.slug}
              </p>
              <p className="line-clamp-2 text-xs text-[#545454]">
                {seo.meta_description || 'Configura una descripción para ver cómo aparecerá este resultado en los buscadores.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
