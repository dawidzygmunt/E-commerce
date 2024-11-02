import { NextResponse } from "next/server"

import prismadb from "@/lib/prismadb"
import { auth } from "@/auth"

export async function POST(req: Request) {
  try {
    const session = await auth()
    const userId = session?.user?.id
    const body = await req.json()

    const { name } = body

    if (!userId) {
      return new NextResponse("Brak dostępu", { status: 401 })
    }

    if (!name) {
      return new NextResponse("Nazwa jest wymagana!", { status: 400 })
    }

    const store = await prismadb.store.create({
      data: {
        name,
        userId,
      },
    })
    return NextResponse.json(store)
  } catch (error) {
    console.log("[STORES_POST]", error)
    return new NextResponse("Something went wrong", { status: 500 })
  }
}
