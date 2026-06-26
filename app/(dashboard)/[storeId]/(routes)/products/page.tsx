import { format } from "date-fns"

import prismadb from '@/lib/prismadb'
import { EntityClient } from '@/components/ui/entity-client'
import { ProductColumn, columns } from './components/columns'
import { formatter } from "@/lib/utils"

const ProductsPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      category: true,
      size: true,
      color: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    price: formatter.format(item.price.toNumber()),
    category: item.category.name,
    size: item.category.name,
    color: item.color.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy")
  }));

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <EntityClient
          data={formattedProducts}
          columns={columns}
          entityName="products"
          entityIdName="productId"
          title="Products"
          description="Manage products for your store"
        />
      </div>
    </div>
  )
}

export default ProductsPage
