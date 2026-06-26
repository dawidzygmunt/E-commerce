"use client"

import { ColumnDef } from "@tanstack/react-table"
import { EntityCellAction } from "@/components/ui/entity-cell-action"

export type ColorColumn = {
  id: string
  name: string
  value: string
  createdAt: string
}

export const columns: ColumnDef<ColorColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.value}
        <div 
          className="h-6 w-6 rounded-full border" 
          style={{backgroundColor: row.original.value}} 
        />
      </div>
    )
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <EntityCellAction
        id={row.original.id}
        entityName="colors"
        entityLabel="Color"
        deleteErrorMessage="Make sure you removed all products using this color first"
      />
    ),
  }
]
