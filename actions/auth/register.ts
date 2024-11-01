"use server"

import * as z from "zod"
import bcrypt from "bcryptjs"

import { RegisterSchema } from "@/schemas"
import prismadb from "@/lib/prismadb"

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values)
  if (!validatedFields.success) {
    return { error: "Invalid fields" }
  }

  const { name, email, password } = validatedFields.data
  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await prismadb.user.findUnique({
    where: {
      email,
    },
  })

  if (existingUser) {
    return { error: "User already exists" }
  }

  await prismadb.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  })

  // TODO: Send verification token email

  return { success: "User created" }
}
