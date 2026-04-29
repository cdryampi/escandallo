import { Link } from '@tanstack/react-router'
import { ResetPasswordForm } from '@/features/auth/components/reset-password-form'

export const ResetPasswordPage = () => (
  <div className="space-y-8">
    <div className="space-y-2 text-center">
      <h1 className="type-display-md text-brand-foreground">Nueva contraseña</h1>
      <p className="type-body-sm text-brand-muted">El backend sigue siendo autoridad final del reseteo.</p>
    </div>
    <ResetPasswordForm />
    <div className="text-center type-body-sm text-brand-muted">
      <Link to="/login" className="font-medium text-brand-muted transition-colors hover:text-brand-foreground">
        Volver a iniciar sesión
      </Link>
    </div>
  </div>
)
