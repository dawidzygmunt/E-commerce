import prismadb from "@/lib/prismadb"
import type { z } from "zod"
import type { StoreSchema } from "@/schemas"

type StoreInput = z.infer<typeof StoreSchema>

export function createStore(userId: string, data: StoreInput) {
  return prismadb.store.create({
    data: { name: data.name, userId },
  })
}

export function updateStore(storeId: string, userId: string, data: StoreInput) {
  return prismadb.store.updateMany({
    where: { id: storeId, userId },
    data: { name: data.name },
  })
}

export function deleteStore(storeId: string, userId: string) {
  return prismadb.store.deleteMany({
    where: { id: storeId, userId },
  })
}
