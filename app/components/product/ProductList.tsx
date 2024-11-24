import ProductCard from "./ProductCard";
import { ProductResponse } from "@/app/types/product";

export const getProducts = async () => {
  const productsResponse = await fetch("https://dummyjson.com/products");

  if (!productsResponse.ok) {
    throw new Error("Failed to fetch products");
  }

  const jsonProductResponse: ProductResponse = await productsResponse.json();

  return jsonProductResponse;
};

export default async function ProductList() {
  const productResponse = await getProducts();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {productResponse.products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}
