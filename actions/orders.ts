"use server";
import { OrderStatus } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";

export async function createOrder(bookId: string, userId: string) {
  const order = await prisma.order.create({
    data: {
      bookId,
      userId,
    },
    include: {
      book: true,
      user: true,
    },
  });
  return order;
}

export async function updateOrder(id: string, status: OrderStatus) {
  const order = await prisma.order.update({
    where: { id },
    data: { status },
    include: {
      book: true,
      user: true,
    },
  });
  return order;
}

export async function deleteOrder(id: string) {
  const order = await prisma.order.delete({
    where: { id },
    include: {
      book: true,
      user: true,
    },
  });
  return order;
}

export async function getOrder(id: string) {
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      book: true,
      user: true,
    },
  });
  return order;
}

export async function getOrders() {
  const orders = await prisma.order.findMany({
    include: {
      book: true,
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return orders;
}
