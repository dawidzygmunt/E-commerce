"use client"

import { ColumnDef } from "@tanstack/react-table"
import { EntityCellAction } from "@/components/ui/entity-cell-action"

export type SizeColumn = {
  id: string
  name: string
  value: string
  createdAt: string
}

export const columns: ColumnDef<SizeColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
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
        entityName="sizes"
        entityLabel="Size"
        deleteErrorMessage="Make sure you removed all products using this size first"
      />
    ),
  }
]
