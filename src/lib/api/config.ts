'use server'

import axios from "axios"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || ""
if (!API_BASE_URL) {
    throw new Error("API base URL is not defined. Please set NEXT_PUBLIC_API_BASE_URL in your environment variables.")
}
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


export { api }