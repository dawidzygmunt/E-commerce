"use client"

import { ColumnDef } from "@tanstack/react-table"
import { EntityCellAction } from "@/components/ui/entity-cell-action"

export type CategoryColumn = {
  id: string
  name: string
  billboardLabel: string
  createdAt: string
}

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "billboard",
    header: "Billboard",
    cell: ({ row }) => row.original.billboardLabel,
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
        entityName="categories"
        entityLabel="Category"
        deleteErrorMessage="Make sure you removed all products using this category first"
      />
    ),
  },
]
