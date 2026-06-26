import { NextResponse } from "next/server"

import { ColorSchema } from "@/schemas"
import { verifyStoreOwner } from "@/lib/verify-store-owner"
import { API_ERRORS, errorResponse } from "@/lib/api-errors"
import {
  getColor,
  updateColor,
  deleteColor,
} from "@/lib/services/color-service"

export async function GET(
  _req: Request,
  { params }: { params: { colorId: string } }
) {
  try {
    if (!params.colorId) {
      return errorResponse(API_ERRORS.idRequired("Color"), 400)
    }

    const color = await getColor(params.colorId)
    return NextResponse.json(color)
  } catch (error) {
    console.error("[COLOR_GET]", error)
    return errorResponse(API_ERRORS.INTERNAL, 500)
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
) {
  try {
    const auth = await verifyStoreOwner(params.storeId)
    if ("error" in auth) return auth.error

    if (!params.colorId) {
      return errorResponse(API_ERRORS.idRequired("Color"), 400)
    }

    const parsed = ColorSchema.safeParse(await req.json())
    if (!parsed.success) {
      return errorResponse(parsed.error.issues[0].message, 400)
    }

    const color = await updateColor(params.colorId, parsed.data)
    return NextResponse.json(color)
  } catch (error) {
    console.error("[COLOR_PATCH]", error)
    return errorResponse(API_ERRORS.INTERNAL, 500)
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { storeId: string; colorId: string } }
) {
  try {
    const auth = await verifyStoreOwner(params.storeId)
    if ("error" in auth) return auth.error

    if (!params.colorId) {
      return errorResponse(API_ERRORS.idRequired("Color"), 400)
    }

    const color = await deleteColor(params.colorId)
    return NextResponse.json(color)
  } catch (error) {
    console.error("[COLOR_DELETE]", error)
    return errorResponse(API_ERRORS.INTERNAL, 500)
  }
}
