import { NextResponse } from "next/server"

import { ProductSchema } from "@/schemas"
import { verifyStoreOwner } from "@/lib/verify-store-owner"
import { API_ERRORS, errorResponse } from "@/lib/api-errors"
import {
  getProduct,
  updateProduct,
  deleteProduct,
} from "@/lib/services/product-service"

export async function GET(
  _req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    if (!params.productId) {
      return errorResponse(API_ERRORS.idRequired("Product"), 400)
    }

    const product = await getProduct(params.productId)
    return NextResponse.json(product)
  } catch (error) {
    console.error("[PRODUCT_GET]", error)
    return errorResponse(API_ERRORS.INTERNAL, 500)
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const auth = await verifyStoreOwner(params.storeId)
    if ("error" in auth) return auth.error

    if (!params.productId) {
      return errorResponse(API_ERRORS.idRequired("Product"), 400)
    }

    const parsed = ProductSchema.safeParse(await req.json())
    if (!parsed.success) {
      return errorResponse(parsed.error.issues[0].message, 400)
    }

    const product = await updateProduct(params.productId, parsed.data)
    return NextResponse.json(product)
  } catch (error) {
    console.error("[PRODUCT_PATCH]", error)
    return errorResponse(API_ERRORS.INTERNAL, 500)
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const auth = await verifyStoreOwner(params.storeId)
    if ("error" in auth) return auth.error

    if (!params.productId) {
      return errorResponse(API_ERRORS.idRequired("Product"), 400)
    }

    const product = await deleteProduct(params.productId)
    return NextResponse.json(product)
  } catch (error) {
    console.error("[PRODUCT_DELETE]", error)
    return errorResponse(API_ERRORS.INTERNAL, 500)
  }
}
