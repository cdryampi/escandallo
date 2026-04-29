import { createRoute } from '@tanstack/react-router'
import type { AnyRoute } from '@tanstack/react-router'
import { PublicLayout } from '@/layouts/public-layout'
import { ContactPage, HomePage, LegalPage, MenuPage, PrivacyPage } from '@/features/public-site'

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

  const menuRoute = createRoute({
    getParentRoute: () => publicLayoutRoute,
    path: '/carta',
    component: MenuPage,
  })

  const contactRoute = createRoute({
    getParentRoute: () => publicLayoutRoute,
    path: '/contacto',
    component: ContactPage,
  })

  const legalRoute = createRoute({
    getParentRoute: () => publicLayoutRoute,
    path: '/legal',
    component: LegalPage,
  })

  const privacyRoute = createRoute({
    getParentRoute: () => publicLayoutRoute,
    path: '/privacidad',
    component: PrivacyPage,
  })

  return publicLayoutRoute.addChildren([homeRoute, menuRoute, contactRoute, legalRoute, privacyRoute])
}
