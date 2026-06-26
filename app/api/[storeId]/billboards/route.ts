import { NextResponse } from "next/server"

import { BillboardSchema } from "@/schemas"
import { verifyStoreOwner } from "@/lib/verify-store-owner"
import { API_ERRORS, errorResponse } from "@/lib/api-errors"
import { createBillboard, listBillboards } from "@/lib/services/billboard-service"

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const auth = await verifyStoreOwner(params.storeId)
    if ("error" in auth) return auth.error

    const parsed = BillboardSchema.safeParse(await req.json())
    if (!parsed.success) {
      return errorResponse(parsed.error.issues[0].message, 400)
    }

    const billboard = await createBillboard(params.storeId, parsed.data)
    return NextResponse.json(billboard)
  } catch (error) {
    console.log("[BILLBOARDS_POST]", error)
    return errorResponse(API_ERRORS.INTERNAL, 500)
  }
}

export async function GET(
  _req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const billboards = await listBillboards(params.storeId)
    return NextResponse.json(billboards)
  } catch (error) {
    console.log("[BILLBOARDS_GET]", error)
    return errorResponse(API_ERRORS.INTERNAL, 500)
  }
}
