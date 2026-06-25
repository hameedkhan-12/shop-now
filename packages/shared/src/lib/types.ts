export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string | null;
    category: string;
    stock: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface PaginatedProducts {
    data: Product[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

//only for admin
export interface CreateProductInput {
    name: string;
    description: string;
    price: number;
    imageUrl?: string;
    category: string;
    stock: number;
}

export type UpdateProductInput = Partial<CreateProductInput>;

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}