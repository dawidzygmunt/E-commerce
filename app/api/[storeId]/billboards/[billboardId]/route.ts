import { NextResponse } from "next/server"
import prismadb from "@/lib/prismadb"
import { BillboardSchema } from "@/schemas"
import { verifyStoreOwner } from "@/lib/verify-store-owner"

export async function GET(
  _req: Request,
  { params }: { params: { billboardId: string } }
) {
  try {
    if (!params.billboardId) {
      return new NextResponse("Billboard Id is required", { status: 400 })
    }

    const billboard = await prismadb.billboard.findUnique({
      where: {
        id: params.billboardId,
      },
    })

    return NextResponse.json(billboard)
  } catch (error) {
    console.log("[BILLBOARD_GET]" + error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const auth = await verifyStoreOwner(params.storeId)
    if ("error" in auth) return auth.error

    if (!params.billboardId) {
      return new NextResponse("Billboard Id required", { status: 400 })
    }

    const body = await req.json()
    const parsed = BillboardSchema.safeParse(body)
    if (!parsed.success) {
      return new NextResponse(parsed.error.issues[0].message, { status: 400 })
    }
    const { label, imageUrl, showText } = parsed.data

    const billboard = await prismadb.billboard.updateMany({
      where: {
        id: params.billboardId,
      },
      data: {
        showText,
        label,
        imageUrl,
      },
    })

    return NextResponse.json(billboard)
  } catch (error) {
    console.log("[BILLBOARD_PATCH]" + error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const auth = await verifyStoreOwner(params.storeId)
    if ("error" in auth) return auth.error

    if (!params.billboardId) {
      return new NextResponse("Billboard Id is required", { status: 400 })
    }

    const billboard = await prismadb.billboard.deleteMany({
      where: {
        id: params.billboardId,
      },
    })

    return NextResponse.json(billboard)
  } catch (error) {
    console.log("[BILLBOARD_DELETE]" + error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
