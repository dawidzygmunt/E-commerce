import { NextResponse } from "next/server"

import { ColorSchema } from "@/schemas"
import { verifyStoreOwner } from "@/lib/verify-store-owner"
import { API_ERRORS, errorResponse } from "@/lib/api-errors"
import { createColor, listColors } from "@/lib/services/color-service"

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const auth = await verifyStoreOwner(params.storeId)
    if ("error" in auth) return auth.error

    const parsed = ColorSchema.safeParse(await req.json())
    if (!parsed.success) {
      return errorResponse(parsed.error.issues[0].message, 400)
    }

    const color = await createColor(params.storeId, parsed.data)
    return NextResponse.json(color)
  } catch (error) {
    console.error("[COLORS_POST]", error)
    return errorResponse(API_ERRORS.INTERNAL, 500)
  }
}

export async function GET(
  _req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const colors = await listColors(params.storeId)
    return NextResponse.json(colors)
  } catch (error) {
    console.error("[COLORS_GET]", error)
    return errorResponse(API_ERRORS.INTERNAL, 500)
  }
}
