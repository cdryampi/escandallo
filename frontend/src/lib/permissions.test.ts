import { describe, expect, it } from 'vitest'
import { can, hasAnyPermission } from '@/lib/permissions'
import type { PermissionUser } from '@/types/common'

describe('permissions helpers', () => {
  const manager: PermissionUser = {
    id: 2,
    name: 'Manager',
    email: 'manager@example.com',
    role: 'manager',
    permissions: ['recipes.update', 'ingredients.view'],
  }

  const admin: PermissionUser = {
    id: 1,
    name: 'Admin',
    email: 'admin@example.com',
    role: 'admin',
    permissions: [],
  }

  it('grants admins every action in UI helpers', () => {
    expect(can(admin, 'reports.view')).toBe(true)
  })

  it('checks explicit permissions for non-admin users', () => {
    expect(can(manager, 'recipes.update')).toBe(true)
    expect(can(manager, 'users.delete')).toBe(false)
  })

  it('checks any permission across a list', () => {
    expect(hasAnyPermission(manager, ['users.delete', 'ingredients.view'])).toBe(true)
  })
})
