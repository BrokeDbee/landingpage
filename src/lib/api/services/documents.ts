"use server";

import { api } from "@/lib/api/config";
import { PaginatedResponse, ServiceResponse, } from "@/lib/types/common";
import { Document } from "@prisma/client";


export interface DocumentWithRelations extends Document {
    body: any;
    uploadedBy: {
        username: string
        email: string
    }
}



export const getDocuments = async ({
    category,
    page = 1,
    limit = 10,
}: {
    category?: string
    page?: number
    limit?: number
} = {}): Promise<PaginatedResponse<DocumentWithRelations>> => {
    try {
        const params = new URLSearchParams()
        if (category) params.append("category", category)
        params.append("page", page.toString())
        params.append("limit", limit.toString())

        const response = await api.get("/api/documents", {
            params,
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching documents:", error);
        return { success: false, error: "Internal server error" };
    }
};


export const getDocumentById = async (id: number): Promise<ServiceResponse<DocumentWithRelations>> => {
    try {
        const response = await api.get(`/api/documents/${id}`);
        return response.data;
    } catch (error: any) {
        console.log("Error fetching document by ID:", error.response.data);
        console.error("Error fetching document by ID:", error);
        return { success: false, error: "Internal server error" };
    }
};


export const downloadDocument = async (id: number): Promise<string | null> => {
    try {
        const response = await api.get(`/api/documents/${id}/download`, {
            responseType: "blob",
        })

        // Create blob URL for download
        const blob = new Blob([response.data])
        const downloadUrl = window.URL.createObjectURL(blob)

        return downloadUrl
    } catch (error) {
        console.error("Error downloading document:", error)
        return null
    }
}