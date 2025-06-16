"use server";
import { api } from "@/lib/api/config";

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