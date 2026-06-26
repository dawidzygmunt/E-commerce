import { NextResponse } from "next/server"

import prismadb from "@/lib/prismadb"
import { ProductSchema } from "@/schemas"
import { verifyStoreOwner } from "@/lib/verify-store-owner"

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const auth = await verifyStoreOwner(params.storeId)
    if ("error" in auth) return auth.error

    const body = await req.json()
    const parsed = ProductSchema.safeParse(body)
    if (!parsed.success) {
      return new NextResponse(parsed.error.issues[0].message, { status: 400 })
    }
    const {
      name,
      price,
      categoryId,
      colorId,
      sizeId,
      images,
      isFeatured,
      isArchived,
    } = parsed.data

    const product = await prismadb.product.create({
      data: {
        name,
        price,
        isFeatured,
        isArchived,
        categoryId,
        colorId,
        sizeId,
        storeId: params.storeId,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    })
    return NextResponse.json(product)
  } catch (error) {
    console.log("[PRODUCTS_ERROR]", error)
    return new NextResponse("Internal error ", { status: 500 })
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { searchParams } = new URL(req.url)
    const categoryId = searchParams.get("categoryId") || undefined
    const colorId = searchParams.get("colorId") || undefined
    const sizeId = searchParams.get("sizeId") || undefined
    const isFeatured = searchParams.get("isFeatured")

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 })
    }

    const products = await prismadb.product.findMany({
      where: {
        storeId: params.storeId,
        categoryId,
        colorId,
        sizeId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
      },
      include: {
        images: true,
        category: true,
        color: true,
        size: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(products)
  } catch (error) {
    console.log("[PRODUCTS_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
