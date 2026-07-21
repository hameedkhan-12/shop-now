"use client"
import React, { useState } from "react"
import { Product, PRODUCT_CATEGORIES } from "@repo/shared"
import { useRouter } from "next/navigation"
import { api } from "@/lib/api"
import { Label } from "@workspace/ui/components/label"
import { Input } from "@workspace/ui/components/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import { Textarea } from "@workspace/ui/components/textarea"
import { Button } from "./ui/button"
interface ProductFormProps {
  product?: Product
}
const ProductForm = ({ product }: ProductFormProps) => {
  const router = useRouter()
  const isEdit = !!product

  const [form, setForm] = useState({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price?.toString() || "",
    stock: product?.stock?.toString() || "0",
    category: product?.category || "",
    imageUrl: product?.imageUrl || "",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const payload = {
        name: form.name,
        description: form.description,
        price: parseFloat(form.price),
        stock: parseInt(form.stock, 10),
        category: form.category,
        imageUrl: form.imageUrl || undefined,
      }

      if (isEdit && product) {
        await api.updateProduct(product.id, payload)
      } else {
        await api.createProduct(payload)
      }

      router.push("/products")
      router.refresh()
    } catch (error) {
      setError("Failed to create product")
    } finally {
      setLoading(false)
    }
  }
  return (
    <form onSubmit={handleSubmit} className="rounded-lg border shadow-sm p-6 space-y-5">
      {error && (
        <div className="rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="space-y-1.5">
        <Label htmlFor="name">Product Name *</Label>
        <Input
          id="name"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="e.g. Wireless Headphones"
          required
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          value={form.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Describe the product..."
          rows={3}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="price">Price (USD) *</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            min="0"
            value={form.price}
            onChange={(e) => handleChange("price", e.target.value)}
            placeholder="29.99"
            required
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="stock">Stock Quantity *</Label>
          <Input
            id="stock"
            type="number"
            min="0"
            value={form.stock}
            onChange={(e) => handleChange("stock", e.target.value)}
            placeholder="100"
            required
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label>Category *</Label>
        <Select
          value={form.category}
          onValueChange={(val) => handleChange("category", val)}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {PRODUCT_CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="imageUrl">Image URL (optional)</Label>
        <Input
          id="imageUrl"
          type="url"
          value={form.imageUrl}
          onChange={(e) => handleChange("imageUrl", e.target.value)}
          placeholder="https://example.com/image.jpg"
        />
      </div>
      <div>
        <Button>
          {loading
            ? "Loading..."
            : isEdit
              ? "Update Product"
              : "Create Product"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/products")}
          disabled={loading}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}

export default ProductForm
