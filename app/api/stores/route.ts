import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options"
import { useSession } from "next-auth/react";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { log } from "console";

export async function POST(
  req: Request
) {
  try {
    // const { data: session } = useSession();
    // if (!(session?.user)) {
    //   return new NextResponse('Nie zalogowano!', { status: 400 })
    // }

    const session = await getServerSession(authOptions)
    console.log(session);
    

    const userId = session?.user?.email
    const body = await req.json();

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
        userId
      }
    })
    return NextResponse.json(store);

  } catch (error) {
    console.log('[STORES_POST]', error);
    return new NextResponse("Nieznany błąd ", { status: 500 })
  }
}