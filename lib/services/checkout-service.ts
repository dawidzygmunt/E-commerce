import Stripe from "stripe"

import prismadb from "@/lib/prismadb"
import { stripe } from "@/lib/stripe"

export async function createCheckoutSession(
  storeId: string,
  productsIds: string[]
): Promise<{ url: string | null } | { validationError: string }> {
  const uniqueProductsIds: string[] = Array.from(new Set(productsIds))

  const products = await prismadb.product.findMany({
    where: { id: { in: uniqueProductsIds }, storeId },
  })

  if (products.length !== uniqueProductsIds.length) {
    return { validationError: "Invalid products for this store" }
  }

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] =
    products.map((product) => ({
      quantity: 1,
      price_data: {
        currency: "USD",
        product_data: { name: product.name },
        unit_amount: product.price.toNumber() * 100,
      },
    }))

  const order = await prismadb.order.create({
    data: {
      storeId,
      isPaid: false,
      orderItems: {
        create: products.map((product) => ({
          product: { connect: { id: product.id } },
        })),
      },
    },
  })

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    billing_address_collection: "required",
    phone_number_collection: { enabled: true },
    success_url: `${process.env.FRONTEND_STORE_URL}/cart?success=1`,
    cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?canceled=1`,
    metadata: { orderId: order.id },
  })

  return { url: session.url }
}
