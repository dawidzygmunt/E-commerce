import { NextResponse } from "next/server"
import prismadb from "@/lib/prismadb"
import { SizeSchema } from "@/schemas"
import { verifyStoreOwner } from "@/lib/verify-store-owner"

export async function GET(
  _req: Request,
  { params }: { params: { sizeId: string } }
) {
  try {
    if (!params.sizeId) {
      return new NextResponse("Size Id is required", { status: 400 })
    }

    const size = await prismadb.size.findUnique({
      where: {
        id: params.sizeId,
      },
    })

    return NextResponse.json(size)
  } catch (error) {
    console.log("[SIZE_GET]" + error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } }
) {
  try {
    const auth = await verifyStoreOwner(params.storeId)
    if ("error" in auth) return auth.error

    if (!params.sizeId) {
      return new NextResponse("Size id required", { status: 400 })
    }

    const body = await req.json()
    const parsed = SizeSchema.safeParse(body)
    if (!parsed.success) {
      return new NextResponse(parsed.error.issues[0].message, { status: 400 })
    }
    const { name, value } = parsed.data

    const sizes = await prismadb.size.updateMany({
      where: {
        id: params.sizeId,
      },
      data: {
        name,
        value,
      },
    })

    return NextResponse.json(sizes)
  } catch (error) {
    console.log("[SIZES_PATCH]" + error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { storeId: string; sizeId: string } }
) {
  try {
    const auth = await verifyStoreOwner(params.storeId)
    if ("error" in auth) return auth.error

    if (!params.sizeId) {
      return new NextResponse("Size id is required", { status: 400 })
    }

    const sizes = await prismadb.size.deleteMany({
      where: {
        id: params.sizeId,
      },
    })

    return NextResponse.json(sizes)
  } catch (error) {
    console.log("[SIZES_DELETE]" + error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
