import { NextResponse } from "next/server"

import { corsHeaders } from "@/lib/cors"
import { API_ERRORS, errorResponse } from "@/lib/api-errors"
import { createCheckoutSession } from "@/lib/services/checkout-service"

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse(API_ERRORS.STORE_ID_REQUIRED, {
        status: 400,
        headers: corsHeaders,
      })
    }

    const { productsIds } = await req.json()

    if (!productsIds || !Array.isArray(productsIds) || productsIds.length === 0) {
      return new NextResponse(API_ERRORS.PRODUCT_IDS_REQUIRED, {
        status: 400,
        headers: corsHeaders,
      })
    }

    const result = await createCheckoutSession(params.storeId, productsIds)

    if ("validationError" in result) {
      return new NextResponse(result.validationError, {
        status: 400,
        headers: corsHeaders,
      })
    }

    return NextResponse.json({ url: result.url }, { headers: corsHeaders })
  } catch (error) {
    console.error("[CHECKOUT_POST]", error)
    return new NextResponse(API_ERRORS.INTERNAL, {
      status: 500,
      headers: corsHeaders,
    })
  }
}
