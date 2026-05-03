import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, Trash2 } from 'lucide-react'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { VisitInfoBlockSchema, type VisitInfoBlockData } from '../schemas/cms.schema'

interface Props {
  defaultValues: VisitInfoBlockData
  onSubmit: (values: VisitInfoBlockData) => void
  onChange: (values: VisitInfoBlockData) => void
  onCancel: () => void
}

export const VisitInfoBlockForm = ({ defaultValues, onSubmit, onChange, onCancel }: Props) => {
  const form = useForm<VisitInfoBlockData>({
    resolver: zodResolver(VisitInfoBlockSchema),
    defaultValues,
  })

  useEffect(() => {
    const subscription = form.watch((values) => {
      onChange(values as VisitInfoBlockData)
    })

    return () => subscription.unsubscribe()
  }, [form, onChange])

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'hours',
  })

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
      <div className="space-y-8 rounded-2xl border border-border bg-surface-container-lowest p-8 shadow-sm">
        <h4 className="border-b border-border/50 pb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">Cabecera e informacion</h4>
        <div className="space-y-4">
          <label className="ui-field-label text-xs uppercase tracking-widest text-muted-foreground/80">Titulo</label>
          <Input {...form.register('title')} placeholder="Como visitarnos" className="h-12 bg-white font-semibold" />
        </div>
        <div className="space-y-4">
          <label className="ui-field-label text-xs uppercase tracking-widest text-muted-foreground/80">Introduccion</label>
          <Input {...form.register('intro')} placeholder="Todo lo necesario para encontrarnos y reservar." className="h-11 bg-white" />
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <label className="ui-field-label text-xs uppercase tracking-widest text-muted-foreground/80">Direccion</label>
            <Input {...form.register('address')} placeholder="Calle Arenal, 14, Madrid" className="h-11 bg-white" />
          </div>
          <div className="space-y-4">
            <label className="ui-field-label text-xs uppercase tracking-widest text-muted-foreground/80">Telefono</label>
            <Input {...form.register('phone')} placeholder="+34 915 200 480" className="h-11 bg-white" />
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <label className="ui-field-label text-xs uppercase tracking-widest text-muted-foreground/80">Email</label>
            <Input {...form.register('email')} placeholder="reservas@restaurante.test" className="h-11 bg-white" />
          </div>
          <div className="space-y-4">
            <label className="ui-field-label text-xs uppercase tracking-widest text-muted-foreground/80">URL del mapa</label>
            <Input {...form.register('map_url')} placeholder="https://maps.google.com/..." className="h-11 bg-white font-mono text-xs" />
          </div>
        </div>
      </div>

      <div className="space-y-8 rounded-2xl border border-border bg-surface-container-lowest p-8 shadow-sm">
        <div className="flex items-center justify-between border-b border-border/60 pb-4">
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-on-surface">Horarios</label>
            <p className="text-[10px] text-muted-foreground">Anade franjas o dias clave.</p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append({ label: '', value: '' })}
            className="flex h-9 items-center gap-2 border-primary/30 px-4 text-primary hover:bg-primary/5"
          >
            <Plus className="size-4" />
            Anadir horario
          </Button>
        </div>

        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="grid gap-4 md:grid-cols-[0.8fr_1fr_auto] md:items-end">
              <div className="space-y-2">
                <label className="ui-field-label text-xs uppercase tracking-widest text-muted-foreground/80">Etiqueta</label>
                <Input {...form.register(`hours.${index}.label`)} placeholder="Martes a sabado" className="h-11 bg-white" />
              </div>
              <div className="space-y-2">
                <label className="ui-field-label text-xs uppercase tracking-widest text-muted-foreground/80">Valor</label>
                <Input {...form.register(`hours.${index}.value`)} placeholder="13:30-16:00 / 20:30-23:30" className="h-11 bg-white" />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => remove(index)}
                disabled={fields.length <= 1}
                className="h-11 w-11 rounded-full text-error/70 hover:bg-error/10 hover:text-error"
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-8 rounded-2xl border border-border bg-surface-container-lowest p-8 shadow-sm">
        <h4 className="border-b border-border/50 pb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">CTA principal</h4>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <label className="ui-field-label text-xs uppercase tracking-widest text-muted-foreground/80">Texto CTA</label>
            <Input {...form.register('primary_cta_text')} placeholder="Reservar mesa" className="h-11 bg-white" />
          </div>
          <div className="space-y-4">
            <label className="ui-field-label text-xs uppercase tracking-widest text-muted-foreground/80">Enlace CTA</label>
            <Input {...form.register('primary_cta_url')} placeholder="/contacto" className="h-11 bg-white font-mono text-xs" />
          </div>
        </div>
      </div>

      <div className="sticky bottom-[-40px] z-10 -mx-10 flex justify-end gap-4 border-t border-border bg-white/95 px-10 py-6 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] backdrop-blur-md">
        <Button type="button" variant="outline" onClick={onCancel} className="h-11 px-8 text-sm font-semibold">Cancelar</Button>
        <Button type="submit" className="h-11 px-10 text-sm font-bold shadow-lg shadow-primary/20">Guardar bloque</Button>
      </div>
    </form>
  )
}
