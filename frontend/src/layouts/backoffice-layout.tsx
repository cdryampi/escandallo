import { Navigate, Outlet } from '@tanstack/react-router'
import { toast } from 'sonner'
import { ErrorState } from '@/components/feedback/error-state'
import { LoadingState } from '@/components/feedback/loading-state'
import { AppShell } from '@/components/layout/app-shell'
import { BackofficeBreadcrumbs } from '@/components/layout/backoffice-breadcrumbs'
import { Sidebar } from '@/components/layout/sidebar'
import { Topbar } from '@/components/layout/topbar'
import { useCurrentUserQuery, useLogoutMutation } from '@/features/auth'

export const BackofficeLayout = () => {
  const currentUserQuery = useCurrentUserQuery()
  const logoutMutation = useLogoutMutation()

  if (currentUserQuery.isLoading) {
    return <LoadingState title="Cargando backoffice" description="Recuperando usuario actual y permisos." />
  }

  if (currentUserQuery.isError) {
    return (
      <ErrorState
        title="No se pudo validar la sesión"
        description="La sesión puede haber expirado o el backend no está disponible."
        onRetry={() => currentUserQuery.refetch()}
      />
    )
  }

  if (!currentUserQuery.data) {
    return <Navigate to="/login" />
  }

  return (
    <AppShell
      sidebar={<Sidebar />}
      topbar={
        <Topbar
          user={currentUserQuery.data}
          onLogout={() =>
            logoutMutation.mutate(undefined, {
              onSuccess: () => toast.success('Sesión cerrada.'),
              onError: () => toast.error('No se pudo cerrar la sesión.'),
            })
          }
        />
      }
      breadcrumbs={<BackofficeBreadcrumbs />}
    >
      <Outlet />
    </AppShell>
  )
}
