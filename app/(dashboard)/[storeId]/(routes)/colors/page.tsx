import { format } from "date-fns"

import { ColorsClient } from './components/client'
import prismadb from '@/lib/prismadb'
import { ColorColumn } from './components/columns'

const ColorPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  const sizes = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedColors: ColorColumn[] = sizes.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy")
  }));

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <ColorsClient data={formattedColors} />
      </div>

    </div>
  )
}

export default ColorPage
