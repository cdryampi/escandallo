import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { loginSchema, type LoginFormValues } from '@/features/auth/schemas/login.schema'
import { useLoginMutation } from '@/features/auth/hooks/use-auth-mutations'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export const LoginForm = () => {
  const navigate = useNavigate()
  const loginMutation = useLoginMutation()
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'admin@escandallo.test',
      password: 'password',
    },
  })

  const onSubmit = form.handleSubmit((values) => {
    loginMutation.mutate(values, {
      onSuccess: () => {
        toast.success('Sesión iniciada.')
        void navigate({ to: '/backoffice' })
      },
      onError: () => {
        toast.error('No se pudo iniciar sesión.')
      },
    })
  })

  return (
    <form className="space-y-5" onSubmit={onSubmit}>
      <div className="space-y-2">
        <label className="type-body-md font-medium text-brand-foreground" htmlFor="email">
          Email
        </label>
        <Input id="email" type="email" autoComplete="email" {...form.register('email')} />
        <p className="ui-field-error text-danger-soft">{form.formState.errors.email?.message}</p>
      </div>

      <div className="space-y-2">
        <label className="type-body-md font-medium text-brand-foreground" htmlFor="password">
          Contraseña
        </label>
        <Input id="password" type="password" autoComplete="current-password" {...form.register('password')} />
        <p className="ui-field-error text-danger-soft">{form.formState.errors.password?.message}</p>
      </div>

      <Button className="w-full" type="submit" disabled={loginMutation.isPending}>
        {loginMutation.isPending ? 'Entrando...' : 'Entrar al backoffice'}
      </Button>
    </form>
  )
}
