import ProductForm from "@/components/ProductForm"
import { api } from "@/lib/api"
import Link from "next/link"
import { notFound } from "next/navigation"

interface EditPageProps {
  params: Promise<{ id: string }>
}
const page = async ({ params }: EditPageProps) => {
  const { id } = await params
  let product
  try {
    product = await api.getProduct(id)
  } catch (error) {
    notFound()
  }
  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <Link href="/products" className = "text-sm text-gray-500 hover:text-gray-800">← Back to products</Link>
        <h1>Edit Product</h1>
      </div>
      <ProductForm product={product} />
    </div>
  )
}

export default page
