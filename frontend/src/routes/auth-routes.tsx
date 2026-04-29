import { createRoute } from '@tanstack/react-router'
import type { AnyRoute } from '@tanstack/react-router'
import { AuthLayout } from '@/layouts/auth-layout'
import { ForgotPasswordPage, LoginPage, ResetPasswordPage } from '@/features/auth'

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
