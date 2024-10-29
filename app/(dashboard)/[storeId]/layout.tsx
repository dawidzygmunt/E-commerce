import prismadb from "@/lib/prismadb"
import { redirect } from "next/navigation"

import { Navbar } from "@/components/navbar"

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { storeId: string }
}) {
  // const session = await getServerSession(authOptions)
  // const userId = session?.user?.email

  // if (!userId) {
  //   redirect('/login');
  // }

  // const store = await prismadb.store.findFirst({
  //   where: {
  //     id: params.storeId,
  //     userId: userId
  //   }
  // });

  // if (!store) {
  //   redirect('/')
  // }

  return (
    <>
      <div>
        <Navbar />
        {children}
      </div>
    </>
  )
}
