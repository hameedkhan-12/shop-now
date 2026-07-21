"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Product } from "@repo/shared"
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@workspace/ui/components/table"
import { api } from "@/lib/api"
import { Badge } from "@workspace/ui/components/badge"

interface ProductsTableProps {
  products: Product[]
}

export function ProductsTable({ products }: ProductsTableProps) {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState<string | null>(null)

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return
    setDeletingId(id)
    try {
      await api.deleteProduct(id)
      router.refresh() // re-fetch server component data
    } catch (err) {
      alert("Failed to delete product")
    } finally {
      setDeletingId(null)
    }
  }

  if (products.length === 0) {
    return (
      <div className="rounded-lg border py-20 text-center text-neutral-800  dark:text-gray-200">
        No products yet.{" "}
        <a href="/products/new" className="text-blue-500 hover:underline">
          Add the first one
        </a>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-lg border shadow-sm">
      <Table className="w-full items-start">
        <TableHeader className="w-full">
          <TableRow className="">
            <TableHead>Product</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead className="">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  {product.imageUrl && (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="h-10 w-10 rounded bg-gray-100 object-cover"
                    />
                  )}
                  <div className="py-4">
                    <p className="font-medium dark:text-gray-200">{product.name}</p>
                    <p className="line-clamp-1 text-xs dark:text-gray-200">
                      {product.description}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="secondary">{product.category}</Badge>
              </TableCell>
              <TableCell className="font-medium">
                ${product.price.toFixed(2)}
              </TableCell>
              <TableCell>
                <span
                  className={`text-sm font-medium ${
                    product.stock === 0 ? "text-red-500" : "text-green-600"
                  }`}
                >
                  {product.stock}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push(`/products/${product.id}/edit`)}
                  >
                    Edit 
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    disabled={deletingId === product.id}
                    onClick={() => handleDelete(product.id, product.name)}
                  >
                    {deletingId === product.id ? "..." : "Delete"}
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
