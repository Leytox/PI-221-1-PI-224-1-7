"use client";
import { useCart } from "@/store/useCart";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AddToCart({ bookId }: { bookId: string }) {
  const { addItem, items } = useCart();
  const [isInCart, setIsInCart] = useState(false);
  const router = useRouter();
  const addToCart = () => {
    addItem(bookId);
    toast.success("Added to cart");
  };

  useEffect(() => {
    setIsInCart(items.includes(bookId));
  }, [items, bookId]);

  return (
    <div className="flex gap-4 pt-4">
      <Button
        variant={isInCart ? "outline" : "default"}
        size="lg"
        className="flex-1"
        onClick={() => (isInCart ? router.push("/cart") : addToCart())}
      >
        {isInCart ? "View Cart" : "Add to Cart"}
      </Button>
    </div>
  );
}
