import Link from "next/link";
import ShoppingCartIcon from "./cart/ShoppingCartIcon";

export default function Header() {
  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary">
          EverMart
        </Link>
        <ShoppingCartIcon />
      </div>
    </header>
  );
}
