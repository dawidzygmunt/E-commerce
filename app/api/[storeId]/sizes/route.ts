import { NextResponse } from "next/server"

import { SizeSchema } from "@/schemas"
import { verifyStoreOwner } from "@/lib/verify-store-owner"
import { API_ERRORS, errorResponse } from "@/lib/api-errors"
import { createSize, listSizes } from "@/lib/services/size-service"

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const auth = await verifyStoreOwner(params.storeId)
    if ("error" in auth) return auth.error

    const parsed = SizeSchema.safeParse(await req.json())
    if (!parsed.success) {
      return errorResponse(parsed.error.issues[0].message, 400)
    }

    const size = await createSize(params.storeId, parsed.data)
    return NextResponse.json(size)
  } catch (error) {
    console.log("[SIZES_POST]", error)
    return errorResponse(API_ERRORS.INTERNAL, 500)
  }
}

export async function GET(
  _req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const sizes = await listSizes(params.storeId)
    return NextResponse.json(sizes)
  } catch (error) {
    console.log("[SIZES_GET]", error)
    return errorResponse(API_ERRORS.INTERNAL, 500)
  }
}
