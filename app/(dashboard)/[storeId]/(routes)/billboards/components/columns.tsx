"use client"

import { ColumnDef } from "@tanstack/react-table"
import { EntityCellAction } from "@/components/ui/entity-cell-action"

export type BillboardColumn = {
  id: string
  label: string
  createdAt: string
}

export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: "label",
    header: "Label",
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
        entityName="billboards"
        entityLabel="Billboard"
        deleteErrorMessage="Make sure you removed all categories using this billboard first"
      />
    ),
  },
]
