import { prisma } from "@/lib/prisma";
import {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrder,
  getOrders,
} from "@/actions/orders";
import { OrderStatus } from "@/generated/prisma";

jest.mock("@/lib/prisma", () => ({
  prisma: {
    order: {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
    },
  },
}));

describe("Order Service", () => {
  const mockOrder = {
    id: "order123",
    bookId: "book123",
    userId: "user123",
    status: "PENDING" as OrderStatus,
    createdAt: new Date(),
    book: { id: "book123", title: "Sample Book" },
    user: { id: "user123", name: "John Doe" },
  };

  afterEach(() => jest.clearAllMocks());

  describe("createOrder", () => {
    it("should create and return an order", async () => {
      (prisma.order.create as jest.Mock).mockResolvedValue(mockOrder);
      const result = await createOrder("book123", "user123");
      expect(prisma.order.create).toHaveBeenCalledWith({
        data: { bookId: "book123", userId: "user123" },
        include: { book: true, user: true },
      });
      expect(result).toEqual(mockOrder);
    });

    it("should throw on creation error", async () => {
      (prisma.order.create as jest.Mock).mockRejectedValue(new Error("DB error"));
      await expect(createOrder("badBook", "badUser")).rejects.toThrow("DB error");
    });
  });

  describe("updateOrder", () => {
    it("should update and return an order", async () => {
      const updatedOrder = { ...mockOrder, status: "SHIPPED" };
      (prisma.order.update as jest.Mock).mockResolvedValue(updatedOrder);

      const result = await updateOrder("order123", "SHIPPED");
      expect(prisma.order.update).toHaveBeenCalledWith({
        where: { id: "order123" },
        data: { status: "SHIPPED" },
        include: { book: true, user: true },
      });
      expect(result.status).toBe("SHIPPED");
    });

    it("should throw if order not found", async () => {
      (prisma.order.update as jest.Mock).mockRejectedValue(new Error("Not found"));
      await expect(updateOrder("wrongId", "CANCELLED")).rejects.toThrow("Not found");
    });
  });

  describe("deleteOrder", () => {
    it("should delete and return an order", async () => {
      (prisma.order.delete as jest.Mock).mockResolvedValue(mockOrder);
      const result = await deleteOrder("order123");
      expect(prisma.order.delete).toHaveBeenCalledWith({
        where: { id: "order123" },
        include: { book: true, user: true },
      });
      expect(result).toEqual(mockOrder);
    });

    it("should throw if delete fails", async () => {
      (prisma.order.delete as jest.Mock).mockRejectedValue(new Error("Delete failed"));
      await expect(deleteOrder("badId")).rejects.toThrow("Delete failed");
    });
  });

  describe("getOrder", () => {
    it("should return a specific order", async () => {
      (prisma.order.findUnique as jest.Mock).mockResolvedValue(mockOrder);
      const result = await getOrder("order123");
      expect(prisma.order.findUnique).toHaveBeenCalledWith({
        where: { id: "order123" },
        include: { book: true, user: true },
      });
      expect(result).toEqual(mockOrder);
    });

    it("should return null if not found", async () => {
      (prisma.order.findUnique as jest.Mock).mockResolvedValue(null);
      const result = await getOrder("invalidId");
      expect(result).toBeNull();
    });

    it("should throw on database error", async () => {
      (prisma.order.findUnique as jest.Mock).mockRejectedValue(new Error("DB error"));
      await expect(getOrder("errorId")).rejects.toThrow("DB error");
    });
  });

  describe("getOrders", () => {
    it("should return list of orders", async () => {
      (prisma.order.findMany as jest.Mock).mockResolvedValue([mockOrder]);
      const result = await getOrders();
      expect(prisma.order.findMany).toHaveBeenCalledWith({
        include: { book: true, user: true },
        orderBy: { createdAt: "desc" },
      });
      expect(result).toEqual([mockOrder]);
    });

    it("should return empty array if no orders", async () => {
      (prisma.order.findMany as jest.Mock).mockResolvedValue([]);
      const result = await getOrders();
      expect(result).toEqual([]);
    });

    it("should throw on DB error", async () => {
      (prisma.order.findMany as jest.Mock).mockRejectedValue(new Error("Find failed"));
      await expect(getOrders()).rejects.toThrow("Find failed");
    });
  });
});
