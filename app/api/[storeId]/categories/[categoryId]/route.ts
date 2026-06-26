import { NextResponse } from "next/server"

import prismadb from "@/lib/prismadb"
import { CategorySchema } from "@/schemas"
import { verifyStoreOwner } from "@/lib/verify-store-owner"

export async function GET(
  _req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    if (!params.categoryId) {
      return new NextResponse("Category id is required", { status: 400 })
    }

    const category = await prismadb.category.findUnique({
      where: {
        id: params.categoryId,
      },
      include: {
        billboard: true,
      },
    })

    return NextResponse.json(category)
  } catch (error) {
    console.log("[CATEGORY_GET]" + error)
    return new NextResponse("Internal error", { status: 500 })
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
      return new NextResponse("Category id required", { status: 400 })
    }

    const body = await req.json()
    const parsed = CategorySchema.safeParse(body)
    if (!parsed.success) {
      return new NextResponse(parsed.error.issues[0].message, { status: 400 })
    }
    const { name, billboardId, imageUrl } = parsed.data

    const category = await prismadb.category.updateMany({
      where: {
        id: params.categoryId,
      },
      data: {
        name,
        billboardId,
        imageUrl,
      },
    })

    return NextResponse.json(category)
  } catch (error) {
    console.log("[CATEGORY_PATCH]" + error)
    return new NextResponse("Internal error", { status: 500 })
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
      return new NextResponse("Category id is required", { status: 400 })
    }

    const category = await prismadb.category.deleteMany({
      where: {
        id: params.categoryId,
      },
    })

    return NextResponse.json(category)
  } catch (error) {
    console.log("[CATEGORY_DELETE]" + error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
