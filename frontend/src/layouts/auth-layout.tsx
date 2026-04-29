import { Navigate, Outlet } from '@tanstack/react-router'
import { useCurrentUserQuery } from '@/features/auth'
import { LoadingState } from '@/components/feedback/loading-state'

export const AuthLayout = () => {
  const currentUserQuery = useCurrentUserQuery()

  if (currentUserQuery.isLoading) {
    return <LoadingState title="Comprobando sesión" description="Validando acceso al backoffice." />
  }

  if (currentUserQuery.data) {
    return <Navigate to="/backoffice" />
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6 py-10">
      <div className="w-full max-w-md rounded-[var(--ds-radius-lg)] border border-brand bg-brand-strong p-8 text-brand-foreground shadow-overlay">
        <Outlet />
      </div>
    </div>
  )
}
