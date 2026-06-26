import prismadb from "@/lib/prismadb"
import type { z } from "zod"
import type { ProductSchema } from "@/schemas"

type ProductInput = z.infer<typeof ProductSchema>

export function createProduct(storeId: string, data: ProductInput) {
  const { images, ...rest } = data
  return prismadb.product.create({
    data: {
      ...rest,
      storeId,
      images: { createMany: { data: images } },
    },
  })
}

export async function updateProduct(productId: string, data: ProductInput) {
  const { images, ...rest } = data
  await prismadb.product.update({
    where: { id: productId },
    data: { ...rest, images: { deleteMany: {} } },
  })
  return prismadb.product.update({
    where: { id: productId },
    data: { images: { createMany: { data: images } } },
  })
}

export function deleteProduct(productId: string) {
  return prismadb.product.deleteMany({ where: { id: productId } })
}

export function getProduct(productId: string) {
  return prismadb.product.findUnique({
    where: { id: productId },
    include: { images: true, category: true, size: true, color: true },
  })
}

export function listProducts(
  storeId: string,
  filters: {
    categoryId?: string
    colorId?: string
    sizeId?: string
    isFeatured?: boolean
  }
) {
  return prismadb.product.findMany({
    where: {
      storeId,
      ...filters,
      isArchived: false,
    },
    include: { images: true, category: true, color: true, size: true },
    orderBy: { createdAt: "desc" },
  })
}
