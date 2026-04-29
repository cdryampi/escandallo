import { useQuery } from '@tanstack/react-query'
import { authApi } from '@/features/auth/api/auth.api'

export const currentUserQueryKey = ['auth', 'current-user'] as const

export const useCurrentUserQuery = () =>
  useQuery({
    queryKey: currentUserQueryKey,
    queryFn: authApi.getCurrentUser,
    staleTime: 5 * 60 * 1000,
  })
