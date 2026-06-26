import { NextResponse } from "next/server"

import { CategorySchema } from "@/schemas"
import { verifyStoreOwner } from "@/lib/verify-store-owner"
import { API_ERRORS, errorResponse } from "@/lib/api-errors"
import {
  getCategory,
  updateCategory,
  deleteCategory,
} from "@/lib/services/category-service"

export async function GET(
  _req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    if (!params.categoryId) {
      return errorResponse(API_ERRORS.idRequired("Category"), 400)
    }

    const category = await getCategory(params.categoryId)
    return NextResponse.json(category)
  } catch (error) {
    console.log("[CATEGORY_GET]", error)
    return errorResponse(API_ERRORS.INTERNAL, 500)
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const auth = await verifyStoreOwner(params.storeId)
    if ("error" in auth) return auth.error

    if (!params.categoryId) {
      return errorResponse(API_ERRORS.idRequired("Category"), 400)
    }

    const parsed = CategorySchema.safeParse(await req.json())
    if (!parsed.success) {
      return errorResponse(parsed.error.issues[0].message, 400)
    }

    const category = await updateCategory(params.categoryId, parsed.data)
    return NextResponse.json(category)
  } catch (error) {
    console.log("[CATEGORY_PATCH]", error)
    return errorResponse(API_ERRORS.INTERNAL, 500)
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const auth = await verifyStoreOwner(params.storeId)
    if ("error" in auth) return auth.error

    if (!params.categoryId) {
      return errorResponse(API_ERRORS.idRequired("Category"), 400)
    }

    const category = await deleteCategory(params.categoryId)
    return NextResponse.json(category)
  } catch (error) {
    console.log("[CATEGORY_DELETE]", error)
    return errorResponse(API_ERRORS.INTERNAL, 500)
  }
}
