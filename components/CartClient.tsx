"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/store/useCart";
import { getBookById } from "@/actions/books";
import { Book } from "@/generated/prisma";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CartClient() {
  const { items, removeItem, clear } = useCart();
  const [cartBooks, setCartBooks] = useState<(Book & { quantity: number })[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchCartBooks() {
      console.log("Cart items from store:", items);
      setIsLoading(true);
      try {
        // Count occurrences of each book ID
        const bookCounts = items.reduce((acc, id) => {
          acc[id] = (acc[id] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);
        console.log("Book counts:", bookCounts);

        // Fetch book details for unique IDs
        const uniqueIds = Array.from(new Set(items));
        console.log("Unique IDs to fetch:", uniqueIds);
        const books = await Promise.all(
          uniqueIds.map(async (id) => {
            const book = await getBookById(id);
            console.log(`Fetched book for ID ${id}:`, book);
            return book ? { ...book, quantity: bookCounts[id] } : null;
          })
        );

        const filteredBooks = books.filter(
          (book): book is Book & { quantity: number } => book !== null
        );
        console.log("Final cart books:", filteredBooks);
        setCartBooks(filteredBooks);
      } catch (error) {
        console.error("Error fetching cart books:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCartBooks();
  }, [items]);

  // Debug log for cart state
  console.log("Current cart state:", { items, cartBooks, isLoading });

  const total = cartBooks.reduce(
    (sum, book) => sum + book.price * book.quantity,
    0
  );

  if (isLoading) {
    return <div>Loading cart...</div>;
  }

  if (cartBooks.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-4">
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
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(book.id)}
                  className="text-destructive"
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator />

      <div className="flex justify-between items-center">
        <div>
          <p className="text-lg font-semibold">Total: ${total.toFixed(2)}</p>
        </div>
        <div className="space-x-4">
          <Button variant="outline" onClick={clear}>
            Clear Cart
          </Button>
          <Button onClick={() => router.push("/checkout")}>Checkout</Button>
        </div>
      </div>
    </div>
  );
}
