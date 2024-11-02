import prismadb from "@/lib/prismadb"
import { verify } from "crypto"

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await prismadb.verificationToken.findFirst({
      where: {
        email,
      },
    })

    return verificationToken
  } catch (error) {
    return null
  }
}

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await prismadb.verificationToken.findUnique({
      where: {
        token,
      },
    })

    return verificationToken
  } catch (error) {
    return null
  }
}
