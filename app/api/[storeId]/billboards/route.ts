import { NextResponse } from "next/server"

import prismadb from "@/lib/prismadb"
import { useParams } from "next/navigation"
import { auth } from "@/auth"

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const session = await auth()

    const userId = session?.user?.id
    const body = await req.json()

    const { label, imageUrl, showText } = body

    if (!userId) {
      return new NextResponse("Unatuhicated", { status: 401 })
    }

    if (!label) {
      return new NextResponse("Label is required", { status: 400 })
    }

    if (!imageUrl) {
      return new NextResponse("image Url is required", { status: 400 })
    }

    if (!params.storeId) {
      return new NextResponse("Store Id is required", { status: 400 })
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    })

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 })
    }

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
  req: Request,
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
