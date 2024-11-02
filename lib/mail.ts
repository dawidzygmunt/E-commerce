import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmationLink = `http://localhost:3000/e-commerce/auth/new-verification?token=${token}`
  const message = `<p>Click <a href=" ${confirmationLink}">here</a> to verify your email</p>`

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Verify your email",
    html: message,
  })
}
