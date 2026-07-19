import type { Request, Response } from "express"

import type { CreateProductInput, UpdateProductInput } from "@repo/shared"
import { productRepository } from "../repositories/product.repositories.js"

export async function getProducts(req: Request, res: Response) {
  try {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 12
    const category = req.query.category as string | undefined

    const result = await productRepository.getProducts(page, limit, category)

    res.json({
      success: true,
      data: result,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      error: "Failed to fetch productss",
    })
  }
}

export async function getProductById(req: Request, res: Response) {
  try {
    const id = req.params.id as string
    const product = await productRepository.getProductById(id)

    if (!product) {
      return res.status(404).json({
        success: false,
        error: "Product not found",
      })
    }

    res.json({
      success: true,
      data: product,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch product",
    })
  }
}

export async function createProduct(req: Request, res: Response) {
  try {
    const body: CreateProductInput = req.body

    if (!body.name || !body.description || !body.price || !body.category) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields",
      })
    }

    const product = await productRepository.createProduct(body)

    res.status(201).json({
      success: true,
      data: product,
      message: "Product created successfully",
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to create product",
    })
  }
}

export async function updateProduct(req: Request, res: Response) {
  const body: UpdateProductInput = req.body
  const id = req.params.id as string

  const product = await productRepository.updateProduct(id, body)

  if (!product) {
    return res.status(404).json({
      success: false,
      error: "Product not found",
    })
  }
  res.json({
    success: true,
    data: product,
    message: "Product updated",
  })
}

export async function deleteProduct(req: Request, res: Response) {
  const id = req.params.id as string

  const deleted = await productRepository.deleteProduct(id)

  if (!deleted) {
    return res.status(404).json({
      success: false,
      error: "Product not found",
    })
  }
  res.json({
    success: true,
    message: "Product deleted",
  })
}
