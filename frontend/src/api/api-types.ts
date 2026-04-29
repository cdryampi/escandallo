export interface ApiResponse<T> {
  data: T
  message?: string
}

export interface PaginatedMeta {
  current_page: number
  per_page: number
  total: number
  last_page: number
}

export interface PaginatedLinks {
  first: string | null
  last: string | null
  prev: string | null
  next: string | null
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: PaginatedMeta
  links: PaginatedLinks
}

export interface ValidationErrors {
  [key: string]: string[]
}
