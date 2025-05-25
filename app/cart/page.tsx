import CartClient from "@/components/CartClient";

export default function CartPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Cart</h1>
      <CartClient />
    </main>
  );
}
