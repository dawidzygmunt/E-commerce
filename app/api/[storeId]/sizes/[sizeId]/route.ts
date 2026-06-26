import { NextResponse } from "next/server"

import { SizeSchema } from "@/schemas"
import { verifyStoreOwner } from "@/lib/verify-store-owner"
import { API_ERRORS, errorResponse } from "@/lib/api-errors"
import { getSize, updateSize, deleteSize } from "@/lib/services/size-service"

export async function GET(
  _req: Request,
  { params }: { params: { sizeId: string } }
) {
  try {
    if (!params.sizeId) {
      return errorResponse(API_ERRORS.idRequired("Size"), 400)
    }

    const size = await getSize(params.sizeId)
    return NextResponse.json(size)
  } catch (error) {
    console.log("[SIZE_GET]", error)
    return errorResponse(API_ERRORS.INTERNAL, 500)
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } }
) {
  try {
    const auth = await verifyStoreOwner(params.storeId)
    if ("error" in auth) return auth.error

    if (!params.sizeId) {
      return errorResponse(API_ERRORS.idRequired("Size"), 400)
    }

    const parsed = SizeSchema.safeParse(await req.json())
    if (!parsed.success) {
      return errorResponse(parsed.error.issues[0].message, 400)
    }

    const size = await updateSize(params.sizeId, parsed.data)
    return NextResponse.json(size)
  } catch (error) {
    console.log("[SIZE_PATCH]", error)
    return errorResponse(API_ERRORS.INTERNAL, 500)
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { storeId: string; sizeId: string } }
) {
  try {
    const auth = await verifyStoreOwner(params.storeId)
    if ("error" in auth) return auth.error

    if (!params.sizeId) {
      return errorResponse(API_ERRORS.idRequired("Size"), 400)
    }

    const size = await deleteSize(params.sizeId)
    return NextResponse.json(size)
  } catch (error) {
    console.log("[SIZE_DELETE]", error)
    return errorResponse(API_ERRORS.INTERNAL, 500)
  }
}
