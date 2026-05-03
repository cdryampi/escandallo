import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { Clock, Coffee, Heart, MapPin, Plus, Shield, Star, Trash2, Utensils, Zap } from 'lucide-react'
import { useFieldArray, useForm, useWatch } from 'react-hook-form'
import { FeatureListBlockSchema, type FeatureListBlockData } from '../schemas/cms.schema'

interface Props {
  defaultValues: FeatureListBlockData
  onSubmit: (values: FeatureListBlockData) => void
  onChange: (values: FeatureListBlockData) => void
  onCancel: () => void
}

const AVAILABLE_ICONS = [
  { name: 'Utensils', icon: Utensils },
  { name: 'Clock', icon: Clock },
  { name: 'MapPin', icon: MapPin },
  { name: 'Star', icon: Star },
  { name: 'Shield', icon: Shield },
  { name: 'Zap', icon: Zap },
  { name: 'Heart', icon: Heart },
  { name: 'Coffee', icon: Coffee },
]

export const FeatureListBlockForm = ({ defaultValues, onSubmit, onChange, onCancel }: Props) => {
  const form = useForm<FeatureListBlockData>({
    resolver: zodResolver(FeatureListBlockSchema),
    defaultValues,
  })

  useEffect(() => {
    const subscription = form.watch((values) => {
      onChange(values as FeatureListBlockData)
    })

    return () => subscription.unsubscribe()
  }, [form, onChange])

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'features',
  })

  const watchedFeatures = useWatch({
    control: form.control,
    name: 'features',
    defaultValue: defaultValues.features,
  })

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
      <div className="space-y-4">
        <label className="ui-field-label text-xs uppercase tracking-widest text-muted-foreground/80">Título de la sección</label>
        <Input {...form.register('title')} placeholder="Ej: Nuestros servicios" className="bg-white font-bold h-12 text-lg shadow-sm focus:ring-primary/20" />
        {form.formState.errors.title ? <p className="ui-field-error mt-2">{form.formState.errors.title.message}</p> : null}
      </div>

      <div className="space-y-8">
        <div className="flex items-center justify-between border-b border-border/60 pb-4">
          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-on-surface">Elementos destacados</label>
            <p className="text-[10px] text-muted-foreground">Gestiona la lista de iconos y descripciones.</p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append({ title: '', description: '', icon: 'Star' })}
            className="flex h-9 items-center gap-2 px-4 border-primary/30 text-primary hover:bg-primary/5 transition-all shadow-sm"
          >
            <Plus className="size-4" />
            Añadir elemento
          </Button>
        </div>

        <div className="space-y-6">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="group/item relative space-y-8 rounded-2xl border border-border bg-surface-container-lowest p-8 transition-all hover:border-primary/40 hover:shadow-xl hover:-translate-y-0.5"
            >
              <div className="absolute top-4 left-4 flex h-6 w-6 items-center justify-center rounded-full bg-surface-container text-[10px] font-bold text-muted-foreground">
                {index + 1}
              </div>
              
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => remove(index)}
                className="absolute top-4 right-4 opacity-0 text-muted-foreground transition-all hover:bg-error/10 hover:text-error group-hover/item:opacity-100 h-9 w-9 rounded-full"
              >
                <Trash2 className="size-4" />
              </Button>

              <div className="grid grid-cols-1 gap-8 pt-2">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/70">Título del elemento</label>
                  <Input {...form.register(`features.${index}.title`)} placeholder="Ej: Calidad Garantizada" className="h-11 bg-white shadow-inner" />
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/70">Seleccionar Icono</label>
                  <div className="grid grid-cols-8 gap-2 rounded-xl border border-border bg-white p-3 shadow-inner">
                    {AVAILABLE_ICONS.map(({ name, icon: Icon }) => (
                      <button
                        key={name}
                        type="button"
                        onClick={() => form.setValue(`features.${index}.icon`, name)}
                        className={`flex items-center justify-center rounded-lg aspect-square transition-all ${
                          watchedFeatures?.[index]?.icon === name
                            ? 'bg-primary text-white shadow-lg scale-110'
                            : 'text-muted-foreground hover:bg-surface-container-low hover:text-primary'
                        }`}
                        title={name}
                      >
                        <Icon className="size-4" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/70">Descripción corta</label>
                <Input {...form.register(`features.${index}.description`)} placeholder="Ej: Solo utilizamos ingredientes frescos..." className="h-11 bg-white shadow-inner" />
              </div>
            </div>
          ))}
        </div>

        {form.formState.errors.features ? (
          <div className="flex items-center justify-center gap-2 bg-error/5 py-4 rounded-xl border border-error/20 animate-in fade-in slide-in-from-top-1">
             <Trash2 className="size-4 text-error" />
             <p className="ui-field-error font-medium">{form.formState.errors.features.message}</p>
          </div>
        ) : null}
      </div>

      <div className="sticky bottom-[-40px] -mx-10 px-10 py-6 bg-white/95 backdrop-blur-md border-t border-border flex justify-end gap-4 z-10 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
        <Button type="button" variant="outline" onClick={onCancel} className="px-8 h-11 text-sm font-semibold">
          Cancelar
        </Button>
        <Button type="submit" className="px-10 h-11 text-sm font-bold shadow-primary/20 shadow-lg">
          Guardar bloque
        </Button>
      </div>
    </form>
  )
}
