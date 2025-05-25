"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/store/useCart";
import { getBookById } from "@/actions/books";
import { Book } from "@/generated/prisma";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function CheckoutClient() {
  const { items, clear } = useCart();
  const [cartBooks, setCartBooks] = useState<(Book & { quantity: number })[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchCartBooks() {
      setIsLoading(true);
      try {
        // Count occurrences of each book ID
        const bookCounts = items.reduce((acc, id) => {
          acc[id] = (acc[id] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        // Fetch book details for unique IDs
        const uniqueIds = Array.from(new Set(items));
        const books = await Promise.all(
          uniqueIds.map(async (id) => {
            const book = await getBookById(id);
            return book ? { ...book, quantity: bookCounts[id] } : null;
          })
        );

        setCartBooks(
          books.filter(
            (book): book is Book & { quantity: number } => book !== null
          )
        );
      } catch (error) {
        console.error("Error fetching cart books:", error);
        toast.error("Failed to load cart items");
      } finally {
        setIsLoading(false);
      }
    }

    fetchCartBooks();
  }, [items]);

  const total = cartBooks.reduce(
    (sum, book) => sum + book.price * book.quantity,
    0
  );

  const handleCheckout = async () => {
    if (cartBooks.length === 0) return;

    setIsProcessing(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items }),
      });

      if (!response.ok) {
        throw new Error("Checkout failed");
      }

      clear();
      toast.success("Order placed successfully!");
      router.push("/orders");
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Failed to process checkout");
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return <div>Loading checkout...</div>;
  }

  if (cartBooks.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Your cart is empty</p>
        <Button className="mt-4" onClick={() => router.push("/books")}>
          Browse Books
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2 space-y-6">
        <h2 className="text-2xl font-semibold">Order Summary</h2>
        <div className="space-y-4">
          {cartBooks.map((book) => (
            <Card key={book.id}>
              <CardContent className="p-6">
                <div className="flex gap-6">
                  <div className="relative w-24 h-32 flex-shrink-0">
                    <Image
                      src={book.image || "/placeholder-book.jpg"}
                      alt={book.title}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{book.title}</h3>
                    <p className="text-muted-foreground">{book.author}</p>
                    <div className="mt-2">
                      <p className="font-medium">${book.price.toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground">
                        Quantity: {book.quantity}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Order Total</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <Separator className="my-4" />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <Button
              className="w-full mt-6"
              onClick={handleCheckout}
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Place Order"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
