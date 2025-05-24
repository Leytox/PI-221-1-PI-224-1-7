"use client";

import { Order, OrderStatus } from "@/generated/prisma";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { OrderDialog } from "./order-dialog";
import { updateOrder, deleteOrder } from "@/actions/orders";
import { toast } from "sonner";

interface OrdersTableProps {
  orders: (Order & {
    book: {
      title: string;
      author: string;
      price: number;
    };
    user: {
      firstName: string;
      lastName: string;
      email: string;
    };
  })[];
}

export function OrdersTable({ orders: initialOrders }: OrdersTableProps) {
  const [orders, setOrders] = useState(initialOrders);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<(typeof orders)[0] | null>(
    null
  );

  const handleEditOrder = (order: (typeof orders)[0]) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };

  const handleDeleteOrder = async (id: string) => {
    try {
      await deleteOrder(id);
      setOrders(orders.filter((order) => order.id !== id));
      toast.success("Order deleted successfully");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to delete order");
      }
    }
  };

  const handleUpdateStatus = async (id: string, status: OrderStatus) => {
    try {
      const updatedOrder = await updateOrder(id, status);
      if (updatedOrder) {
        setOrders(
          orders.map((order) =>
            order.id === updatedOrder.id ? updatedOrder : order
          )
        );
        toast.success("Order status updated successfully");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to update order status");
      }
    }
  };

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
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Book</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{order.book.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {order.book.author}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">
                      {order.user.firstName} {order.user.lastName}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {order.user.email}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>${order.book.price.toFixed(2)}</TableCell>
                <TableCell>
                  {new Date(order.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditOrder(order)}
                    >
                      Update Status
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteOrder(order.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <OrderDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        order={selectedOrder}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
}
