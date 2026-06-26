import { NextResponse } from "next/server"

import prismadb from "@/lib/prismadb"
import { BillboardSchema } from "@/schemas"
import { verifyStoreOwner } from "@/lib/verify-store-owner"

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const auth = await verifyStoreOwner(params.storeId)
    if ("error" in auth) return auth.error

    const body = await req.json()
    const parsed = BillboardSchema.safeParse(body)
    if (!parsed.success) {
      return new NextResponse(parsed.error.issues[0].message, { status: 400 })
    }
    const { label, imageUrl, showText } = parsed.data

    const billboard = await prismadb.billboard.create({
      data: {
        label,
        imageUrl,
        storeId: params.storeId,
        showText,
      },
    })
    return NextResponse.json(billboard)
  } catch (error) {
    console.log("[BILLBOARDS]", error)
    return new NextResponse("Internal error ", { status: 500 })
  }
}

export async function GET(
  _req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const billboards = await prismadb.billboard.findMany({
      where: {
        storeId: params.storeId,
      },
    })
    return NextResponse.json(billboards)
  } catch (error) {
    console.log("[BILLBOARDS_GET]", error)
    return new NextResponse("Internal error ", { status: 500 })
  }
}
