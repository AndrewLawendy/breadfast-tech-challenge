import ProductList from "@/components/product/ProductList";

export default function Home() {
  return (
    <>
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-primary mb-6">
            Welcome to EverMart
          </h1>
          <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
            Your one-stop shop for household essentials and more
          </p>
        </div>
      </section>

      <section className="section-cream py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary mb-12 text-center">
            Our Products
          </h2>
          <ProductList />
        </div>
      </section>
    </>
  );
}
