import prismadb from "@/lib/prismadb"
import type { z } from "zod"
import type { BillboardSchema } from "@/schemas"

type BillboardInput = z.infer<typeof BillboardSchema>

export function createBillboard(storeId: string, data: BillboardInput) {
  return prismadb.billboard.create({ data: { ...data, storeId } })
}

export function updateBillboard(billboardId: string, data: BillboardInput) {
  return prismadb.billboard.updateMany({
    where: { id: billboardId },
    data,
  })
}

export function deleteBillboard(billboardId: string) {
  return prismadb.billboard.deleteMany({ where: { id: billboardId } })
}

export function getBillboard(billboardId: string) {
  return prismadb.billboard.findUnique({ where: { id: billboardId } })
}

export function listBillboards(storeId: string) {
  return prismadb.billboard.findMany({
    where: { storeId },
    orderBy: { createdAt: "desc" },
  })
}
