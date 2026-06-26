import { NextResponse } from "next/server"

import { CategorySchema } from "@/schemas"
import { verifyStoreOwner } from "@/lib/verify-store-owner"
import { API_ERRORS, errorResponse } from "@/lib/api-errors"
import { createCategory, listCategories } from "@/lib/services/category-service"

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const auth = await verifyStoreOwner(params.storeId)
    if ("error" in auth) return auth.error

    const parsed = CategorySchema.safeParse(await req.json())
    if (!parsed.success) {
      return errorResponse(parsed.error.issues[0].message, 400)
    }

    const category = await createCategory(params.storeId, parsed.data)
    return NextResponse.json(category)
  } catch (error) {
    console.log("[CATEGORIES_POST]", error)
    return errorResponse(API_ERRORS.INTERNAL, 500)
  }
}

export async function GET(
  _req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const categories = await listCategories(params.storeId)
    return NextResponse.json(categories)
  } catch (error) {
    console.log("[CATEGORIES_GET]", error)
    return errorResponse(API_ERRORS.INTERNAL, 500)
  }
}
