'use server'

import { StudentData, PaymentResponse, VerifyPaymentResponse } from "@/lib/types"
import axios from "axios"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || ""
// axios.defaults.baseURL = API_BASE_URL


// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add response interceptor for consistent error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error)
    throw error
  },
)

export const findStudentById = async (studentId: string): Promise<StudentData | null> => {
  try {
    const response = await api.get(`/api/students/${studentId}`)
    return response.data as StudentData
  } catch (error) {
    console.error("Error fetching student data:", error)
    return null
  }
}

export const initiatePayment = async (data: {
  studentId: string;
  callback_url: string;
  studentData: {
    name: string;
    email: string;
    course: string;
    level: string;
    number: string;
  };
  amount: number;
  currency: string;
  metadata: {
    permitType: string;
  };
}): Promise<PaymentResponse> => {
  try {
    const response = await api.post('/api/payments/initiate', data)
    return response.data

  } catch (error: any) {
    console.error("Error initiating payment:", error)
    throw new Error(error.response?.data?.error || "Payment initiation failed")
  }
}

export const verifyPayment = async (reference: string): Promise<VerifyPaymentResponse> => {
  try {
    const response = await api.get(`/api/payments/verify/${reference}`)
    return response.data
  } catch (error) {
    console.error("Error verifying payment:", error)
    throw new Error("Payment verification failed")
  }
}

export const getPermit = async (permitCode: string): Promise<any> => {
  try {
    const response = await api.get(`/api/permits/${permitCode}`)
    return response.data
  } catch (error) {
    console.error("Error fetching permit:", error)
    throw new Error("Permit retrieval failed")
  }
}



export const checkStudentStatus = async (studentId: string): Promise<any> => {
  try {
    const response = await api.get(`/api/permits/status?studentId=${studentId}`)
    return response.data
  } catch (error) {
    console.error("Error checking student status:", error)
    throw new Error("Failed to check student status")
  }
}
export const checkPermitStatus = async (permitCode: string): Promise<any> => {
  try {
    const response = await api.get(`/api/permits/status?code=${permitCode}`)
    return response.data
  } catch (error) {
    console.error("Error checking permit status:", error)
    throw new Error("Failed to check permit status")
  }
}


export const getExecutives = async (category?: string): Promise<any> => {
  try {
    const response = await api.get('/api/executives', {
      params: { category }
    })
    return response.data
  } catch (error) {
    console.error("Error fetching executives:", error)
    throw new Error("Failed to fetch executives")
  }
}


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

export interface Event {
  id: number
  title: string
  slug: string
  description: string
  excerpt: string
  image: string
  date: string
  time: string
  location: string
  category: string
  categoryColor: string
  featured: boolean
  published: boolean
  publishedAt: string
  maxAttendees: number
  currentAttendees: number
  createdAt: string
  updatedAt: string
  organizer: {
    username: string
    image: string | null
  }
}

export interface EventsResponse {
  success: boolean
  data: {
    events: Event[]
    total: number
  }
  error?: string
}

export interface EventResponse {
  success: boolean
  data: Event
  error?: string
}

export const getEvents = async ({
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
} = {}): Promise<EventsResponse> => {
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

    const response = await api.get(`/api/events?${params.toString()}`)
    return response.data
  } catch (error) {
    console.error("Error fetching events:", error)
    throw new Error("Failed to fetch events")
  }
}

export const getEvent = async (slug: string): Promise<EventResponse> => {
  try {
    if (!slug) {
      throw new Error("Event slug is required")
    }

    const response = await api.get(`/api/events/${slug}`)
    return response.data
  } catch (error) {
    console.error("Error fetching event:", error)
    throw new Error("Failed to fetch event")
  }
}

export const getFeaturedEvents = async (limit = 5): Promise<EventsResponse> => {
  return getEvents({
    featured: true,
    limit,
    published: true,
  })
}
