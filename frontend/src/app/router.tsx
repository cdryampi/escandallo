import { createRouter } from '@tanstack/react-router'
import { queryClient } from '@/app/query-client'
import { routeTree } from '@/routes/route-tree'

export const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultPreload: 'intent',
  defaultPendingMinMs: 120,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
