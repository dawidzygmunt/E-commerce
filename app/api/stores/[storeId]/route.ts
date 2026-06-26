import { NextResponse } from "next/server"

import { auth } from "@/auth"
import { StoreSchema } from "@/schemas"
import { API_ERRORS, errorResponse } from "@/lib/api-errors"
import { updateStore, deleteStore } from "@/lib/services/store-service"

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const session = await auth()
    const userId = session?.user?.id

    if (!userId) {
      return errorResponse(API_ERRORS.UNAUTHENTICATED, 401)
    }

    if (!params.storeId) {
      return errorResponse(API_ERRORS.STORE_ID_REQUIRED, 400)
    }

    const parsed = StoreSchema.safeParse(await req.json())
    if (!parsed.success) {
      return errorResponse(parsed.error.issues[0].message, 400)
    }

    const store = await updateStore(params.storeId, userId, parsed.data)
    return NextResponse.json(store)
  } catch (error) {
    console.error("[STORE_PATCH]", error)
    return errorResponse(API_ERRORS.INTERNAL, 500)
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const session = await auth()
    const userId = session?.user?.id

    if (!userId) {
      return errorResponse(API_ERRORS.UNAUTHENTICATED, 401)
    }

    if (!params.storeId) {
      return errorResponse(API_ERRORS.STORE_ID_REQUIRED, 400)
    }

    const store = await deleteStore(params.storeId, userId)
    return NextResponse.json(store)
  } catch (error) {
    console.error("[STORE_DELETE]", error)
    return errorResponse(API_ERRORS.INTERNAL, 500)
  }
}
