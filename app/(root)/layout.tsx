import { redirect } from "next/navigation"
import prismadb from "@/lib/prismadb"
import { auth } from "@/auth"

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  const userId = session?.user.id

  const store = await prismadb.store.findFirst({
    where: {
      userId: userId,
    },
  })

  if (store) {
    redirect(`/${store.id}`)
  }

  return <>{children}</>
}
