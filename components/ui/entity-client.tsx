"use client"

import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { ColumnDef } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"

interface EntityClientProps<TData> {
  data: TData[]
  columns: ColumnDef<TData, any>[]
  entityName: string
  entityIdName: string
  title: string
  description: string
  searchKey?: string
}

export function EntityClient<TData>({
  data,
  columns,
  entityName,
  entityIdName,
  title,
  description,
  searchKey = "name",
}: EntityClientProps<TData>) {
  const router = useRouter()
  const params = useParams()

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`${title} (${data.length})`}
          description={description}
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/${entityName}/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} serachkey={searchKey} />
      <Heading title="API" description={`Api calls for ${title}`} />
      <Separator />
      <ApiList entityName={entityName} entityIdName={entityIdName} />
    </>
  )
}
