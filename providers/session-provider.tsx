import { auth } from "@/auth"
import { SessionProvider } from "next-auth/react"
import { ReactNode, FC } from "react"

interface ProviderProps {
  children: ReactNode
}

export const ProviderSession: FC<ProviderProps> = async ({ children }) => {
  const session = await auth()
  return (
    // basePath='/e-commerce/api/auth'
    <SessionProvider basePath="/e-commerce/api/auth" session={session}>
      {children}
    </SessionProvider>
  )
}
