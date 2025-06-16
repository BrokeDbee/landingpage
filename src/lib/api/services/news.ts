"use server";
import { api } from "@/lib/api/config";

export interface NewsArticle {
    id: number
    title: string
    slug: string
    content: string
    excerpt: string
    image: string
    category: string
    categoryColor: string
    featured: boolean
    published: boolean
    publishedAt: string
    readTime: string
    createdAt: string
    updatedAt: string
    author: {
        username: string
        image: string | null
    }
}

export interface NewsResponse {
    success: boolean
    data: {
        articles: NewsArticle[]
        total: number
    }
    error?: string
}

export interface ArticleResponse {
    success: boolean
    data: NewsArticle
    error?: string
}

export const getNewsArticles = async ({
    page = 1,
    limit = 10,
    featured,
    category,
    search,
    published = true,
}: {
    page?: number
    limit?: number
    featured?: boolean
    category?: string
    search?: string
    published?: boolean
} = {}): Promise<NewsResponse> => {
    try {
        const params = new URLSearchParams()
        params.append("page", page.toString())
        params.append("limit", limit.toString())
        params.append("published", published.toString())

        if (featured !== undefined) {
            params.append("featured", featured.toString())
        }
        if (category) {
            params.append("category", category)
        }
        if (search) {
            params.append("search", search)
        }

        const response = await api.get(`/api/news?${params.toString()}`)
        return response.data
    } catch (error) {
        console.error("Error fetching news articles:", error)
        throw new Error("Failed to fetch news articles")
    }
}

export const getArticle = async (slug: string): Promise<ArticleResponse> => {
    try {
        if (!slug) {
            throw new Error("Article slug is required")
        }

        const response = await api.get(`/api/news/${slug}`)
        return response.data
    } catch (error) {
        console.error("Error fetching article:", error)
        throw new Error("Failed to fetch article")
    }
}

export const getFeaturedArticles = async (limit = 5): Promise<NewsResponse> => {
    return getNewsArticles({
        featured: true,
        limit,
        published: true,
    })
} 