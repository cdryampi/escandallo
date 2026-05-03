import type { HTMLAttributes, TableHTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

export const TableContainer = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('overflow-x-auto rounded-md border border-border bg-surface-elevated shadow-soft', className)} {...props} />
)

export const Table = ({ className, ...props }: TableHTMLAttributes<HTMLTableElement>) => (
  <table className={cn('min-w-full divide-y divide-border/60 text-left', className)} {...props} />
)

export const TableHeadCell = ({ className, ...props }: ThHTMLAttributes<HTMLTableCellElement>) => (
  <th className={cn('bg-surface/40 px-4 py-3 type-label-md text-brand-strong/60 font-semibold border-b border-border/60 tracking-wider', className)} {...props} />
)

export const TableCell = ({ className, ...props }: TdHTMLAttributes<HTMLTableCellElement>) => (
  <td className={cn('px-4 py-3 type-body-md text-foreground border-b border-border/40 transition-colors', className)} {...props} />
)

export const TableRow = ({ className, ...props }: HTMLAttributes<HTMLTableRowElement>) => (
  <tr className={cn('hover:bg-surface/20 transition-colors group', className)} {...props} />
)

export const TableCellNumeric = ({ className, ...props }: TdHTMLAttributes<HTMLTableCellElement>) => (
  <td className={cn('px-4 py-3 type-tabular text-right text-foreground border-b border-border/40 tabular-nums', className)} {...props} />
)
