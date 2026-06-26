import { NextResponse } from "next/server"

import prismadb from "@/lib/prismadb"
import { auth } from "@/auth"
import { API_ERRORS, errorResponse } from "@/lib/api-errors"

type VerifyResult = { error: NextResponse } | { userId: string }

export async function verifyStoreOwner(storeId: string): Promise<VerifyResult> {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) {
    return { error: errorResponse(API_ERRORS.UNAUTHENTICATED, 401) }
  }

  if (!storeId) {
    return { error: errorResponse(API_ERRORS.STORE_ID_REQUIRED, 400) }
  }

  const storeByUserId = await prismadb.store.findFirst({
    where: { id: storeId, userId },
  })

  if (!storeByUserId) {
    return { error: errorResponse(API_ERRORS.UNAUTHORIZED, 403) }
  }

  return { userId }
}
