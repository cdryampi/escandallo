import { appConfig } from '@/app/config'

export const resolveMediaUrl = (value?: string | null) => {
  if (typeof value !== 'string' || value.trim().length === 0) {
    return null
  }

  const trimmedValue = value.trim()

  // Handle already absolute URLs
  if (/^https?:\/\//.test(trimmedValue)) {
    return trimmedValue
  }

  // Handle protocol-relative URLs
  if (trimmedValue.startsWith('//')) {
    const protocol = new URL(appConfig.apiBaseUrl).protocol
    return `${protocol}${trimmedValue}`
  }

  // Build backend origin dynamically to be safer
  const backendOrigin = new URL(appConfig.apiBaseUrl).origin

  // Ensure absolute path from root for the backend
  const path = trimmedValue.startsWith('/') ? trimmedValue : `/${trimmedValue}`

  // Ensure we don't have double slashes after the origin
  // (origin doesn't have trailing slash, path starts with /)
  return `${backendOrigin}${path}`
}
