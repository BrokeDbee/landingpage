"use server";
import { api } from "@/lib/api/config";
import { ServiceResponse } from "@/lib/types/common";

export interface PublicConfig {
    appName: string;
    appDescription: string | null;
    appLogo: string | null;
    appFavicon: string | null;
    socialLinks: Record<string, string> | null;
    contactInfo: {
        email: string | null;
        phone: string | null;
        address: string | null;
        website: string | null;
    } | null;
    semesterConfig: {
        currentSemester: string;
        academicYear: string;
        startDate: Date;
        endDate: Date;
        isActive: boolean;
    } | null;
    permitConfig: {
        defaultAmount: number;
        currency: string;
    } | null;
}

export type ConfigResponse = ServiceResponse<PublicConfig>;

export const getPublicConfig = async (): Promise<ConfigResponse> => {
    try {
        const response = await api.get("/api/config");
        return response.data;
    } catch (error) {
        console.error("Error fetching public config:", error);
        return { success: false, error: "Failed to load configuration" };
    }
}; 