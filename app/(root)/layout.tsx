import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";

export default async function SetupLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions)
  const userId = session?.user?.email


  if (!userId) {
    redirect('/sign-in')
  }


  const store = await prismadb.store.findFirst({
    where :{
      userId: userId
    }
  });


  if (store) {
    redirect(`/${store.id}`)
  }

  return (
    <>
      {children}
    </>
  )
}