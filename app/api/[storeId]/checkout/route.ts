import Stripe from "stripe";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import prismadb from "@/lib/prismadb";
import { corsHeaders } from "@/lib/cors";

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store id is required", {
        status: 400,
        headers: corsHeaders,
      });
    }

    const { productsIds } = await req.json();

    if (!productsIds || !Array.isArray(productsIds) || productsIds.length === 0) {
      return new NextResponse("Product ids are required", {
        status: 400,
        headers: corsHeaders,
      });
    }

    const uniqueProductsIds: string[] = Array.from(new Set(productsIds));

    const products = await prismadb.product.findMany({
      where: {
        id: { in: uniqueProductsIds },
        storeId: params.storeId,
      },
    });

    if (products.length !== uniqueProductsIds.length) {
      return new NextResponse("Invalid products for this store", {
        status: 400,
        headers: corsHeaders,
      });
    }

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] =
      products.map((product) => ({
        quantity: 1,
        price_data: {
          currency: "USD",
          product_data: { name: product.name },
          unit_amount: product.price.toNumber() * 100,
        },
      }));

    const order = await prismadb.order.create({
      data: {
        storeId: params.storeId,
        isPaid: false,
        orderItems: {
          create: products.map((product) => ({
            product: { connect: { id: product.id } },
          })),
        },
      },
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      billing_address_collection: "required",
      phone_number_collection: { enabled: true },
      success_url: `${process.env.FRONTEND_STORE_URL}/cart?success=1`,
      cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?canceled=1`,
      metadata: { orderId: order.id },
    });

    return NextResponse.json({ url: session.url }, { headers: corsHeaders });
  } catch (error) {
    console.error("[CHECKOUT_POST]", error);
    return new NextResponse("Internal error", {
      status: 500,
      headers: corsHeaders,
    });
  }
}
