import { appConfig } from '@/app/config'

const backendOrigin = new URL(appConfig.apiBaseUrl).origin

export const resolveMediaUrl = (value?: string | null) => {
  if (typeof value !== 'string' || value.length === 0) {
    return null
  }

  if (/^https?:\/\//.test(value)) {
    return value
  }

  // Ensure absolute path from root
  const path = value.startsWith('/') ? value : `/${value}`

  return `${backendOrigin}${path}`
}
