import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ReservationCtaBlockSchema, type ReservationCtaBlockData } from '../schemas/cms.schema'
import { MediaField } from './MediaField'

interface Props {
  defaultValues: ReservationCtaBlockData
  onSubmit: (values: ReservationCtaBlockData) => void
  onChange: (values: ReservationCtaBlockData) => void
  onCancel: () => void
}

export const ReservationCtaBlockForm = ({ defaultValues, onSubmit, onChange, onCancel }: Props) => {
  const form = useForm<ReservationCtaBlockData>({
    resolver: zodResolver(ReservationCtaBlockSchema),
    defaultValues,
  })

  useEffect(() => {
    const subscription = form.watch((values) => {
      onChange(values as ReservationCtaBlockData)
    })

    return () => subscription.unsubscribe()
  }, [form, onChange])

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
      <div className="space-y-8 rounded-2xl border border-border bg-surface-container-lowest p-8 shadow-sm">
        <h4 className="border-b border-border/50 pb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">Mensaje editorial</h4>
        <div className="space-y-4">
          <label className="ui-field-label text-xs uppercase tracking-widest text-muted-foreground/80">Eyebrow</label>
          <Input {...form.register('eyebrow')} placeholder="Reservas privadas" className="h-11 bg-white" />
        </div>
        <div className="space-y-4">
          <label className="ui-field-label text-xs uppercase tracking-widest text-muted-foreground/80">Titulo</label>
          <Input {...form.register('title')} placeholder="Una mesa preparada a tu medida" className="h-12 bg-white font-semibold" />
        </div>
        <div className="space-y-4">
          <label className="ui-field-label text-xs uppercase tracking-widest text-muted-foreground/80">Cuerpo</label>
          <Input {...form.register('body')} placeholder="Reservas, celebraciones y eventos con contexto." className="h-11 bg-white" />
        </div>
      </div>

      <div className="space-y-8 rounded-2xl border border-border bg-surface-container-lowest p-8 shadow-sm">
        <h4 className="border-b border-border/50 pb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">Acciones</h4>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <label className="ui-field-label text-xs uppercase tracking-widest text-muted-foreground/80">Texto CTA principal</label>
            <Input {...form.register('primary_cta_text')} placeholder="Reservar mesa" className="h-11 bg-white" />
          </div>
          <div className="space-y-4">
            <label className="ui-field-label text-xs uppercase tracking-widest text-muted-foreground/80">Enlace CTA principal</label>
            <Input {...form.register('primary_cta_url')} placeholder="/contacto" className="h-11 bg-white font-mono text-xs" />
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <label className="ui-field-label text-xs uppercase tracking-widest text-muted-foreground/80">Texto CTA secundario</label>
            <Input {...form.register('secondary_cta_text')} placeholder="Ver carta" className="h-11 bg-white" />
          </div>
          <div className="space-y-4">
            <label className="ui-field-label text-xs uppercase tracking-widest text-muted-foreground/80">Enlace CTA secundario</label>
            <Input {...form.register('secondary_cta_url')} placeholder="/carta" className="h-11 bg-white font-mono text-xs" />
          </div>
        </div>
      </div>

      <div className="space-y-8 rounded-2xl border border-border bg-surface-container-lowest p-8 shadow-sm">
        <h4 className="border-b border-border/50 pb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">Imagen de fondo</h4>
        <Controller
          name="background_image_url"
          control={form.control}
          render={({ field }) => (
            <MediaField
              value={field.value ?? ''}
              onChange={field.onChange}
              description="Opcional. Imagen ambiental para reforzar el CTA."
            />
          )}
        />
      </div>

      <div className="sticky bottom-[-40px] z-10 -mx-10 flex justify-end gap-4 border-t border-border bg-white/95 px-10 py-6 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] backdrop-blur-md">
        <Button type="button" variant="outline" onClick={onCancel} className="h-11 px-8 text-sm font-semibold">Cancelar</Button>
        <Button type="submit" className="h-11 px-10 text-sm font-bold shadow-lg shadow-primary/20">Guardar bloque</Button>
      </div>
    </form>
  )
}
