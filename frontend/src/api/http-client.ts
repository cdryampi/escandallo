import axios, { AxiosError, type AxiosRequestConfig } from 'axios'
import { ApiError, ForbiddenError, UnauthorizedError, ValidationError } from '@/api/api-error'
import type { ValidationErrors } from '@/api/api-types'
import { appConfig } from '@/app/config'

const headers = {
  Accept: 'application/json',
  'X-Requested-With': 'XMLHttpRequest',
}

const instance = axios.create({
  baseURL: appConfig.apiBaseUrl,
  withCredentials: true,
  headers,
})

const normalizeError = (error: unknown) => {
  if (!(error instanceof AxiosError)) {
    return new ApiError('Unexpected client error.', 500)
  }

  const status = error.response?.status ?? 500
  const message = error.response?.data?.message ?? error.message ?? 'Unexpected API error.'
  const errors = error.response?.data?.errors as ValidationErrors | undefined

  if (status === 401) {
    return new UnauthorizedError(message)
  }

  if (status === 403) {
    return new ForbiddenError(message)
  }

  if (status === 422) {
    return new ValidationError(message, errors)
  }

  return new ApiError(message, status, errors)
}

instance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(normalizeError(error)),
)

export const ensureCsrfCookie = async () => {
  await axios.get(appConfig.sanctumCsrfUrl, {
    withCredentials: true,
    headers,
  })
}

const unwrap = <T>(promise: Promise<{ data: T }>) => promise.then((response) => response.data)

export const apiClient = {
  get: <T>(url: string, config?: AxiosRequestConfig) => unwrap<T>(instance.get(url, config)),
  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    unwrap<T>(instance.post(url, data, config)),
  put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    unwrap<T>(instance.put(url, data, config)),
  patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    unwrap<T>(instance.patch(url, data, config)),
  delete: <T>(url: string, config?: AxiosRequestConfig) => unwrap<T>(instance.delete(url, config)),
}
