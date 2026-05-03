import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RichTextBlockSchema, type RichTextBlockData } from '../schemas/cms.schema';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import { Button } from '@/components/ui/button';

interface Props {
  defaultValues: RichTextBlockData;
  onSubmit: (values: RichTextBlockData) => void;
  onChange: (values: RichTextBlockData) => void;
  onCancel: () => void;
}

export const RichTextBlockForm = ({ defaultValues, onSubmit, onChange, onCancel }: Props) => {
  const form = useForm<RichTextBlockData>({
    resolver: zodResolver(RichTextBlockSchema),
    defaultValues,
  });

  useEffect(() => {
    const subscription = form.watch((values) => {
      onChange(values as RichTextBlockData);
    });

    return () => subscription.unsubscribe();
  }, [form, onChange]);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
      <div className="space-y-8 rounded-2xl border border-border bg-surface-container-lowest p-8 shadow-sm">
        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 border-b border-border/50 pb-4">Editor de Texto Enriquecido</h4>
        
        <div className="space-y-4">
          <label className="ui-field-label text-xs uppercase tracking-widest text-muted-foreground/80">Cuerpo del Contenido</label>
          <div className="rounded-xl border border-border bg-white overflow-hidden shadow-inner ring-1 ring-border/20">
            <Controller
              name="content"
              control={form.control}
              render={({ field }) => (
                <RichTextEditor 
                  content={field.value} 
                  onChange={field.onChange} 
                />
              )}
            />
          </div>
          <p className="text-[11px] text-muted-foreground font-body leading-relaxed">Soporte completo para encabezados, negritas, listas y enlaces para una presentación editorial flexible.</p>
          {form.formState.errors.content && <p className="ui-field-error mt-2">{form.formState.errors.content.message}</p>}
        </div>
      </div>

      <div className="sticky bottom-[-40px] -mx-10 px-10 py-6 bg-white/95 backdrop-blur-md border-t border-border flex justify-end gap-4 z-10 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
        <Button type="button" variant="outline" onClick={onCancel} className="px-8 h-11 text-sm font-semibold">Cancelar</Button>
        <Button type="submit" className="px-10 h-11 text-sm font-bold shadow-primary/20 shadow-lg">Guardar bloque</Button>
      </div>
    </form>
  );
};
