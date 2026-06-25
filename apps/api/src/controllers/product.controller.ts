import type { Request, Response } from "express"

import { prisma } from "@repo/db"
import type { CreateProductInput, UpdateProductInput } from "@repo/shared"

export async function getProducts(req: Request, res: Response) {
  try {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 12
    const category = req.query.category as string | undefined
    const skip = (page - 1) * limit

    const where = category ? { category } : {}

    const [data, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.product.count({ where }),
    ])

    res.json({
      success: true,
      data: {
        data,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch products",
    })
  }
}

export async function getProductById(req: Request, res: Response) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: req.params.id as string,
      },
    })

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

    const product = await prisma.product.create({
      data: body,
    })

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

  const existing = await prisma.product.findUnique({
    where: {
      id: req.params.id as string,
    },
  })

  if (!existing) {
    return res.status(404).json({
      success: false,
      error: "Product not found",
    })
  }

  try {
    const product = await prisma.product.update({
        where: {
            id: req.params.id as string,
        },
        data: body
    })

    res.json({
        success: true,
        data: product,
        message: "Product updated"
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to update product",
    })
  }
}

export async function deleteProduct(req: Request, res: Response){
    try {
        const existing = await prisma.product.findUnique({
            where: {
                id: req.params.id as string,
            }
        })

        if (!existing) {
            return res.status(404).json({
                success: false,
                error: "Product not found",
            })
        }

        await prisma.product.delete({
            where: {
                id: req.params.id as string,
            }
        })

        res.json({
            success: true,
            message: "Product deleted"
        })
    } catch (error) {
        
    }
}