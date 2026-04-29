import { Link } from '@tanstack/react-router'
import { LoginForm } from '@/features/auth/components/login-form'

export const LoginPage = () => (
  <div className="space-y-8">
    <div className="space-y-2 text-center">
      <p className="ui-kicker text-brand-muted">Escandallo</p>
      <h1 className="type-display-md text-brand-foreground">Acceso al backoffice</h1>
      <p className="type-body-sm text-brand-muted">Arquitectura modular con sesión stateful vía Sanctum.</p>
    </div>
    <LoginForm />
    <div className="text-center type-body-sm text-brand-muted">
      <Link to="/forgot-password" className="font-medium text-brand-muted transition-colors hover:text-brand-foreground">
        ¿Olvidaste tu contraseña?
      </Link>
    </div>
  </div>
)
