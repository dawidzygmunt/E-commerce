import prismadb from "@/lib/prismadb"
import type { z } from "zod"
import type { CategorySchema } from "@/schemas"

type CategoryInput = z.infer<typeof CategorySchema>

export function createCategory(storeId: string, data: CategoryInput) {
  return prismadb.category.create({ data: { ...data, storeId } })
}

export function updateCategory(categoryId: string, data: CategoryInput) {
  return prismadb.category.updateMany({
    where: { id: categoryId },
    data,
  })
}

export function deleteCategory(categoryId: string) {
  return prismadb.category.deleteMany({ where: { id: categoryId } })
}

export function getCategory(categoryId: string) {
  return prismadb.category.findUnique({
    where: { id: categoryId },
    include: { billboard: true },
  })
}

export function listCategories(storeId: string) {
  return prismadb.category.findMany({
    where: { storeId },
    include: { billboard: true },
    orderBy: { createdAt: "desc" },
  })
}
