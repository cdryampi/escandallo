import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm, useWatch, Controller } from 'react-hook-form'
import { SeoSettingsSchema, type SeoSettingsValues } from '../schemas/cms.schema'
import { MediaPicker } from './MediaPicker'

interface Props {
  defaultValues: Partial<SeoSettingsValues>
  onSubmit: (values: SeoSettingsValues) => void
  onCancel: () => void
}

export const SeoSettingsForm = ({ defaultValues, onSubmit, onCancel }: Props) => {
  const form = useForm({
    resolver: zodResolver(SeoSettingsSchema),
    defaultValues: {
      meta_title: defaultValues.meta_title ?? '',
      meta_description: defaultValues.meta_description ?? '',
      meta_image_url: defaultValues.meta_image_url ?? '',
      show_in_menu: !!defaultValues.show_in_menu,
    },
  })

  const metaTitle = useWatch({ control: form.control, name: 'meta_title' })
  const metaDescription = useWatch({ control: form.control, name: 'meta_description' })

  useEffect(() => {
    form.reset({
      meta_title: defaultValues.meta_title ?? '',
      meta_description: defaultValues.meta_description ?? '',
      meta_image_url: defaultValues.meta_image_url ?? '',
      show_in_menu: !!defaultValues.show_in_menu,
    })
  }, [
    defaultValues.meta_description,
    defaultValues.meta_image_url,
    defaultValues.meta_title,
    defaultValues.show_in_menu,
    form,
  ])

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
      <div className="space-y-4">
        <div className="flex justify-between items-end pb-1">
          <label className="ui-field-label text-xs uppercase tracking-widest text-muted-foreground/80">Titulo SEO (Meta Title)</label>
          <span className={`text-[10px] font-mono ${(metaTitle?.length || 0) > 60 ? 'text-error font-bold' : 'text-muted-foreground'}`}>
            {metaTitle?.length || 0}/60
          </span>
        </div>
        <Input {...form.register('meta_title')} placeholder="Ej: Inicio | Restaurante" className="bg-white h-11 shadow-sm" />
        {form.formState.errors.meta_title ? <p className="ui-field-error mt-2">{form.formState.errors.meta_title.message}</p> : null}
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-end pb-1">
          <label className="ui-field-label text-xs uppercase tracking-widest text-muted-foreground/80">Descripcion SEO (Meta Description)</label>
          <span className={`text-[10px] font-mono ${(metaDescription?.length || 0) > 160 ? 'text-error font-bold' : 'text-muted-foreground'}`}>
            {metaDescription?.length || 0}/160
          </span>
        </div>
        <Textarea
          {...form.register('meta_description')}
          placeholder="Breve descripcion para buscadores..."
          className="min-h-[120px] bg-white resize-none shadow-sm p-4"
        />
        {form.formState.errors.meta_description ? (
          <p className="ui-field-error mt-2">{form.formState.errors.meta_description.message}</p>
        ) : null}
      </div>

      <div className="space-y-8 rounded-2xl border border-border bg-surface-container-lowest p-8 shadow-sm">
        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 border-b border-border/50 pb-4">Imagen SEO (Social Sharing)</h4>
        
        <Controller
          name="meta_image_url"
          control={form.control}
          render={({ field }) => (
            <MediaPicker
              currentUrl={field.value ?? ''}
              onSelect={field.onChange}
            />
          )}
        />

        {form.formState.errors.meta_image_url ? (
          <p className="ui-field-error mt-2">{form.formState.errors.meta_image_url.message}</p>
        ) : null}
      </div>

      <div className="flex items-center gap-6 space-y-0 rounded-2xl border border-border p-6 bg-white shadow-sm transition-all hover:border-primary/30 hover:shadow-md">
        <input
          type="checkbox"
          id="show_in_menu"
          {...form.register('show_in_menu')}
          className="size-6 rounded border-border text-primary focus:ring-primary cursor-pointer transition-transform hover:scale-110"
        />
        <div className="space-y-1.5 cursor-pointer" onClick={() => form.setValue('show_in_menu', !form.getValues('show_in_menu'))}>
          <label htmlFor="show_in_menu" className="type-body-md font-bold text-foreground cursor-pointer block">
            Mostrar en el menú principal
          </label>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Si se activa, la página aparecerá automáticamente en la navegación pública del sitio.
          </p>
        </div>
      </div>

      <div className="flex justify-end gap-4 border-t border-border pt-10">
        <Button type="button" variant="outline" onClick={onCancel} className="px-8 h-11 text-sm font-semibold">
          Cancelar
        </Button>
        <Button type="submit" className="px-10 h-11 text-sm font-bold shadow-primary/20 shadow-lg">Guardar ajustes SEO</Button>
      </div>
    </form>
  )
}
