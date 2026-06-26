import prismadb from "@/lib/prismadb"
import type { z } from "zod"
import type { SizeSchema } from "@/schemas"

type SizeInput = z.infer<typeof SizeSchema>

export function createSize(storeId: string, data: SizeInput) {
  return prismadb.size.create({ data: { ...data, storeId } })
}

export function updateSize(sizeId: string, data: SizeInput) {
  return prismadb.size.updateMany({
    where: { id: sizeId },
    data,
  })
}

export function deleteSize(sizeId: string) {
  return prismadb.size.deleteMany({ where: { id: sizeId } })
}

export function getSize(sizeId: string) {
  return prismadb.size.findUnique({ where: { id: sizeId } })
}

export function listSizes(storeId: string) {
  return prismadb.size.findMany({
    where: { storeId },
    orderBy: { createdAt: "desc" },
  })
}
