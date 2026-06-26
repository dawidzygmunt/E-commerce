import { format } from "date-fns"

import prismadb from '@/lib/prismadb'
import { EntityClient } from '@/components/ui/entity-client'
import { ColorColumn, columns } from './components/columns'

const ColorPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedColors: ColorColumn[] = colors.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy")
  }));

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <EntityClient
          data={formattedColors}
          columns={columns}
          entityName="colors"
          entityIdName="colorId"
          title="Colors"
          description="Manage colors for your store"
        />
      </div>
    </div>
  )
}

export default ColorPage
