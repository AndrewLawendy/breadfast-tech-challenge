"use client";

import { CartItem, useCart } from "@/app/context/CartContext";
import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import { Product } from "@/app/types/product";
import { useQuery } from "@/app/hooks/useQuery";

interface ShoppingCartItemProps {
  id: number;
  cartItem: CartItem;
}

export const getProduct = async (id: number) => {
  const productResponse = await fetch(`https://dummyjson.com/products/${id}`);

  if (!productResponse.ok) {
    throw new Error("Failed to fetch products");
  }

  const jsonProductResponse: Product = await productResponse.json();

  return jsonProductResponse;
};

export function ShoppingCartItem({ id, cartItem }: ShoppingCartItemProps) {
  const { updateItemQuantity, removeFromCart } = useCart();
  const { data: item } = useQuery(id, () => getProduct(id));

  if (item === undefined) return null;

  return (
    <div
      key={id}
      className="flex items-center justify-between border-b border-gray-100 py-6 first:pt-0"
    >
      <div className="flex items-center gap-6">
        <Image
          src={item.thumbnail}
          alt={item.title}
          width={80}
          height={80}
          className="w-20 h-20 object-cover rounded-xl"
        />
        <div>
          <h3 className="text-xl font-bold text-primary mb-1">{item.title}</h3>
          <p className="text-text-secondary">${item.price.toFixed(2)}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center">
          <button
            onClick={() => updateItemQuantity(item, cartItem.quantity - 1)}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Minus className="h-4 w-4 text-text-secondary" />
          </button>
          <span className="mx-2 font-semibold">{cartItem.quantity}</span>
          <button
            onClick={() => updateItemQuantity(item, cartItem.quantity + 1)}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Plus className="h-4 w-4 text-text-secondary" />
          </button>
        </div>
        <button
          onClick={() => removeFromCart(item.id)}
          className="text-text-secondary hover:text-primary p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}
