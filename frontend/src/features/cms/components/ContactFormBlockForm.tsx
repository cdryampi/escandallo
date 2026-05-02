import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ContactFormBlockSchema, type ContactFormBlockData } from '../schemas/cms.schema';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Props {
  defaultValues: ContactFormBlockData;
  onSubmit: (values: ContactFormBlockData) => void;
  onCancel: () => void;
}

export const ContactFormBlockForm = ({ defaultValues, onSubmit, onCancel }: Props) => {
  const form = useForm<ContactFormBlockData>({
    resolver: zodResolver(ContactFormBlockSchema),
    defaultValues,
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <label className="ui-field-label">Título del formulario</label>
        <Input {...form.register('heading')} placeholder="Contacta con nosotros" />
        {form.formState.errors.heading && <p className="ui-field-error">{form.formState.errors.heading.message}</p>}
      </div>

      <div className="space-y-2">
        <label className="ui-field-label">Email de recepción</label>
        <Input {...form.register('recipient_email')} placeholder="admin@escandallo.test" />
        {form.formState.errors.recipient_email && <p className="ui-field-error">{form.formState.errors.recipient_email.message}</p>}
      </div>

      <div className="space-y-2">
        <label className="ui-field-label">Mensaje de éxito</label>
        <Input {...form.register('success_message')} placeholder="Gracias por contactar con nosotros." />
        {form.formState.errors.success_message && <p className="ui-field-error">{form.formState.errors.success_message.message}</p>}
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-border">
        <Button type="button" variant="outline" onClick={onCancel}>Cancelar</Button>
        <Button type="submit">Guardar Bloque</Button>
      </div>
    </form>
  );
};
