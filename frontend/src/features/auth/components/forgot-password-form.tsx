import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from '@/features/auth/schemas/login.schema'
import { useForgotPasswordMutation } from '@/features/auth/hooks/use-auth-mutations'

export const ForgotPasswordForm = () => {
  const forgotPasswordMutation = useForgotPasswordMutation()
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: 'admin@escandallo.test' },
  })

  return (
    <form
      className="space-y-5"
      onSubmit={form.handleSubmit((values) =>
        forgotPasswordMutation.mutate(values, {
          onSuccess: () => toast.success('Solicitud enviada al backend.'),
          onError: () => toast.error('No se pudo solicitar el reseteo.'),
        }),
      )}
    >
      <div className="space-y-2">
        <label className="type-body-md font-medium text-brand-foreground" htmlFor="forgot-email">
          Email
        </label>
        <Input id="forgot-email" type="email" autoComplete="email" {...form.register('email')} />
        <p className="ui-field-error text-danger-soft">{form.formState.errors.email?.message}</p>
      </div>
      <Button className="w-full" type="submit" disabled={forgotPasswordMutation.isPending}>
        {forgotPasswordMutation.isPending ? 'Enviando...' : 'Enviar enlace'}
      </Button>
    </form>
  )
}
