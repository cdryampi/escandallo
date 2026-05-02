import { createRoute } from '@tanstack/react-router'
import type { AnyRoute } from '@tanstack/react-router'
import { lazyNamedRouteComponent } from '@/routes/lazy-route'

export const PublicLayout = lazyNamedRouteComponent(
  () => import('@/layouts/public-layout'),
  'PublicLayout',
  {
    title: 'Cargando sitio público',
    description: 'Preparando navegación, contenido y tipografía editorial.',
  },
)

const HomePage = lazyNamedRouteComponent(
  () => import('@/features/public-site/pages/home-page'),
  'HomePage',
  {
    title: 'Cargando portada',
    description: 'Montando experiencia principal del sitio público.',
  },
)

export const PublicCmsPage = lazyNamedRouteComponent(
  () => import('@/features/public-site/pages/public-cms-page'),
  'PublicCmsPage',
  {
    title: 'Cargando contenido',
    description: 'Preparando bloques editoriales de la página.',
  },
)

export const buildPublicRoutes = (rootRoute: AnyRoute) => {
  const publicLayoutRoute = createRoute({
    getParentRoute: () => rootRoute,
    id: 'public-layout',
    component: PublicLayout,
  })

  const homeRoute = createRoute({
    getParentRoute: () => publicLayoutRoute,
    path: '/',
    component: HomePage,
  })

  return publicLayoutRoute.addChildren([homeRoute])
}
