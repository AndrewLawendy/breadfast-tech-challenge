import { Product } from "@/types/product";
import Image from "next/image";

export const ProductCard = ({
  title,
  thumbnail,
  price,
  description,
}: Product) => {
  return (
    <div>
      <span>{title}</span>
      <Image alt={title} src={thumbnail} width={300} height={300} />
      <span>{price}</span>
      <span>{description}</span>
    </div>
  );
};
