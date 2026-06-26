import { NextResponse } from "next/server"
import prismadb from "@/lib/prismadb"
import { ProductSchema } from "@/schemas"
import { verifyStoreOwner } from "@/lib/verify-store-owner"

export async function GET(
  _req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    if (!params.productId) {
      return new NextResponse("Product Id is required", { status: 400 })
    }

    const product = await prismadb.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        images: true,
        category: true,
        size: true,
        color: true,
      },
    })

    return NextResponse.json(product)
  } catch (error) {
    console.log("[PRODUCT_GET]" + error)
    return new NextResponse("Internal error", { status: 500 })
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
      return new NextResponse("Product Id required", { status: 400 })
    }

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

    await prismadb.product.update({
      where: {
        id: params.productId,
      },
      data: {
        name,
        price,
        categoryId,
        colorId,
        sizeId,
        images: {
          deleteMany: {},
        },
        isFeatured,
        isArchived,
      },
    })

    const products = await prismadb.product.update({
      where: {
        id: params.productId,
      },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    })

    return NextResponse.json(products)
  } catch (error) {
    console.log("[PRODUCT_PATCH]" + error)
    return new NextResponse("Internal error", { status: 500 })
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
      return new NextResponse("Product Id is required", { status: 400 })
    }

    const product = await prismadb.product.deleteMany({
      where: {
        id: params.productId,
      },
    })

    return NextResponse.json(product)
  } catch (error) {
    console.log("[PRODUCT_DELETE]" + error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
