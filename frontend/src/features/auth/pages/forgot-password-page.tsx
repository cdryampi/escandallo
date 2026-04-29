import { Link } from '@tanstack/react-router'
import { ForgotPasswordForm } from '@/features/auth/components/forgot-password-form'

export const ForgotPasswordPage = () => (
  <div className="space-y-8">
    <div className="space-y-2 text-center">
      <h1 className="type-display-md text-brand-foreground">Recuperar acceso</h1>
      <p className="type-body-sm text-brand-muted">Formulario desacoplado dentro del feature `auth`.</p>
    </div>
    <ForgotPasswordForm />
    <div className="text-center type-body-sm text-brand-muted">
      <Link to="/login" className="font-medium text-brand-muted transition-colors hover:text-brand-foreground">
        Volver a iniciar sesión
      </Link>
    </div>
  </div>
)
