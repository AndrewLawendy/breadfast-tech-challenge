import { useState } from "react";
import { AlertCircle } from "lucide-react";

import { useCart } from "@/app/context/CartContext";
import { Product } from "@/app/types/product";
import { simulateRandomError } from "@/app/utils";

interface AddToCartButtonProps {
  product: Pick<Product, "id" | "title" | "price" | "thumbnail">;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { cart, updateItemQuantity } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAdded, setIsAdded] = useState(false);

  const addToCart = async () => {
    setIsAdding(true);
    setError(null);
    setIsAdded(false);

    const existingItemIndex = cart.findIndex(
      (cartItem) => cartItem.id == product.id,
    );

    try {
      if (simulateRandomError()) {
        throw new Error("Simulated error");
      }

      if (existingItemIndex > -1) {
        await updateItemQuantity(product, cart[existingItemIndex].quantity + 1);
      } else {
        await updateItemQuantity(product, 1);
      }

      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 3000); // Reset success message after 3 seconds
    } catch (error) {
      setError(`Failed to add item to cart. ${error}. Please try again.`);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="space-y-2">
      <button
        onClick={addToCart}
        disabled={isAdding}
        className={`w-full px-6 py-3 rounded-xl text-white font-semibold transition-colors ${
          isAdding
            ? "bg-gray-400"
            : isAdded
              ? "bg-green-500"
              : "bg-[var(--primary)] hover:bg-[var(--primary-dark)]"
        }`}
        aria-live="polite"
      >
        {isAdding
          ? "Adding to Cart..."
          : isAdded
            ? "Added to Cart!"
            : "Add to Cart"}
      </button>
      {error && (
        <div className="flex items-center space-x-2 text-red-500">
          <AlertCircle size={16} />
          <p className="text-sm">{error}</p>
        </div>
      )}
    </div>
  );
}
