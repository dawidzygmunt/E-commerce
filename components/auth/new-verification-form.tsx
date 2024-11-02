"use client"

import { CardWrapper } from "./card-wrapper"
import { BeatLoader } from "react-spinners"
import { useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { newVerification } from "@/actions/new-verification"
import { FormSuccess } from "../form-success"
import { FormError } from "../form-error"

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()
  const searchParams = useSearchParams()

  const token = searchParams.get("token")

  const onSubmit = useCallback(() => {
    if (!token) {
      setError("Token not found")
      return
    }
    newVerification(token)
      .then((data) => {
        setError(data.error)
        setSuccess(data.success)
      })
      .catch(() => {
        setError("Something went wrong")
      })
  }, [token])

  useEffect(() => {
    onSubmit()
  }, [onSubmit])

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="flex items-center w-full justify-center ">
        {!error && !success && <BeatLoader />}
        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
      </div>
    </CardWrapper>
  )
}
