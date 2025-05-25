import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartStore {
  items: string[];
  addItem: (id: string) => void;
  removeItem: (id: string) => void;
  clear: () => void;
}

export const useCart = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (id: string) =>
        set((state) => ({ items: [...state.items, id] })),
      removeItem: (id: string) =>
        set((state) => ({ items: state.items.filter((item) => item !== id) })),
      clear: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
    }
  )
);
