import { getOrders } from "@/actions/orders";
import { OrdersTable } from "./orders-table";

export default async function OrdersPage() {
  const orders = await getOrders();

  return (
    <main className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Orders Management</h1>
      </div>
      <OrdersTable orders={orders || []} />
    </main>
  );
}
