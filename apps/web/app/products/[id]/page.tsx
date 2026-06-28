import { fetchProduct } from "@/lib/api"
import Link from "next/link"
import { notFound } from "next/navigation"
import React from "react"

interface ProductDetailPageProps {
  params: Promise<{ id: string }>
}
const ProductDetailPage = async ({ params }: ProductDetailPageProps) => {
  const { id } = await params
  let product
  try {
    product = await fetchProduct(id)
  } catch (error) {
    notFound()
  }
  return (
    <div className="mx-auto px-8 py-12">
      <Link href={"/"} className="text-sm text-gray-300 hover:underline hover:text-gray-700"> ← Back to products</Link>
      <div className="flex justify-between py-12">
        <div className="w-1/2">
          <div className="flex flex-col items-center justify-center">
            <img
              src={product.imageUrl!}
              alt="product image"
              width={600}
              height={600}
              className="object-contain"
            />
            <div className="w-full py-4 text-center">
              <p className="w-full font-bold">{product.name}</p>
              <span>{product.description}</span>
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <div className="gap-4 rounded-md border-gray-200 py-8">
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p>{product.description}</p>
            <span className="text-lg font-bold">${product.price}</span>
            <p className="font-bold">Category: {product.category}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
