import type { HTMLAttributes, TableHTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

export const TableContainer = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('overflow-auto rounded-[var(--ds-radius-lg)] border border-border bg-surface-raised', className)} {...props} />
)

export const Table = ({ className, ...props }: TableHTMLAttributes<HTMLTableElement>) => (
  <table className={cn('min-w-full divide-y divide-border text-left', className)} {...props} />
)

export const TableHeadCell = ({ className, ...props }: ThHTMLAttributes<HTMLTableCellElement>) => (
  <th className={cn('bg-surface-muted px-4 py-3 type-label-md text-muted-foreground', className)} {...props} />
)

export const TableCell = ({ className, ...props }: TdHTMLAttributes<HTMLTableCellElement>) => (
  <td className={cn('px-4 py-3 type-body-md text-foreground', className)} {...props} />
)
