'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

function getStorage() {
  if (typeof window === 'undefined') {
    return { getItem: () => null, setItem: () => {}, removeItem: () => {} };
  }
  return window.localStorage;
}

export type CartItem = {
  itemId: string;
  name: string;
  price: number;
  quantity: number;
  isVeg: boolean;
};

type CartState = {
  _hydrated: boolean;
  restaurantSlug: string | null;
  restaurantName: string | null;
  items: CartItem[];
  addItem: (restaurantSlug: string, restaurantName: string, item: { name: string; price: number; isVeg: boolean }) => { needConfirm: boolean };
  removeItem: (itemId: string) => void;
  incrementItem: (itemId: string) => void;
  decrementItem: (itemId: string) => void;
  clearCart: () => void;
  setHydrated: (v: boolean) => void;
  getQuantity: (itemId: string) => number;
  totalCount: () => number;
};

function itemId(restaurantSlug: string, name: string, price: number): string {
  return `${restaurantSlug}-${name}-${price}`;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      _hydrated: false,
      restaurantSlug: null,
      restaurantName: null,
      items: [],

      addItem(restaurantSlug, restaurantName, item) {
        const id = itemId(restaurantSlug, item.name, item.price);
        const { restaurantSlug: currentSlug } = get();
        if (currentSlug != null && currentSlug !== restaurantSlug) {
          return { needConfirm: true };
        }
        set((state) => {
          const nextSlug = state.restaurantSlug ?? restaurantSlug;
          const nextName = state.restaurantName ?? restaurantName;
          const existing = state.items.find((i) => i.itemId === id);
          const nextItems = existing
            ? state.items.map((i) => (i.itemId === id ? { ...i, quantity: i.quantity + 1 } : i))
            : [...state.items, { itemId: id, name: item.name, price: item.price, quantity: 1, isVeg: item.isVeg }];
          return { restaurantSlug: nextSlug, restaurantName: nextName, items: nextItems };
        });
        return { needConfirm: false };
      },

      removeItem(itemIdToRemove) {
        set((state) => {
          const nextItems = state.items.filter((i) => i.itemId !== itemIdToRemove);
          return nextItems.length === 0
            ? { items: nextItems, restaurantSlug: null, restaurantName: null }
            : { items: nextItems };
        });
      },

      incrementItem(itemIdToInc) {
        set((state) => ({
          items: state.items.map((i) =>
            i.itemId === itemIdToInc ? { ...i, quantity: i.quantity + 1 } : i
          ),
        }));
      },

      decrementItem(itemIdToDec) {
        set((state) => {
          const item = state.items.find((i) => i.itemId === itemIdToDec);
          if (!item) return state;
          if (item.quantity <= 1) {
            const nextItems = state.items.filter((i) => i.itemId !== itemIdToDec);
            return {
              items: nextItems,
              ...(nextItems.length === 0 ? { restaurantSlug: null, restaurantName: null } : {}),
            };
          }
          return {
            items: state.items.map((i) =>
              i.itemId === itemIdToDec ? { ...i, quantity: i.quantity - 1 } : i
            ),
          };
        });
      },

      clearCart() {
        set({ restaurantSlug: null, restaurantName: null, items: [] });
      },

      setHydrated(v) {
        set({ _hydrated: v });
      },

      getQuantity(id) {
        const item = get().items.find((i) => i.itemId === id);
        return item ? item.quantity : 0;
      },

      totalCount() {
        return get().items.reduce((sum, i) => sum + i.quantity, 0);
      },
    }),
    {
      name: 'swiggy-cart',
      storage: createJSONStorage(() => getStorage()),
      partialize: (s) => ({
        restaurantSlug: s.restaurantSlug,
        restaurantName: s.restaurantName,
        items: s.items,
      }),
      skipHydration: true,
    }
  )
);

export function getCartItemId(restaurantSlug: string, name: string, price: number): string {
  return itemId(restaurantSlug, name, price);
}
