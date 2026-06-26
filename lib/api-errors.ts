import { NextResponse } from "next/server"

export const API_ERRORS = {
  UNAUTHENTICATED: "Unauthenticated",
  UNAUTHORIZED: "Unauthorized",
  INTERNAL: "Internal error",
  NAME_REQUIRED: "Name is required",
  STORE_ID_REQUIRED: "Store id is required",
  PRODUCT_IDS_REQUIRED: "Product ids are required",
  INVALID_PRODUCTS: "Invalid products for this store",
  idRequired: (entity: string) => `${entity} id is required`,
} as const

export function errorResponse(message: string, status: number): NextResponse {
  return new NextResponse(message, { status })
}
