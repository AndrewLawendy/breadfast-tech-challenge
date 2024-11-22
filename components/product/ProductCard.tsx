"use client";

import Image from "next/image";
import Link from "next/link";

import { Product } from "@/types/product";

export default function ProductCard({
  id,
  title,
  thumbnail,
  price,
  description,
}: Product) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
      <Link href={`/product/${id}`}>
        <Image
          src={thumbnail}
          alt={title}
          width={300}
          height={200}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-6">
        <Link href={`/product/${id}`}>
          <h2 className="text-xl font-bold mb-2 text-primary hover:text-primary-dark transition-colors">
            {title}
          </h2>
        </Link>
        <p className="text-2xl font-bold mb-3 text-text-primary">
          ${price.toFixed(2)}
        </p>
        <p className="text-text-secondary mb-4 line-clamp-2">{description}</p>
        <button
          onClick={() => console.log(`Add ${id} to cart`)}
          className="w-full bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-dark transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
