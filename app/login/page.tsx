"use client"

import { FormEvent, useEffect, useState } from "react"
import { signIn } from "next-auth/react"
import { getSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { getServerSession } from "next-auth"
import { HelpCircle, MoveDownRight } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()

  useEffect(() => {
    const ifUserLogged = async () => {
      const session = await getSession()
      const userId = session?.user?.email
      console.log(userId)

      if (userId) {
        router.push(`${process.env.BASE_PATH}`)
      }
    }
    ifUserLogged()
  }, [])

  const [data, setData] = useState({
    email: "" as string,
    password: "" as string,
  })

  const loginUser = async (e: FormEvent) => {
    e.preventDefault()
    signIn("credentials", {
      ...data,
      redirect: true,
      callbackUrl: "/e-commerce",
    })
  }
  return (
    <>
      <div className="flex min-h-full flex-col items-center justify-center px-6 pb-24 lg:px-8 bg-white">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm my-5">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="border-2 border-red-500 flex flex-col px-8 py-4 rounded-lg m-5 text-black relative">
          <MoveDownRight className="text-red-700 absolute left-0 top-0 -translate-x-8 -translate-y-8 w-8 h-8" />
          <span>
            Login: <b>admin@gmail.com</b>
          </span>
          <span>
            Password: <b>root</b>
          </span>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          {/* Tutaj zaczyna się form */}
          <form className="space-y-6" onSubmit={loginUser}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={(e) => {
                    setData({ ...data, email: e.target.value })
                  }}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={(e) => {
                    setData({ ...data, password: e.target.value })
                  }}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500 hover:cursor-pointer">
            Have not an account yet?{" "}
            <span
              onClick={() => router.push("/register")}
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    </>
  )
}
