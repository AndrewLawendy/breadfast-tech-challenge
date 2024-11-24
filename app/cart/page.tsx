import ShoppingCart from "../components/cart/ShoppingCart";

export default function CartPage() {
  return (
    <div className="section-cream py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-12 text-[#b0228c] text-center">
          Your Shopping Cart
        </h1>
        <div className="max-w-4xl mx-auto">
          <ShoppingCart />
        </div>
      </div>
    </div>
  );
}
