import { redirect } from "next/navigation"
import prismadb from "@/lib/prismadb"

import { SettingsForm } from "./components/settings-form"
import { auth } from "@/auth"

interface SettingsPageProps {
  params: {
    storeId: string
  }
}

const SettingsPage: React.FC<SettingsPageProps> = async ({ params }) => {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) {
    redirect("/login")
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  })

  if (!store) {
    redirect("/sign-in")
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm ininitalData={store} />
      </div>
    </div>
  )
}

export default SettingsPage
