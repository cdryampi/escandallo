import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { DataTable } from '@/components/data-display/data-table'
import { ingredientColumns } from '@/features/ingredients/components/table/ingredient-columns'
import type { Ingredient } from '@/features/ingredients/types/ingredient.types'

interface IngredientTableProps {
  rows: Ingredient[]
}

export const IngredientTable = ({ rows }: IngredientTableProps) => {
  const table = useReactTable({
    data: rows,
    columns: ingredientColumns,
    getCoreRowModel: getCoreRowModel(),
  })

  return <DataTable table={table} />
}
