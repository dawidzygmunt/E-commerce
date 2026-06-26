import { NextResponse } from "next/server"

import { auth } from "@/auth"
import { StoreSchema } from "@/schemas"
import { API_ERRORS, errorResponse } from "@/lib/api-errors"
import { createStore } from "@/lib/services/store-service"

export async function POST(req: Request) {
  try {
    const session = await auth()
    const userId = session?.user?.id

    if (!userId) {
      return errorResponse(API_ERRORS.UNAUTHENTICATED, 401)
    }

    const parsed = StoreSchema.safeParse(await req.json())
    if (!parsed.success) {
      return errorResponse(parsed.error.issues[0].message, 400)
    }

    const store = await createStore(userId, parsed.data)
    return NextResponse.json(store)
  } catch (error) {
    console.error("[STORES_POST]", error)
    return errorResponse(API_ERRORS.INTERNAL, 500)
  }
}
