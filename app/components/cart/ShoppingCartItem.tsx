"use client";

import { CartItem, useCart } from "@/app/context/CartContext";
import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";

interface ShoppingCartItemProps {
  cartItem: CartItem;
}

export function ShoppingCartItem({ cartItem }: ShoppingCartItemProps) {
  const { updateItemQuantity, removeFromCart } = useCart();

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-100 py-4 sm:py-6 first:pt-0">
      <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto mb-4 sm:mb-0">
        <div className="flex-shrink-0">
          <Image
            src={cartItem.thumbnail}
            alt={cartItem.title}
            width={80}
            height={80}
            className="w-20 h-20 object-cover rounded-xl"
          />
        </div>
        <div className="flex-grow sm:flex-grow-0">
          <h3 className="text-lg sm:text-xl font-bold text-primary mb-1">
            {cartItem.title}
          </h3>
          <p className="text-text-secondary">${cartItem.price.toFixed(2)}</p>
        </div>
      </div>
      <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
        <div className="flex items-center">
          <button
            onClick={() => updateItemQuantity(cartItem, cartItem.quantity - 1)}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Minus className="h-4 w-4 text-text-secondary" />
          </button>
          <span className="mx-2 font-semibold">{cartItem.quantity}</span>
          <button
            onClick={() => updateItemQuantity(cartItem, cartItem.quantity + 1)}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Plus className="h-4 w-4 text-text-secondary" />
          </button>
        </div>
        <button
          onClick={() => removeFromCart(cartItem.id)}
          className="text-text-secondary hover:text-primary p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}
