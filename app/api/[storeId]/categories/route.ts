import { NextResponse } from "next/server"

import prismadb from "@/lib/prismadb"
import { auth } from "@/auth"

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const session = await auth()

    const userId = session?.user?.id
    const body = await req.json()

    const { name, billboardId, imageUrl } = body

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 })
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 })
    }

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 })
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
    console.log("[BILLBOARDS]", error)
    return new NextResponse("Internal error ", { status: 500 })
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const categoires = await prismadb.category.findMany({
      where: {
        storeId: params.storeId,
      },
    })
    return NextResponse.json(categoires)
  } catch (error) {
    console.log("[CATEGORIRES_GET]", error)
    return new NextResponse("Internal error ", { status: 500 })
  }
}
