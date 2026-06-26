import { NextResponse } from "next/server"
import prismadb from "@/lib/prismadb"
import { ColorSchema } from "@/schemas"
import { verifyStoreOwner } from "@/lib/verify-store-owner"

export async function GET(
  _req: Request,
  { params }: { params: { colorId: string } }
) {
  try {
    if (!params.colorId) {
      return new NextResponse("Color Id is required", { status: 400 })
    }

    const color = await prismadb.color.findUnique({
      where: {
        id: params.colorId,
      },
    })

    return NextResponse.json(color)
  } catch (error) {
    console.log("[COLOR_GET]" + error)
    return new NextResponse("Internal error", { status: 500 })
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
      return new NextResponse("Color id required", { status: 400 })
    }

    const body = await req.json()
    const parsed = ColorSchema.safeParse(body)
    if (!parsed.success) {
      return new NextResponse(parsed.error.issues[0].message, { status: 400 })
    }
    const { name, value } = parsed.data

    const colors = await prismadb.color.updateMany({
      where: {
        id: params.colorId,
      },
      data: {
        name,
        value,
      },
    })

    return NextResponse.json(colors)
  } catch (error) {
    console.log("[COLOR_PATCH]" + error)
    return new NextResponse("Internal error", { status: 500 })
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
      return new NextResponse("Color id is required", { status: 400 })
    }

    const colors = await prismadb.color.deleteMany({
      where: {
        id: params.colorId,
      },
    })

    return NextResponse.json(colors)
  } catch (error) {
    console.log("[COLORS_DELETE]" + error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
