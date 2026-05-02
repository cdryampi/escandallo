import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RichTextBlockSchema, type RichTextBlockData } from '../schemas/cms.schema';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import { Button } from '@/components/ui/button';

interface Props {
  defaultValues: RichTextBlockData;
  onSubmit: (values: RichTextBlockData) => void;
  onCancel: () => void;
}

export const RichTextBlockForm = ({ defaultValues, onSubmit, onCancel }: Props) => {
  const form = useForm<RichTextBlockData>({
    resolver: zodResolver(RichTextBlockSchema),
    defaultValues,
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <label className="ui-field-label">Contenido de Texto</label>
        <div className="rounded-lg border border-border bg-white overflow-hidden shadow-sm">
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
        <p className="text-[10px] text-muted-foreground italic">Usa la barra de herramientas superior para aplicar formatos y estilos.</p>
        {form.formState.errors.content && <p className="ui-field-error">{form.formState.errors.content.message}</p>}
      </div>

      <div className="sticky bottom-[-40px] -mx-10 px-10 py-6 bg-white/95 backdrop-blur-sm border-t border-border flex justify-end gap-3 z-10 shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
        <Button type="button" variant="outline" onClick={onCancel}>Cancelar</Button>
        <Button type="submit">Aplicar cambios</Button>
      </div>
    </form>
  );
};
