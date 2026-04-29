import type { ValidationErrors } from '@/api/api-types'

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly errors?: ValidationErrors,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message = 'Authentication required.') {
    super(message, 401)
    this.name = 'UnauthorizedError'
  }
}

export class ForbiddenError extends ApiError {
  constructor(message = 'You do not have permission to perform this action.') {
    super(message, 403)
    this.name = 'ForbiddenError'
  }
}

export class ValidationError extends ApiError {
  constructor(message = 'Validation failed.', errors?: ValidationErrors) {
    super(message, 422, errors)
    this.name = 'ValidationError'
  }
}

export const isApiError = (error: unknown): error is ApiError => error instanceof ApiError
