"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Product } from "../types/product";

export interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

interface CartContextValue {
  cart: CartItem[];
  updateItemQuantity: (
    cartItem: Pick<Product, "id" | "title" | "price">,
    quantity: number,
  ) => Promise<void>;
  removeFromCart: (id: number) => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  isLoading: boolean;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCartFromLocalStorage = () => {
      const localCart = localStorage.getItem("cart");
      if (localCart) {
        setCart(JSON.parse(localCart));
      }

      setIsLoading(false);
    };

    loadCartFromLocalStorage();
  }, []);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const response = await fetch("/api/cart");
        const serverCart: CartItem[] = await response.json();

        setCart(serverCart);
        localStorage.setItem("cart", JSON.stringify(serverCart));
      } catch (error) {
        console.error("Failed to load cart:", error);
      }
    };

    loadCart();
  }, []);

  const updateItemQuantity = async (
    cartItem: Pick<Product, "id" | "title" | "price">,
    quantity: number,
  ) => {
    const { id, title, price } = cartItem;

    if (quantity <= 0) {
      removeFromCart(id); // Automatically remove items with zero or negative quantities
      return;
    }

    const currentCart = [...cart];
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity } : item,
    );

    const itemExists = cart.find((item) => item.id === id);
    if (!itemExists) {
      updatedCart.push({ id, title, price, quantity });
    }

    // Optimistic rendering
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    try {
      await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedCart),
      });
    } catch (error) {
      console.error("Failed to update item quantity:", error);

      // Optimistic rendering: Handling error
      setCart(currentCart);
      localStorage.setItem("cart", JSON.stringify(currentCart));
    }
  };

  const removeFromCart = async (id: number) => {
    const currentCart = [...cart];
    const updatedCart = cart.filter((item) => item.id !== id);

    // Optimistic rendering
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    try {
      await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedCart),
      });
    } catch (error) {
      console.error("Failed to remove item from cart:", error);

      // Optimistic rendering: Handling error
      setCart(currentCart);
      localStorage.setItem("cart", JSON.stringify(currentCart));
    }
  };

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce(
      (totalPrice, { price, quantity }) => totalPrice + price * quantity,
      0,
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        updateItemQuantity,
        removeFromCart,
        getTotalItems,
        getTotalPrice,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};
