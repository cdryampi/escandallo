import { useParams } from '@tanstack/react-router'
import { useAdminPage } from '@/api/cms'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Settings, AlertTriangle } from 'lucide-react'

export const CmsEditorSettingsPage = () => {
  const { pageId } = useParams({ from: '/backoffice/cms/pages/$pageId' })
  const parsedPageId = Number(pageId)

  const { data: page } = useAdminPage(parsedPageId)

  const form = useForm({
    defaultValues: {
      name: page?.name ?? '',
      slug: page?.slug ?? '',
      is_active: page?.is_active ?? true,
    },
  })

  if (!page) return null

  const onSubmit = () => {
    // Note: Changing slug or name requires backend support or careful link integrity management.
    // For now, this is read-only and shows an info notice to the editor.
    toast.info('La configuración de ruta y nombre está limitada en esta versión para proteger la integridad de los enlaces.')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Configuración General</h2>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <form onSubmit={form.handleSubmit(onSubmit)} className="rounded-xl border border-border bg-white p-6 shadow-sm space-y-4">
            <div className="space-y-2">
              <label className="ui-field-label">Nombre Interno</label>
              <Input {...form.register('name')} placeholder="Ej: Inicio" />
              <p className="text-[10px] text-muted-foreground">Solo para organización interna.</p>
            </div>

            <div className="space-y-2">
              <label className="ui-field-label">Ruta (Slug)</label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground font-mono">/</span>
                <Input {...form.register('slug')} placeholder="inicio" className="font-mono" />
              </div>
              <p className="text-[10px] text-muted-foreground text-warning flex items-center gap-1">
                <AlertTriangle className="size-3" /> Cambiar el slug romperá los enlaces existentes.
              </p>
            </div>

            <div className="flex items-center gap-3 space-y-0 rounded-md border border-border p-4 bg-surface-container-lowest">
              <input
                type="checkbox"
                id="is_active"
                {...form.register('is_active')}
                className="size-4 rounded border-border text-primary focus:ring-primary"
              />
              <div className="space-y-1">
                <label htmlFor="is_active" className="type-body-sm font-medium leading-none text-foreground">
                  Página Activa
                </label>
                <p className="text-xs text-muted-foreground">
                  Si se desactiva, la página devolverá un error 404 a los visitantes.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-border flex justify-end">
              <Button type="submit">Guardar Cambios</Button>
            </div>
          </form>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-xl border-2 border-dashed border-border p-8 text-center bg-surface-container-low">
            <Settings className="mx-auto mb-4 size-10 text-muted-foreground/30" />
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-2">Zona de Peligro</h3>
            <p className="text-xs text-muted-foreground mb-6">Acciones que afectan la disponibilidad permanente de la página.</p>
            <Button variant="outline" className="w-full text-error hover:bg-error/5 hover:text-error border-error/30">
              Eliminar Página Definitivamente
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
