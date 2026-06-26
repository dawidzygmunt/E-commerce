import { NextResponse } from "next/server"

import prismadb from "@/lib/prismadb"
import { ColorSchema } from "@/schemas"
import { verifyStoreOwner } from "@/lib/verify-store-owner"

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const auth = await verifyStoreOwner(params.storeId)
    if ("error" in auth) return auth.error

    const body = await req.json()
    const parsed = ColorSchema.safeParse(body)
    if (!parsed.success) {
      return new NextResponse(parsed.error.issues[0].message, { status: 400 })
    }
    const { name, value } = parsed.data

    const color = await prismadb.color.create({
      data: {
        name,
        value,
        storeId: params.storeId,
      },
    })
    return NextResponse.json(color)
  } catch (error) {
    console.log("[COLOR_POST]", error)
    return new NextResponse("Internal error ", { status: 500 })
  }
}

export async function GET(
  _req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const colors = await prismadb.color.findMany({
      where: {
        storeId: params.storeId,
      },
    })
    return NextResponse.json(colors)
  } catch (error) {
    console.log("[COLOR_GET]", error)
    return new NextResponse("Internal error ", { status: 500 })
  }
}
