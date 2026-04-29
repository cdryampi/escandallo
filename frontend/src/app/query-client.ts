import { QueryClient } from '@tanstack/react-query'
import { UnauthorizedError } from '@/api/api-error'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      refetchOnWindowFocus: false,
      retry(failureCount, error) {
        if (error instanceof UnauthorizedError) {
          return false
        }

        return failureCount < 1
      },
    },
    mutations: {
      retry: false,
    },
  },
})
