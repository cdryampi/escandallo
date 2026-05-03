import { useEffect } from 'react'
import { useParams } from '@tanstack/react-router'
import { useAdminPage, useUpdatePageVersion } from '@/api/cms'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Info, Settings } from 'lucide-react'

interface SettingsValues {
  name: string
  slug: string
  is_active: boolean
}

export const CmsEditorSettingsPage = () => {
  const { pageId } = useParams({ from: '/backoffice/cms/pages/$pageId' })
  const parsedPageId = Number(pageId)

  const { data: page } = useAdminPage(parsedPageId)
  const updateVersion = useUpdatePageVersion()

  const form = useForm<SettingsValues>({
    defaultValues: {
      name: '',
      slug: '',
      is_active: true,
    },
  })

  useEffect(() => {
    if (!page) return

    form.reset({
      name: page.name,
      slug: page.slug,
      is_active: page.is_active,
    })
  }, [form, page])

  if (!page) return null

  const onSubmit = (values: SettingsValues) => {
    const versionId = page.draft_version?.id ?? page.published_version?.id ?? 0

    updateVersion.mutate(
      {
        versionId,
        data: {
          is_active: values.is_active,
        },
      },
      {
        onSuccess: () => toast.success('Configuracion general guardada.'),
        onError: () => toast.error('No pudimos guardar la configuracion.'),
      },
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Configuracion General</h2>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 rounded-xl border border-border bg-white p-6 shadow-sm">
            <div className="space-y-2">
              <label className="ui-field-label">Nombre interno</label>
              <Input {...form.register('name')} disabled />
              <p className="text-[10px] text-muted-foreground">Semilla base del sistema. En esta version no se renombra desde UI.</p>
            </div>

            <div className="space-y-2">
              <label className="ui-field-label">Ruta publica</label>
              <Input value={page.slug === 'home' ? '/' : `/${page.slug}`} disabled className="font-mono" />
              <p className="text-[10px] text-muted-foreground">Slug fijo en este MVP para evitar enlaces rotos.</p>
            </div>

            <div className="flex items-center gap-3 rounded-md border border-border bg-surface-container-lowest p-4">
              <input
                type="checkbox"
                id="is_active"
                {...form.register('is_active')}
                className="size-4 rounded border-border text-primary focus:ring-primary"
              />
              <div className="space-y-1">
                <label htmlFor="is_active" className="type-body-sm font-medium leading-none text-foreground">
                  Pagina activa
                </label>
                <p className="text-xs text-muted-foreground">
                  Si se desactiva, la pagina devolvera 404 aunque tenga contenido publicado.
                </p>
              </div>
            </div>

            <div className="flex justify-end border-t border-border pt-4">
              <Button type="submit" disabled={updateVersion.isPending}>
                {updateVersion.isPending ? 'Guardando...' : 'Guardar cambios'}
              </Button>
            </div>
          </form>
        </div>

        <div className="space-y-6 lg:col-span-5">
          <div className="rounded-xl border border-border bg-surface-container-low p-8 text-center">
            <Settings className="mx-auto mb-4 size-10 text-muted-foreground/30" />
            <h3 className="mb-2 text-sm font-bold uppercase tracking-widest text-muted-foreground">Alcance de este MVP</h3>
            <p className="text-xs text-muted-foreground">
              Crear, borrar o renombrar paginas queda fuera de esta entrega. Esta vista controla disponibilidad publica sin romper slugs semilla.
            </p>
          </div>
          <div className="rounded-xl border border-info/20 bg-info-soft/40 p-5">
            <div className="flex items-start gap-3">
              <Info className="mt-0.5 size-4 text-info-foreground" />
              <p className="text-sm text-info-foreground">
                Los estilos globales de la landing ahora viven en <strong>Ajustes &gt; Estilos</strong>, fuera del CMS.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
