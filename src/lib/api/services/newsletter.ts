"use server";
import { api } from "@/lib/api/config";
import { ServiceResponse } from "@/lib/types/common";



export const subscribeToNewsletter = async (email: string,
    name?: string,
    studentId?: string
): Promise<ServiceResponse<{ message: string }>> => {
    try {
        const response = await api.post('/api/newsletter/subscribe', { email, name, studentId });

        return response.data;
    } catch (error: any) {
        console.error("Error subscribing to newsletter:", error);
        return { success: false, error: error.response?.data?.error || "Subscription failed" };
    }
};


export const confirmNewsletterSubscription = async (token: string): Promise<ServiceResponse<{ message: string }>> => {
    try {
        const response = await api.post(`/api/newsletter/confirm/${token}`);
        return response.data;
    } catch (error: any) {
        console.error("Error confirming newsletter subscription:", error);
        return { success: false, error: error.response?.data?.error || "Confirmation failed" };
    }
};


export const unsubscribeFromNewsletter = async (email: string): Promise<ServiceResponse<{ message: string }>> => {
    try {
        const response = await api.post('/api/newsletter/unsubscribe', { email });
        return response.data;
    } catch (error: any) {
        console.error("Error unsubscribing from newsletter:", error);
        return { success: false, error: error.response?.data?.error || "Unsubscription failed" };
    }
};
