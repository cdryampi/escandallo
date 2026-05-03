import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, Trash2 } from 'lucide-react'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { TestimonialsBlockSchema, type TestimonialsBlockData } from '../schemas/cms.schema'

interface Props {
  defaultValues: TestimonialsBlockData
  onSubmit: (values: TestimonialsBlockData) => void
  onChange: (values: TestimonialsBlockData) => void
  onCancel: () => void
}

export const TestimonialsBlockForm = ({ defaultValues, onSubmit, onChange, onCancel }: Props) => {
  const form = useForm<TestimonialsBlockData>({
    resolver: zodResolver(TestimonialsBlockSchema),
    defaultValues,
  })

  useEffect(() => {
    const subscription = form.watch((values) => {
      onChange(values as TestimonialsBlockData)
    })

    return () => subscription.unsubscribe()
  }, [form, onChange])

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'testimonials',
  })

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
      <div className="space-y-8 rounded-2xl border border-border bg-surface-container-lowest p-8 shadow-sm">
        <h4 className="border-b border-border/50 pb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">Cabecera del bloque</h4>
        <div className="space-y-4">
          <label className="ui-field-label text-xs uppercase tracking-widest text-muted-foreground/80">Titulo</label>
          <Input {...form.register('title')} placeholder="Lo que se dice de la casa" className="h-12 bg-white font-semibold" />
        </div>
        <div className="space-y-4">
          <label className="ui-field-label text-xs uppercase tracking-widest text-muted-foreground/80">Introduccion</label>
          <Input {...form.register('intro')} placeholder="Resenas y confianza editorial." className="h-11 bg-white" />
        </div>
      </div>

      <div className="space-y-8">
        <div className="flex items-center justify-between border-b border-border/60 pb-4">
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-on-surface">Testimonios</label>
            <p className="text-[10px] text-muted-foreground">Minimo 2 y maximo 6 citas.</p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append({ quote: '', author: '', source: '' })}
            disabled={fields.length >= 6}
            className="flex h-9 items-center gap-2 border-primary/30 px-4 text-primary hover:bg-primary/5"
          >
            <Plus className="size-4" />
            Anadir testimonio
          </Button>
        </div>

        <div className="space-y-6">
          {fields.map((field, index) => (
            <div key={field.id} className="space-y-6 rounded-2xl border border-border bg-surface-container-lowest p-8 shadow-sm">
              <div className="flex items-center justify-between">
                <h5 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Testimonio {index + 1}</h5>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => remove(index)}
                  disabled={fields.length <= 2}
                  className="h-8 w-8 rounded-full text-error/70 hover:bg-error/10 hover:text-error"
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <label className="ui-field-label text-xs uppercase tracking-widest text-muted-foreground/80">Cita</label>
                <Input {...form.register(`testimonials.${index}.quote`)} placeholder="Una experiencia afinada y serena." className="h-11 bg-white" />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <label className="ui-field-label text-xs uppercase tracking-widest text-muted-foreground/80">Autor</label>
                  <Input {...form.register(`testimonials.${index}.author`)} placeholder="Marina P." className="h-11 bg-white" />
                </div>
                <div className="space-y-4">
                  <label className="ui-field-label text-xs uppercase tracking-widest text-muted-foreground/80">Fuente</label>
                  <Input {...form.register(`testimonials.${index}.source`)} placeholder="Google Reviews" className="h-11 bg-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="sticky bottom-[-40px] z-10 -mx-10 flex justify-end gap-4 border-t border-border bg-white/95 px-10 py-6 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] backdrop-blur-md">
        <Button type="button" variant="outline" onClick={onCancel} className="h-11 px-8 text-sm font-semibold">Cancelar</Button>
        <Button type="submit" className="h-11 px-10 text-sm font-bold shadow-lg shadow-primary/20">Guardar bloque</Button>
      </div>
    </form>
  )
}
