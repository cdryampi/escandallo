import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ContactFormBlockSchema, type ContactFormBlockData } from '../schemas/cms.schema';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Props {
  defaultValues: ContactFormBlockData;
  onSubmit: (values: ContactFormBlockData) => void;
  onChange: (values: ContactFormBlockData) => void;
  onCancel: () => void;
}

export const ContactFormBlockForm = ({ defaultValues, onSubmit, onChange, onCancel }: Props) => {
  const form = useForm<ContactFormBlockData>({
    resolver: zodResolver(ContactFormBlockSchema),
    defaultValues,
  });

  useEffect(() => {
    const subscription = form.watch((values) => {
      onChange(values as ContactFormBlockData);
    });

    return () => subscription.unsubscribe();
  }, [form, onChange]);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
      <div className="space-y-8 rounded-2xl border border-border bg-surface-container-lowest p-8 shadow-sm">
        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 border-b border-border/50 pb-4">Gestión de Leads y Contacto</h4>
        
        <div className="space-y-4">
          <label className="ui-field-label text-xs uppercase tracking-widest text-muted-foreground/80">Título del formulario</label>
          <Input {...form.register('heading')} placeholder="Contacta con nosotros" className="type-headline-sm h-12 bg-white shadow-inner" />
          {form.formState.errors.heading && <p className="ui-field-error mt-2">{form.formState.errors.heading.message}</p>}
        </div>

        <div className="space-y-4">
          <label className="ui-field-label text-xs uppercase tracking-widest text-muted-foreground/80">Email de recepción</label>
          <Input {...form.register('recipient_email')} placeholder="admin@escandallo.test" className="h-11 bg-white shadow-inner font-mono text-xs" />
          <p className="text-[11px] text-muted-foreground">Los mensajes enviados desde la web se redirigirán a esta dirección de correo.</p>
          {form.formState.errors.recipient_email && <p className="ui-field-error mt-2">{form.formState.errors.recipient_email.message}</p>}
        </div>

        <div className="space-y-4">
          <label className="ui-field-label text-xs uppercase tracking-widest text-muted-foreground/80">Mensaje de éxito</label>
          <Input {...form.register('success_message')} placeholder="Gracias por contactar con nosotros." className="h-11 bg-white shadow-inner" />
          {form.formState.errors.success_message && <p className="ui-field-error mt-2">{form.formState.errors.success_message.message}</p>}
        </div>
      </div>

      <div className="sticky bottom-[-40px] -mx-10 px-10 py-6 bg-white/95 backdrop-blur-md border-t border-border flex justify-end gap-4 z-10 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
        <Button type="button" variant="outline" onClick={onCancel} className="px-8 h-11 text-sm font-semibold">Cancelar</Button>
        <Button type="submit" className="px-10 h-11 text-sm font-bold shadow-primary/20 shadow-lg">Guardar bloque</Button>
      </div>
    </form>
  );
};
