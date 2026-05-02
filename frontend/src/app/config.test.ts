import { describe, expect, it } from 'vitest'
import { buildAppConfig, normalizeLocalDevUrl } from '@/app/config'

describe('normalizeLocalDevUrl', () => {
  it('keeps configured URL when browser host already matches', () => {
    expect(normalizeLocalDevUrl('http://127.0.0.1:8080/api/v1', '127.0.0.1')).toBe('http://127.0.0.1:8080/api/v1')
  })

  it('swaps local alias to browser host', () => {
    expect(normalizeLocalDevUrl('http://127.0.0.1:8080/api/v1', 'localhost')).toBe('http://localhost:8080/api/v1')
  })

  it('does not rewrite non-local hosts', () => {
    expect(normalizeLocalDevUrl('https://api.example.com/api/v1', 'localhost')).toBe('https://api.example.com/api/v1')
  })
})

describe('buildAppConfig', () => {
  it('builds same-host local API URLs for localhost browser sessions', () => {
    const config = buildAppConfig('localhost')

    expect(config.apiBaseUrl).toBe('http://localhost:8080/api/v1')
    expect(config.sanctumCsrfUrl).toBe('http://localhost:8080/sanctum/csrf-cookie')
    expect(config.loginUrl).toBe('http://localhost:8080/login')
    expect(config.logoutUrl).toBe('http://localhost:8080/logout')
  })
})
