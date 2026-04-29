export type Id = number | string

export interface PermissionUser {
  id: number
  name: string
  email: string
  role?: string | null
  permissions?: string[]
}

export interface OptionItem<TValue extends string | number = string> {
  label: string
  value: TValue
}

export interface ListSearch {
  page: number
  perPage: number
  search: string
  sort: string
  direction: 'asc' | 'desc'
  status?: string
  category?: string
}
