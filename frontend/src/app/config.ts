const getEnv = (key: string, fallback: string) => {
  const value = import.meta.env[key]

  return typeof value === 'string' && value.length > 0 ? value : fallback
}

const localAliases = new Set(['localhost', '127.0.0.1'])

export const normalizeLocalDevUrl = (value: string, browserHost = typeof window === 'undefined' ? null : window.location.hostname) => {
  if (browserHost == null) {
    return value
  }

  if (!localAliases.has(browserHost)) {
    return value
  }

  const url = new URL(value)

  if (!localAliases.has(url.hostname) || url.hostname === browserHost) {
    return value
  }

  url.hostname = browserHost

  return url.toString()
}

const buildBackendUrl = (path: string, browserHost = typeof window === 'undefined' ? null : window.location.hostname) => {
  const csrfUrl = normalizeLocalDevUrl(getEnv('VITE_SANCTUM_CSRF_URL', 'http://localhost:8080/sanctum/csrf-cookie'), browserHost)
  const backendOrigin = new URL(csrfUrl).origin

  return new URL(path, `${backendOrigin}/`).toString()
}

export const buildAppConfig = (browserHost = typeof window === 'undefined' ? null : window.location.hostname) => ({
  appName: getEnv('VITE_APP_NAME', 'Restaurante'),
  apiBaseUrl: normalizeLocalDevUrl(getEnv('VITE_API_BASE_URL', 'http://localhost:8080/api/v1'), browserHost),
  sanctumCsrfUrl: normalizeLocalDevUrl(getEnv('VITE_SANCTUM_CSRF_URL', 'http://localhost:8080/sanctum/csrf-cookie'), browserHost),
  loginUrl: buildBackendUrl('/login', browserHost),
  logoutUrl: buildBackendUrl('/logout', browserHost),
  forgotPasswordUrl: buildBackendUrl('/forgot-password', browserHost),
  resetPasswordUrl: buildBackendUrl('/reset-password', browserHost),
}) as const

export const appConfig = buildAppConfig()
