import { authOptions } from "@/app/api/auth/[...nextauth]/options"
import { MainNav } from "./main-nav"
import { signOut } from "next-auth/react"
import StoreSwitcher from "./store-switcher"
import { getServerSession } from "next-auth"
import { redirect, useRouter } from "next/navigation"
import prismadb from "@/lib/prismadb"
import { UserButton } from "./user-button"
import { Button } from "./ui/button"
import { ModeToggle } from "./ui/theme-toggle"
import GoToStoreButton from "./nav-go-to-store"


export const Navbar = async () => {
  const session = await getServerSession(authOptions)
  const userId = session?.user?.email


  if (!userId) {
    redirect("/sign-in")
  }

  const stores = await prismadb.store.findMany({
    where: {
      userId
    }
  })

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={stores} />
        <div>
          {/* This is a component navbar */}
        </div>
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <GoToStoreButton />
          <ModeToggle />
          
          {session?.user ? (
            <UserButton />
          ) : (
            <Button onClick={() => redirect('/sign-in')}>
              Log in
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

