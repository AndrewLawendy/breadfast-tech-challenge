"use client";

import Image from "next/image";

import { Product } from "@/app/types/product";
import AddToCartButton from "./AddToCartButton";

export default function ProductCard({
  id,
  title,
  thumbnail,
  price,
  description,
}: Product) {
  return (
    <div className="flex flex-col bg-white rounded-2xl shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
      <Image
        src={thumbnail}
        alt={title}
        width={300}
        height={200}
        className="w-full h-48 object-cover"
      />

      <div className="flex-grow pt-6 px-6 pb-4">
        <h2 className="text-xl font-bold mb-2 text-primary hover:text-primary-dark transition-colors">
          {title}
        </h2>
        <p className="text-2xl font-bold mb-3 text-text-primary">
          ${price.toFixed(2)}
        </p>
        <p className="text-text-secondary line-clamp-2">{description}</p>
      </div>
      <div className="px-6 pb-6">
        <AddToCartButton product={{ id, title, price, thumbnail }} />
      </div>
    </div>
  );
}
