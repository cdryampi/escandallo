import { useSearch } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { resetPasswordSchema, type ResetPasswordFormValues } from '@/features/auth/schemas/login.schema'
import { useResetPasswordMutation } from '@/features/auth/hooks/use-auth-mutations'

export const ResetPasswordForm = () => {
  const search = useSearch({ strict: false })
  const resetPasswordMutation = useResetPasswordMutation()
  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: typeof search.email === 'string' ? search.email : 'admin@escandallo.test',
      password: '',
      password_confirmation: '',
      token: typeof search.token === 'string' ? search.token : '',
    },
  })

  return (
    <form
      className="space-y-5"
      onSubmit={form.handleSubmit((values) =>
        resetPasswordMutation.mutate(values, {
          onSuccess: () => toast.success('Contraseña restablecida.'),
          onError: () => toast.error('No se pudo restablecer la contraseña.'),
        }),
      )}
    >
      <div className="space-y-2">
        <label className="type-body-md font-medium text-brand-foreground" htmlFor="reset-email">
          Email
        </label>
        <Input id="reset-email" type="email" autoComplete="email" {...form.register('email')} />
      </div>
      <div className="space-y-2">
        <label className="type-body-md font-medium text-brand-foreground" htmlFor="reset-password">
          Nueva contraseña
        </label>
        <Input id="reset-password" type="password" autoComplete="new-password" {...form.register('password')} />
      </div>
      <div className="space-y-2">
        <label className="type-body-md font-medium text-brand-foreground" htmlFor="reset-password-confirmation">
          Confirmación
        </label>
        <Input
          id="reset-password-confirmation"
          type="password"
          autoComplete="new-password"
          {...form.register('password_confirmation')}
        />
      </div>
      <input type="hidden" {...form.register('token')} />
      <p className="ui-field-error text-danger-soft">
        {form.formState.errors.password?.message ?? form.formState.errors.password_confirmation?.message}
      </p>
      <Button className="w-full" type="submit" disabled={resetPasswordMutation.isPending}>
        {resetPasswordMutation.isPending ? 'Guardando...' : 'Guardar nueva contraseña'}
      </Button>
    </form>
  )
}
