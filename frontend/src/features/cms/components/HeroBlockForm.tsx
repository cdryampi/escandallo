import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { HeroBlockSchema, type HeroBlockData } from '../schemas/cms.schema';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MediaField } from './MediaField';

interface Props {
  defaultValues: HeroBlockData;
  onSubmit: (values: HeroBlockData) => void;
  onCancel: () => void;
}

export const HeroBlockForm = ({ defaultValues, onSubmit, onCancel }: Props) => {
  const form = useForm<HeroBlockData>({
    resolver: zodResolver(HeroBlockSchema),
    defaultValues,
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
      <div className="space-y-8 rounded-2xl border border-border bg-surface-container-lowest p-8 shadow-sm">
        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 border-b border-border/50 pb-4">Contenido Principal</h4>
        <div className="space-y-4">
          <label className="ui-field-label text-xs uppercase tracking-widest text-muted-foreground/80">Título</label>
          <Input {...form.register('title')} placeholder="Ej: Bienvenidos a Escandallo" className="type-headline-sm h-12 bg-white" />
          {form.formState.errors.title && <p className="ui-field-error mt-2">{form.formState.errors.title.message}</p>}
        </div>
        
        <div className="space-y-4">
          <label className="ui-field-label text-xs uppercase tracking-widest text-muted-foreground/80">Subtítulo</label>
          <Input {...form.register('subtitle')} placeholder="Ej: La precisión que tu negocio necesita" className="h-11 bg-white" />
        </div>
      </div>

      <div className="space-y-8 rounded-2xl border border-border bg-surface-container-lowest p-8 shadow-sm">
        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 border-b border-border/50 pb-4">Imagen Hero</h4>
        
        <Controller
          name="image_url"
          control={form.control}
          render={({ field }) => (
            <MediaField
              value={field.value ?? ''}
              onChange={field.onChange}
              description="Esta imagen se mostrará como fondo principal de la sección."
            />
          )}
        />

        {form.formState.errors.image_url && <p className="ui-field-error mt-2">{form.formState.errors.image_url.message}</p>}
      </div>

      <div className="space-y-8 rounded-2xl border border-border bg-surface-container-lowest p-8 shadow-sm">
        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 border-b border-border/50 pb-4">Llamada a la Acción (CTA)</h4>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <label className="ui-field-label text-xs uppercase tracking-widest text-muted-foreground/80">Etiqueta</label>
            <Input {...form.register('cta_text')} placeholder="Ej: Reservar" className="h-11 bg-white" />
          </div>
          <div className="space-y-4">
            <label className="ui-field-label text-xs uppercase tracking-widest text-muted-foreground/80">Enlace</label>
            <Input {...form.register('cta_url')} placeholder="Ej: /reservas" className="font-mono text-xs h-11 bg-white" />
          </div>
        </div>
      </div>

      <div className="sticky bottom-[-40px] -mx-10 px-10 py-6 bg-white/95 backdrop-blur-md border-t border-border flex justify-end gap-4 z-10 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
        <Button type="button" variant="outline" onClick={onCancel} className="px-8 h-11 text-sm font-semibold">Cancelar</Button>
        <Button type="submit" className="px-10 h-11 text-sm font-bold shadow-primary/20 shadow-lg">Aplicar cambios</Button>
      </div>
    </form>
  );
};
