import { LoginForm } from "@/components/auth/login-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ArrowDownRight } from "lucide-react"
import Link from "next/link"

const LoginPage = () => {
  return (
    <span className="flex flex-col gap-10 items-center pb-20">
      <div className="text-left border rounded-md p-5 px-8 relative">
        <ArrowDownRight className="absolute -top-10 -left-10 w-10 h-10 text-red-500" />
        <div className="text-sm font-semibold text-red-400">
          <p>
            <b>Email: </b>admin@test.com
          </p>
          <p>
            <b>Passord: </b>123
          </p>
        </div>

        <p className="font-extrabold text-center my-1 mt-3">or</p>

        <Button variant="link" className="text-center py-0">
          <Link href="/auth/register">Create an account</Link>
        </Button>
      </div>

      <LoginForm />
    </span>
  )
}

export default LoginPage
