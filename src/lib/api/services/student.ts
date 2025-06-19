"use server";
import { api } from "@/lib/api/config";
import { PermitResponse, ServiceResponse } from "@/lib/types/common";
import { Permit, Student } from "@prisma/client";

export interface StudentStatus {
    hasActivePermit: boolean;
    permit?: {
        originalCode: string;
        expiryDate: string;
        issueDate: string;
        permitNumber: string;
        semester: string;
    };
    validity?: {
        daysRemaining: number;
        status: string;
        permit: Permit & {
            student: Student;
            issuedBy: {
                username: string;
            } | null;
        }
    };
    message?: string;
}

export interface PermitStatus {
    valid: boolean;
    permit?: Permit & {
        student: {
            name: string;
            studentId: string;
            course: string;
            level: string;
        };
        expiryDate: string;
        issueDate: string;
        permitNumber: string;
        semester: string;
        academicYear: string;
        status: string;
    };
    reason?: string;
}


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

export const checkStudentStatus = async (studentId: string): Promise<ServiceResponse<StudentStatus>> => {
    try {
        const response = await api.get(`/api/permits/status?studentId=${studentId}`)
        return response.data
    } catch (error) {
        console.error("Error checking student status:", error)
        throw new Error("Failed to check student status")
    }
}

export const checkPermitStatus = async (permitCode: string): Promise<ServiceResponse<PermitStatus>> => {
    try {
        const response = await api.get(`/api/permits/status?code=${permitCode}`)
        return response.data
    } catch (error) {
        console.error("Error checking permit status:", error)
        throw new Error("Failed to check permit status")
    }
} 