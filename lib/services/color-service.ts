import prismadb from "@/lib/prismadb"
import type { z } from "zod"
import type { ColorSchema } from "@/schemas"

type ColorInput = z.infer<typeof ColorSchema>

export function createColor(storeId: string, data: ColorInput) {
  return prismadb.color.create({ data: { ...data, storeId } })
}

export function updateColor(colorId: string, data: ColorInput) {
  return prismadb.color.updateMany({
    where: { id: colorId },
    data,
  })
}

export function deleteColor(colorId: string) {
  return prismadb.color.deleteMany({ where: { id: colorId } })
}

export function getColor(colorId: string) {
  return prismadb.color.findUnique({ where: { id: colorId } })
}

export function listColors(storeId: string) {
  return prismadb.color.findMany({
    where: { storeId },
    orderBy: { createdAt: "desc" },
  })
}
