import type { PermissionUser } from '@/types/common'

export const can = (user: PermissionUser | null | undefined, permission: string) => {
  if (!user) {
    return false
  }

  if (user.role === 'admin') {
    return true
  }

  return user.permissions?.includes(permission) ?? false
}

export const hasAnyPermission = (user: PermissionUser | null | undefined, permissions: string[]) =>
  permissions.some((permission) => can(user, permission))
