import { UnauthorizedError } from '@/api/api-error'
import { apiClient, ensureCsrfCookie } from '@/api/http-client'
import { appConfig } from '@/app/config'
import type { CurrentUser, ForgotPasswordRequest, LoginRequest, ResetPasswordRequest } from '@/features/auth/types/auth.types'

const normalizeCurrentUser = (user: CurrentUser): CurrentUser => ({
  ...user,
  permissions: user.permissions ?? [],
  role: user.role ?? null,
})

export const authApi = {
  async getCurrentUser() {
    try {
      const user = await apiClient.get<CurrentUser>('user')
      return normalizeCurrentUser(user)
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        return null
      }

      throw error
    }
  },
  async login(payload: LoginRequest) {
    await ensureCsrfCookie()
    await apiClient.post(appConfig.loginUrl, payload)
    const user = await apiClient.get<CurrentUser>('user')

    return normalizeCurrentUser(user)
  },
  async logout() {
    await apiClient.post(appConfig.logoutUrl)
  },
  async forgotPassword(payload: ForgotPasswordRequest) {
    return apiClient.post<{ message?: string }>(appConfig.forgotPasswordUrl, payload)
  },
  async resetPassword(payload: ResetPasswordRequest) {
    return apiClient.post<{ message?: string }>(appConfig.resetPasswordUrl, payload)
  },
}
