import { ProductCard } from "@/components/product/ProductCard";
import { ProductResponse } from "@/types/product";

export const getProducts = async () => {
  const productsResponse = await fetch("https://dummyjson.com/products", {
    cache: "no-store",
  });

  if (!productsResponse.ok) {
    throw new Error("Failed to fetch products");
  }

  const jsonProductResponse: ProductResponse = await productsResponse.json();

  return jsonProductResponse;
};

export default async function Home() {
  const productResponse = await getProducts();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div>
          {productResponse.products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </main>
    </div>
  );
}
