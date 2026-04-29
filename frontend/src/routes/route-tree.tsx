import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import type { QueryClient } from '@tanstack/react-query'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { buildAuthRoutes } from '@/routes/auth-routes'
import { buildPublicRoutes } from '@/routes/public-routes'
import { buildBackofficeRoutes } from '@/routes/backoffice-routes'

interface RouterContext {
  queryClient: QueryClient
}

const RootComponent = () => <Outlet />

const NotFoundComponent = () => (
  <div className="flex min-h-screen items-center justify-center bg-background px-6">
    <Card className="max-w-lg">
      <CardHeader>
        <CardTitle>Ruta no encontrada</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="type-body-sm text-muted-foreground">
          La navegación existe, pero esta URL no forma parte de la arquitectura definida.
        </p>
      </CardContent>
    </Card>
  </div>
)

const rootRoute = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
})

const publicRoutes = buildPublicRoutes(rootRoute)
const authRoutes = buildAuthRoutes(rootRoute)
const backofficeRoutes = buildBackofficeRoutes(rootRoute)

export const routeTree = rootRoute.addChildren([publicRoutes, authRoutes, backofficeRoutes])
