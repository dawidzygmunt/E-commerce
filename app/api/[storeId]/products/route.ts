import { NextResponse } from "next/server"

import { ProductSchema } from "@/schemas"
import { verifyStoreOwner } from "@/lib/verify-store-owner"
import { API_ERRORS, errorResponse } from "@/lib/api-errors"
import { createProduct, listProducts } from "@/lib/services/product-service"

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const auth = await verifyStoreOwner(params.storeId)
    if ("error" in auth) return auth.error

    const parsed = ProductSchema.safeParse(await req.json())
    if (!parsed.success) {
      return errorResponse(parsed.error.issues[0].message, 400)
    }

    const product = await createProduct(params.storeId, parsed.data)
    return NextResponse.json(product)
  } catch (error) {
    console.log("[PRODUCTS_POST]", error)
    return errorResponse(API_ERRORS.INTERNAL, 500)
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return errorResponse(API_ERRORS.STORE_ID_REQUIRED, 400)
    }

    const { searchParams } = new URL(req.url)
    const categoryId = searchParams.get("categoryId") || undefined
    const colorId = searchParams.get("colorId") || undefined
    const sizeId = searchParams.get("sizeId") || undefined
    const isFeatured = searchParams.get("isFeatured")

    const products = await listProducts(params.storeId, {
      categoryId,
      colorId,
      sizeId,
      isFeatured: isFeatured ? true : undefined,
    })

    return NextResponse.json(products)
  } catch (error) {
    console.log("[PRODUCTS_GET]", error)
    return errorResponse(API_ERRORS.INTERNAL, 500)
  }
}
