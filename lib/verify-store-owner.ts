import { NextResponse } from "next/server"

import prismadb from "@/lib/prismadb"
import { auth } from "@/auth"

type VerifyResult = { error: NextResponse } | { userId: string }

export async function verifyStoreOwner(storeId: string): Promise<VerifyResult> {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) {
    return { error: new NextResponse("Unauthenticated", { status: 401 }) }
  }

  if (!storeId) {
    return { error: new NextResponse("Store id is required", { status: 400 }) }
  }

  const storeByUserId = await prismadb.store.findFirst({
    where: { id: storeId, userId },
  })

  if (!storeByUserId) {
    return { error: new NextResponse("Unauthorized", { status: 403 }) }
  }

  return { userId }
}
