"use client";

import { Order, OrderStatus } from "@/generated/prisma";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";

interface OrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order:
    | (Order & {
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
      })
    | null;
  onUpdateStatus: (id: string, status: OrderStatus) => void;
}

export function OrderDialog({
  open,
  onOpenChange,
  order,
  onUpdateStatus,
}: OrderDialogProps) {
  const [status, setStatus] = useState<OrderStatus>(OrderStatus.PENDING);

  useEffect(() => {
    if (order) {
      setStatus(order.status);
    } else {
      setStatus(OrderStatus.PENDING);
    }
  }, [order]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (order) {
      onUpdateStatus(order.id, status);
      onOpenChange(false);
    }
  };

  if (!order) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Order Status</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium">Order Details</h3>
            <div className="mt-2 space-y-2 text-sm text-muted-foreground">
              <p>
                <span className="font-medium">Book:</span> {order.book.title}
              </p>
              <p>
                <span className="font-medium">Customer:</span>{" "}
                {order.user.firstName} {order.user.lastName}
              </p>
              <p>
                <span className="font-medium">Email:</span> {order.user.email}
              </p>
              <p>
                <span className="font-medium">Price:</span> $
                {order.book.price.toFixed(2)}
              </p>
              <p>
                <span className="font-medium">Date:</span>{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={status}
                onValueChange={(value) => setStatus(value as OrderStatus)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={OrderStatus.PENDING}>Pending</SelectItem>
                  <SelectItem value={OrderStatus.CONFIRMED}>
                    Confirmed
                  </SelectItem>
                  <SelectItem value={OrderStatus.SHIPPED}>Shipped</SelectItem>
                  <SelectItem value={OrderStatus.CANCELLED}>
                    Cancelled
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Update</Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
