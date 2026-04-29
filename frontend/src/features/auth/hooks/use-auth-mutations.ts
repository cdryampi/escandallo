import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authApi } from '@/features/auth/api/auth.api'
import type {
  ForgotPasswordRequest,
  LoginRequest,
  ResetPasswordRequest,
} from '@/features/auth/types/auth.types'
import { currentUserQueryKey } from '@/features/auth/hooks/use-current-user-query'

export const useLoginMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: LoginRequest) => authApi.login(payload),
    onSuccess: (user) => {
      queryClient.setQueryData(currentUserQueryKey, user)
    },
  })
}

export const useLogoutMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: authApi.logout,
    onSettled: () => {
      queryClient.setQueryData(currentUserQueryKey, null)
      void queryClient.invalidateQueries({ queryKey: currentUserQueryKey })
    },
  })
}

export const useForgotPasswordMutation = () =>
  useMutation({
    mutationFn: (payload: ForgotPasswordRequest) => authApi.forgotPassword(payload),
  })

export const useResetPasswordMutation = () =>
  useMutation({
    mutationFn: (payload: ResetPasswordRequest) => authApi.resetPassword(payload),
  })
