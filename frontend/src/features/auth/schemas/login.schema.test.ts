import { describe, expect, it } from 'vitest'
import { loginSchema, resetPasswordSchema } from '@/features/auth/schemas/login.schema'

describe('auth schemas', () => {
  it('validates login payload', () => {
    const result = loginSchema.safeParse({
      email: 'chef@example.com',
      password: 'secret123',
    })

    expect(result.success).toBe(true)
  })

  it('rejects reset payload when passwords do not match', () => {
    const result = resetPasswordSchema.safeParse({
      email: 'chef@example.com',
      password: 'secret123',
      password_confirmation: 'secret321',
      token: 'abc',
    })

    expect(result.success).toBe(false)
  })
})
