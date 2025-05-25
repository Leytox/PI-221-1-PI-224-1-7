import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { OrderStatus } from "@/generated/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default async function OrdersPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const orders = await prisma.order.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      book: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING:
        return "bg-yellow-500";
      case OrderStatus.CONFIRMED:
        return "bg-blue-500";
      case OrderStatus.SHIPPED:
        return "bg-green-500";
      case OrderStatus.CANCELLED:
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>
      {orders.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            You haven&apos;t placed any orders yet
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardContent className="p-6">
                <div className="flex gap-6">
                  <div className="relative w-24 h-32 flex-shrink-0">
                    <Image
                      src={order.book.image || "/placeholder-book.jpg"}
                      alt={order.book.title}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold">
                          {order.book.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {order.book.author}
                        </p>
                      </div>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </div>
                    <div className="mt-4 space-y-2">
                      <p className="text-sm">
                        <span className="font-medium">Order Date:</span>{" "}
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Price:</span> $
                        {order.book.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}
