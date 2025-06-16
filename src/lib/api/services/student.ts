"use server";
import { api } from "@/lib/api/config";
import { PermitResponse, ServiceResponse } from "@/lib/types/common";
import { Student } from "@prisma/client";



// create student 
export const createStudent = async (data: Partial<Student>): Promise<ServiceResponse<Student>> => {
    try {
        const response = await api.post("/api/students", data);
        return response.data;
    } catch (error) {
        console.error("Error creating student:", error);
        return { success: false, error: "Internal server error" };
    }
}


export const findStudentById = async (studentId: string): Promise<Student | null> => {
    try {
        const response = await api.get(`/api/students/${studentId}`)
        return response.data
    } catch (error) {
        console.error("Error fetching student data:", error)
        return null
    }
}

export const getPermit = async (permitCode: string): Promise<PermitResponse> => {
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