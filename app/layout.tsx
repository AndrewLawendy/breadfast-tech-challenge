import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
