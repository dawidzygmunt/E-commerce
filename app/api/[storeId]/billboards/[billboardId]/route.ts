import { NextResponse } from "next/server"

import { BillboardSchema } from "@/schemas"
import { verifyStoreOwner } from "@/lib/verify-store-owner"
import { API_ERRORS, errorResponse } from "@/lib/api-errors"
import {
  getBillboard,
  updateBillboard,
  deleteBillboard,
} from "@/lib/services/billboard-service"

export async function GET(
  _req: Request,
  { params }: { params: { billboardId: string } }
) {
  try {
    if (!params.billboardId) {
      return errorResponse(API_ERRORS.idRequired("Billboard"), 400)
    }

    const billboard = await getBillboard(params.billboardId)
    return NextResponse.json(billboard)
  } catch (error) {
    console.error("[BILLBOARD_GET]", error)
    return errorResponse(API_ERRORS.INTERNAL, 500)
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const auth = await verifyStoreOwner(params.storeId)
    if ("error" in auth) return auth.error

    if (!params.billboardId) {
      return errorResponse(API_ERRORS.idRequired("Billboard"), 400)
    }

    const parsed = BillboardSchema.safeParse(await req.json())
    if (!parsed.success) {
      return errorResponse(parsed.error.issues[0].message, 400)
    }

    const billboard = await updateBillboard(params.billboardId, parsed.data)
    return NextResponse.json(billboard)
  } catch (error) {
    console.error("[BILLBOARD_PATCH]", error)
    return errorResponse(API_ERRORS.INTERNAL, 500)
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const auth = await verifyStoreOwner(params.storeId)
    if ("error" in auth) return auth.error

    if (!params.billboardId) {
      return errorResponse(API_ERRORS.idRequired("Billboard"), 400)
    }

    const billboard = await deleteBillboard(params.billboardId)
    return NextResponse.json(billboard)
  } catch (error) {
    console.error("[BILLBOARD_DELETE]", error)
    return errorResponse(API_ERRORS.INTERNAL, 500)
  }
}
