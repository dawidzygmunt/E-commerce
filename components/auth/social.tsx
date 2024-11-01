"use client"

import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import { Button } from "../ui/button"
import { signIn } from "next-auth/react"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import toast from "react-hot-toast"

export const Social = () => {
  const onClick = (provider: "google" | "github") => {
    // Not working
    // signIn(provider, {
    //   redirectTo: DEFAULT_LOGIN_REDIRECT,
    // })
    toast.error("OAuth disabled due to Auth.js bugs")
  }
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => onClick("google")}
        // disabled
      >
        <FcGoogle className="h-5 w-5" />
      </Button>

      <Button
        size="lg"
        className="w-full"
        variant="outline"
        // disabled
        onClick={() => onClick("github")}
      >
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  )
}
