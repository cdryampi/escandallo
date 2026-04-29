import { flexRender, type RowData, type Table as TanstackTable } from '@tanstack/react-table'
import { cn } from '@/lib/cn'
import { Table, TableCell, TableContainer, TableHeadCell } from '@/components/ui/table'

interface DataTableProps<TData extends RowData> {
  table: TanstackTable<TData>
  compact?: boolean
  stickyHeader?: boolean
}

export const DataTable = <TData extends RowData>({
  table,
  compact = true,
  stickyHeader = true,
}: DataTableProps<TData>) => (
  <TableContainer>
    <Table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHeadCell key={header.id} className={cn(stickyHeader && 'sticky top-0 z-10', compact && 'py-2')}>
                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
              </TableHeadCell>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className="divide-y divide-border">
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className="transition-colors hover:bg-table-hover">
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id} className={cn(compact && 'py-2')}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  </TableContainer>
)
