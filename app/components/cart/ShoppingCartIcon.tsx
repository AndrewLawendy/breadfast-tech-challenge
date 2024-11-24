"use client";

import { useCart } from "@/app/context/CartContext";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function ShoppingCartIcon() {
  const { getTotalItems } = useCart();

  return (
    <Link
      href="/cart"
      className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
    >
      <ShoppingBag className="h-6 w-6" />
      <span className="font-medium">Cart ({getTotalItems()})</span>
    </Link>
  );
}
