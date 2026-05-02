import { createRoute } from '@tanstack/react-router'
import type { AnyRoute } from '@tanstack/react-router'
import { lazyNamedRouteComponent } from '@/routes/lazy-route'

const AuthLayout = lazyNamedRouteComponent(
  () => import('@/layouts/auth-layout'),
  'AuthLayout',
  {
    title: 'Cargando acceso',
    description: 'Preparando validación de sesión y contenedor seguro.',
  },
)

const LoginPage = lazyNamedRouteComponent(
  () => import('@/features/auth/pages/login-page'),
  'LoginPage',
  {
    title: 'Cargando inicio de sesión',
    description: 'Preparando formulario de acceso al backoffice.',
  },
)

const ForgotPasswordPage = lazyNamedRouteComponent(
  () => import('@/features/auth/pages/forgot-password-page'),
  'ForgotPasswordPage',
  {
    title: 'Cargando recuperación',
    description: 'Preparando flujo de restablecimiento de contraseña.',
  },
)

const ResetPasswordPage = lazyNamedRouteComponent(
  () => import('@/features/auth/pages/reset-password-page'),
  'ResetPasswordPage',
  {
    title: 'Cargando nueva contraseña',
    description: 'Preparando formulario para completar el reseteo.',
  },
)

export const buildAuthRoutes = (rootRoute: AnyRoute) => {
  const authLayoutRoute = createRoute({
    getParentRoute: () => rootRoute,
    id: 'auth-layout',
    component: AuthLayout,
  })

  const loginRoute = createRoute({
    getParentRoute: () => authLayoutRoute,
    path: '/login',
    component: LoginPage,
  })

  const forgotPasswordRoute = createRoute({
    getParentRoute: () => authLayoutRoute,
    path: '/forgot-password',
    component: ForgotPasswordPage,
  })

  const resetPasswordRoute = createRoute({
    getParentRoute: () => authLayoutRoute,
    path: '/reset-password',
    component: ResetPasswordPage,
  })

  return authLayoutRoute.addChildren([loginRoute, forgotPasswordRoute, resetPasswordRoute])
}
