"use server";
import { api } from "@/lib/api/config";
import { User } from "@prisma/client";

export const getExecutives = async (category?: string): Promise<{
    success: boolean;
    data?: User[];
    error?: string;
    total?: number;
}> => {
    try {
        const params = new URLSearchParams()
        if (category) params.append("category", category)

        const response = await api.get("/api/executives", { params })
        return response.data
    } catch (error: any) {
        console.error("Error fetching executives:", error)

        // Handle specific error responses
        if (error.response?.data?.error) {
            return { success: false, error: error.response.data.error }
        }

        return { success: false, error: "Failed to fetch executives" }
    }
}
