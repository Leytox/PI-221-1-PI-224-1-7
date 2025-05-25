import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { OrderStatus } from "@/generated/prisma";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const { items } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return new NextResponse("Invalid request body", { status: 400 });
    }

    // Create orders for each item
    const orders = await Promise.all(
      items.map((bookId: string) =>
        prisma.order.create({
          data: {
            bookId,
            userId: session.user.id,
            status: OrderStatus.PENDING,
          },
        })
      )
    );

    return NextResponse.json(orders);
  } catch (error) {
    console.error("[CHECKOUT_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
