"use server";
import { api } from "@/lib/api/config";
import { ServiceResponse } from "@/lib/types/common";
import { StudentIdea } from "@prisma/client";
export interface IdeaData {
    studentId: string
    title: string
    description: string
    category: string
}


export interface IdeaWithRelations extends StudentIdea {
    student: {
        name: string
        email: string
        studentId: string
    }
    reviewedBy: {
        name: string
        email: string
    } | null
}

export type IdeasResponse = ServiceResponse<{
    ideas: IdeaWithRelations[];
    total: number;
}>;

export type IdeaResponse = ServiceResponse<IdeaWithRelations>;



export const submitIdea = async (data: IdeaData): Promise<IdeaResponse> => {
    try {
        const response = await api.post("/api/ideas", data);
        return response.data;
    } catch (error) {
        console.error("Error submitting idea:", error);
        return { success: false, error: "Internal server error" };
    }
};