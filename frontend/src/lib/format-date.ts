import { format } from 'date-fns'

export const formatDate = (value: string | Date, pattern = 'dd/MM/yyyy') =>
  format(typeof value === 'string' ? new Date(value) : value, pattern)
