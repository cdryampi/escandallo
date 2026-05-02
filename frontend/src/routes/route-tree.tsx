import { Outlet, createRootRouteWithContext, createRoute } from '@tanstack/react-router'
import type { QueryClient } from '@tanstack/react-query'
import { buildAuthRoutes } from '@/routes/auth-routes'
import { buildPublicRoutes } from '@/routes/public-routes'
import { buildBackofficeRoutes } from '@/routes/backoffice-routes'
import { PublicLayout } from '@/layouts/public-layout'
import { PublicCmsPage } from '@/features/public-site/pages/public-cms-page'

interface RouterContext {
  queryClient: QueryClient
}

const RootComponent = () => <Outlet />

const NotFoundComponent = () => (
  <div className="flex min-h-screen items-center justify-center bg-background px-6">
    <div className="max-w-md text-center space-y-6">
      <p className="ui-kicker">Página no encontrada</p>
      <h1 className="type-display-md text-foreground">
        Esta página no existe.
      </h1>
      <p className="type-body-lg text-muted-foreground">
        Quizás el enlace ha cambiado o la dirección no es correcta.
        Puede volver al inicio o consultar nuestra carta.
      </p>
      <div className="flex flex-wrap justify-center gap-4 pt-2">
        <a
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-brand px-6 py-3 type-label-md text-white transition-all hover:bg-brand-strong"
        >
          Volver al inicio
        </a>
        <a
          href="/carta"
          className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 type-label-md text-foreground transition-all hover:border-brand hover:text-brand"
        >
          Ver la carta
        </a>
      </div>
    </div>
  </div>
)

const rootRoute = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
})

const backofficeRoutes = buildBackofficeRoutes(rootRoute)
const authRoutes = buildAuthRoutes(rootRoute)
const publicRoutes = buildPublicRoutes(rootRoute)

// Explicit layout group for public catch-all CMS pages
// This MUST be last to avoid intercepting more specific routes
const cmsPublicSplatLayout = createRoute({
  getParentRoute: () => rootRoute,
  id: 'cms-public-splat-layout',
  component: PublicLayout,
})

const cmsPublicSplatRoute = createRoute({
  getParentRoute: () => cmsPublicSplatLayout,
  path: '$',
  component: PublicCmsPage,
})

export const routeTree = rootRoute.addChildren([
  backofficeRoutes,
  authRoutes,
  publicRoutes,
  cmsPublicSplatLayout.addChildren([cmsPublicSplatRoute]),
])
