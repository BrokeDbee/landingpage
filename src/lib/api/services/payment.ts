"use server";
import { api } from "@/lib/api/config";
import { PaymentResponse, VerifyPaymentResponse } from "@/lib/types/common";
import { Student } from "@prisma/client";

export const initiatePayment = async (data: {
    studentId: string;
    callback_url: string;
    studentData: Partial<Student>;
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