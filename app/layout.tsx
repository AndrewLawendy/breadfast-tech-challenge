import "./globals.css";
import { Inter } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "EverMart: Your One-Stop Household Shop",
  description:
    "Discover a wide range of household essentials and more, all in one place at EverMart.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} pt-16`}>
        <CartProvider>
          <Header />
          <main>{children}</main>
        </CartProvider>
        <Footer />
      </body>
    </html>
  );
}
