import { NextResponse } from "next/server"

import prismadb from "@/lib/prismadb"
import { CategorySchema } from "@/schemas"
import { verifyStoreOwner } from "@/lib/verify-store-owner"

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const auth = await verifyStoreOwner(params.storeId)
    if ("error" in auth) return auth.error

    const body = await req.json()
    const parsed = CategorySchema.safeParse(body)
    if (!parsed.success) {
      return new NextResponse(parsed.error.issues[0].message, { status: 400 })
    }
    const { name, billboardId, imageUrl } = parsed.data

    const category = await prismadb.category.create({
      data: {
        name,
        billboardId,
        storeId: params.storeId,
        imageUrl,
      },
    })
    return NextResponse.json(category)
  } catch (error) {
    console.log("[CATEGORIES_POST]", error)
    return new NextResponse("Internal error ", { status: 500 })
  }
}

export async function GET(
  _req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const categories = await prismadb.category.findMany({
      where: {
        storeId: params.storeId,
      },
    })
    return NextResponse.json(categories)
  } catch (error) {
    console.log("[CATEGORIES_GET]", error)
    return new NextResponse("Internal error ", { status: 500 })
  }
}
