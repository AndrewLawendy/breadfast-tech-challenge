"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Product } from "../types/product";
import { simulateRandomError } from "../utils";

export interface CartItem {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
}

interface CartContextValue {
  cart: CartItem[];
  updateItemQuantity: (
    cartItem: Pick<Product, "id" | "title" | "price" | "thumbnail">,
    quantity: number,
  ) => Promise<void>;
  removeFromCart: (id: number) => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  updateCart: (cart: CartItem[]) => Promise<void>;
  refetch: () => void;
  isLoading: boolean;
  error: string | undefined;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
    throw new Error(errorMessage);
  };

  const loadCart = useCallback(async () => {
    setError(undefined);
    const response = await fetch("/api/cart");
    const serverCart: CartItem[] = await response.json();

    if (!response.ok) {
      handleError(`Failed to load cart: ${response.statusText}`);
    }

    setCart(serverCart);
    localStorage.setItem("cart", JSON.stringify(serverCart));
  }, []);

  const refetch = useCallback(async () => {
    setIsLoading(true);
    await loadCart();

    setIsLoading(false);
  }, [loadCart]);

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
    if (simulateRandomError()) {
      setError("Simulated error");
    } else {
      loadCart();
    }
  }, [loadCart]);

  const removeFromCart = useCallback(
    async (id: number) => {
      const currentCart = [...cart];
      const updatedCart = cart.filter((item) => item.id !== id);

      // Optimistic rendering
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      const response = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedCart),
      });

      if (!response.ok) {
        // Optimistic rendering: Handling error
        setCart(currentCart);
        localStorage.setItem("cart", JSON.stringify(currentCart));

        handleError(`HTTP error! status: ${response.statusText}`);
      }
    },
    [cart],
  );

  const updateItemQuantity = useCallback(
    async (
      cartItem: Pick<Product, "id" | "title" | "price" | "thumbnail">,
      quantity: number,
    ) => {
      const { id } = cartItem;

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
        updatedCart.push({ ...cartItem, quantity });
      }

      // Optimistic rendering
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      const response = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedCart),
      });

      if (!response.ok) {
        // Optimistic rendering: Handling error
        setCart(currentCart);
        localStorage.setItem("cart", JSON.stringify(currentCart));

        handleError(`HTTP error! status: ${response.statusText}`);
      }
    },
    [cart, removeFromCart],
  );

  const updateCart = useCallback(async (cart: CartItem[]) => {
    const currentCart = [...cart];

    // Optimistic rendering
    setCart(cart);
    localStorage.setItem("cart", JSON.stringify(cart));

    const response = await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cart),
    });

    if (!response.ok) {
      // Optimistic rendering: Handling error
      setCart(currentCart);
      localStorage.setItem("cart", JSON.stringify(currentCart));

      handleError(`HTTP error! status: ${response.statusText}`);
    }
  }, []);

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
        updateCart,
        refetch,
        getTotalItems,
        getTotalPrice,
        isLoading,
        error,
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
