import { Product } from "@repo/shared"
import React from "react"
import { Card, CardContent } from "@workspace/ui/components/card"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@workspace/ui/components/badge"

interface ProductCardProps {
  product: Product
}
const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link href={`/products/${product.id}`}>
      <Card>
        <div>
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={200}
              height={200}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            ></Image>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300">
                 📦
            </div>
          )}
        </div>
        <CardContent>
            <Badge>
                {product.category}
            </Badge>
            <h3>{product.name}</h3>
            <p>${product.description}</p>
        </CardContent>
      </Card>
    </Link>
  )
}

export default ProductCard
