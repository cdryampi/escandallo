import { useParams } from '@tanstack/react-router'
import { useAdminPage, useUpdatePageVersion } from '@/api/cms'
import { Button } from '@/components/ui/button'
import { History } from 'lucide-react'
import { toast } from 'sonner'
import type { PageVersion } from '@/types/cms'

export const CmsEditorHistoryPage = () => {
  const { pageId } = useParams({ from: '/backoffice/cms/pages/$pageId' })
  const parsedPageId = Number(pageId)

  const { data: page } = useAdminPage(parsedPageId)
  const updateVersion = useUpdatePageVersion()

  if (!page) return null

  const handleRestoreVersion = (version: PageVersion) => {
    if (
      !window.confirm(
        `¿Restaurar contenido de la versión v${version.version_number}? Se perderán los cambios no guardados en el borrador actual.`
      )
    ) {
      return
    }

    updateVersion.mutate(
      {
        versionId: page.draft_version?.id || 0,
        data: {
          blocks: version.blocks,
          meta_title: version.meta_title ?? undefined,
          meta_description: version.meta_description ?? undefined,
          meta_image_url: version.meta_image_url ?? undefined,
        },
      },
      {
        onSuccess: () => toast.success('Versión restaurada en el borrador.'),
        onError: () => toast.error('Error al restaurar versión.'),
      }
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Historial de Versiones</h2>
      </div>

      <div className="rounded-xl border border-border bg-white shadow-sm overflow-hidden">
        <div className="divide-y divide-border">
          {page.versions?.length === 0 ? (
            <div className="p-12 text-center">
              <History className="mx-auto mb-4 size-12 text-muted-foreground/20" />
              <p className="text-sm text-muted-foreground">No hay historial disponible.</p>
            </div>
          ) : (
            page.versions?.map((v) => (
              <div
                key={v.id}
                className="flex items-center justify-between p-4 transition-colors hover:bg-surface-container-lowest"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold">Versión {v.version_number}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                        v.status === 'published'
                          ? 'bg-primary/10 text-primary'
                          : v.status === 'draft'
                            ? 'bg-warning/10 text-warning'
                            : 'bg-surface-container text-muted-foreground'
                      }`}
                    >
                      {v.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Modificada el {new Date(v.updated_at).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRestoreVersion(v)}
                    className="h-8 text-xs font-semibold"
                    disabled={v.status === 'draft'}
                  >
                    Restaurar esta versión
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
