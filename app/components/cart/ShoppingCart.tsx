"use client";

import { useCart } from "@/app/context/CartContext";
import { ShoppingCartItem } from "./ShoppingCartItem";
import { useEffect } from "react";

export default function ShoppingCart() {
  const { cart, updateCart, getTotalItems, getTotalPrice, isLoading } =
    useCart();

  useEffect(() => {
    // Update the cart with the latest item details in case the item owner changed any details
    // like name, thumbnail or especially the price
    // then our customer would proceed with outdated info
    const refreshCartDetails = async () => {
      const updatedCart = [];
      for (const item of cart) {
        const updatedItem = await fetch(
          `https://dummyjson.com/products/${item.id}`,
        ).then((res) => res.json());

        updatedCart.push({
          ...item,
          price: updatedItem.price,
          title: updatedItem.title,
          thumbnail: updatedItem.thumbnail,
        });
      }

      updateCart(updatedCart);
    };

    refreshCartDetails();

    // I only need this on page mount
    // any change in the cart adding or deleting will be with current up to date item info

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <div className="text-center py-12">Loading cart...</div>;
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-8">
      {cart.length === 0 ? (
        <p className="text-center text-text-secondary py-12">
          Your cart is empty.
        </p>
      ) : (
        <>
          {cart.map((item) => (
            <ShoppingCartItem key={item.id} cartItem={item} />
          ))}
          <div className="mt-8 pt-8 border-t border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-bold text-text-primary">
                Total Items
              </span>
              <span className="text-xl font-bold text-primary">
                {getTotalItems()}
              </span>
            </div>
            <div className="flex justify-between items-center mb-8">
              <span className="text-xl font-bold text-text-primary">
                Total Price
              </span>
              <span className="text-2xl font-bold text-primary">
                ${getTotalPrice().toFixed(2)}
              </span>
            </div>
            <button className="w-full bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-dark transition-colors">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
