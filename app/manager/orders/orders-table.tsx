"use client";

import React, { useState, useMemo } from "react";
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
import { Input } from "@/components/ui/input";
import { OrderDialog } from "./order-dialog";
import { updateOrder, deleteOrder } from "@/actions/orders";
import { toast } from "sonner";
import { ArrowUpDown } from "lucide-react";

type ExtendedOrder = Order & {
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
};

interface OrdersTableProps {
  orders: ExtendedOrder[];
}

type OrderSortKey = "book.title" | "user.email" | "status" | "book.price" | "createdAt";

export function OrdersTable({ orders: initialOrders }: OrdersTableProps) {
  const [orders, setOrders] = useState<ExtendedOrder[]>(initialOrders);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<ExtendedOrder | null>(
    null
  );
  const [searchTermBook, setSearchTermBook] = useState("");
  const [searchTermDate, setSearchTermDate] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: OrderSortKey;
    direction: "asc" | "desc" | "none";
  }>({ key: "createdAt", direction: "desc" });

  const handleEditOrder = (order: ExtendedOrder) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };

  const handleDeleteOrder = async (id: string) => {
    try {
      await deleteOrder(id);
      const updatedOrdersList = orders.filter((order) => order.id !== id);
      setOrders(updatedOrdersList);
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
      const updatedOrderData = await updateOrder(id, status);
      if (updatedOrderData) {
        const orderToUpdate = orders.find(o => o.id === id);
        if (orderToUpdate) {
          const fullyUpdatedOrder = { ...orderToUpdate, ...updatedOrderData };
          setOrders(
            orders.map((order) =>
              order.id === id ? fullyUpdatedOrder : order
            )
          );
          toast.success("Order status updated successfully");
        } else {
          toast.error("Could not find order to update locally.");
        }
      } else {
        toast.error("Update action did not return updated order data.");
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

  const filteredAndSortedOrders = useMemo(() => {
    let filtered = [...orders];

    if (searchTermBook) {
      const lowerSearchBook = searchTermBook.toLowerCase();
      filtered = filtered.filter(
        (order) =>
          order.book.title.toLowerCase().includes(lowerSearchBook) ||
          order.book.author.toLowerCase().includes(lowerSearchBook)
      );
    }

    if (searchTermDate) {
      filtered = filtered.filter((order) => {
        const orderDate = new Date(order.createdAt).toISOString().split("T")[0];
        return orderDate === searchTermDate;
      });
    }

    if (sortConfig.direction !== "none") {
      filtered.sort((a, b) => {
        let valA, valB;

        switch (sortConfig.key) {
          case "book.title":
            valA = a.book.title.toLowerCase();
            valB = b.book.title.toLowerCase();
            break;
          case "user.email":
            valA = a.user.email.toLowerCase();
            valB = b.user.email.toLowerCase();
            break;
          case "status":
            valA = a.status.toLowerCase();
            valB = b.status.toLowerCase();
            break;
          case "book.price":
            valA = a.book.price;
            valB = b.book.price;
            break;
          case "createdAt":
            valA = new Date(a.createdAt).getTime();
            valB = new Date(b.createdAt).getTime();
            break;
          default:
            return 0;
        }

        if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
        if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return filtered;
  }, [orders, searchTermBook, searchTermDate, sortConfig]);

  const handleSort = (key: OrderSortKey) => {
    let direction: "asc" | "desc" | "none" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    } else if (sortConfig.key === key && sortConfig.direction === "desc") {
      direction = "none";
    }
    setSortConfig({ key, direction });
  };

  const SortableHeader = ({ sortKey, children }: { sortKey: OrderSortKey; children: React.ReactNode }) => (
    <TableHead>
      <Button variant="ghost" onClick={() => handleSort(sortKey)} className="px-2">
        {children}
        {sortConfig.key === sortKey && sortConfig.direction === "asc" && <ArrowUpDown className="ml-2 h-4 w-4" />}
        {sortConfig.key === sortKey && sortConfig.direction === "desc" && <ArrowUpDown className="ml-2 h-4 w-4 transform rotate-180" />}
        {sortConfig.key === sortKey && sortConfig.direction === "none" && <ArrowUpDown className="ml-2 h-4 w-4 text-muted-foreground opacity-50" />}
        {sortConfig.key !== sortKey && <ArrowUpDown className="ml-2 h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-50 transition-opacity" />}
      </Button>
    </TableHead>
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <Input
          placeholder="Search by Book Title/Author..."
          value={searchTermBook}
          onChange={(e) => setSearchTermBook(e.target.value)}
          className="max-w-xs"
        />
        <Input
          type="date"
          value={searchTermDate}
          onChange={(e) => setSearchTermDate(e.target.value)}
          className="max-w-xs"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <SortableHeader sortKey="book.title">Book</SortableHeader>
              <SortableHeader sortKey="user.email">Customer</SortableHeader>
              <SortableHeader sortKey="status">Status</SortableHeader>
              <SortableHeader sortKey="book.price">Price</SortableHeader>
              <SortableHeader sortKey="createdAt">Date</SortableHeader>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedOrders.map((order) => (
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
