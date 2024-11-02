"use client"

import { signOut } from "next-auth/react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, Settings, User } from "lucide-react"
import { useRouter } from "next/navigation"
import { useCurrentUser } from "@/hooks/use-current-user"

export const UserButton = () => {
  const router = useRouter()
  const user = useCurrentUser()
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {user?.image ? (
            <div>
              <img
                src={user.image}
                alt="User avatar"
                className="w-[30px] h-[30px] rounded-full"
              />
            </div>
          ) : (
            <div className="w-[30px] h-[30px] bg-slate-600 rounded-full text-white font-bold flex items-center justify-center text-sm cursor-pointer">
              {user?.name?.[0].toUpperCase()}
            </div>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => router.push("/account")}>
            <User className="mr-2 h-4 w-4" />
            Account
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => signOut()}>
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
