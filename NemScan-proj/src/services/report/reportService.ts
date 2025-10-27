import { apiClient } from '@/src/api/client';
import { ENDPOINTS } from "@/src/api/endpoints";
import { CreateReportRequest, FrequentErrorProduct } from "@/src/services/report/interfaces";

// Get most frequently error products
export const getTopFailedProducts = async (): Promise<FrequentErrorProduct[]> => {
    return await apiClient<FrequentErrorProduct[]>(ENDPOINTS.REPORT.TOP_FAILED);
};

// Get today's report count
export const getTodayReportCount = async (): Promise<{ totalReportsToday: number }> => {
    const res = await apiClient<any>(ENDPOINTS.REPORT.TODAY_COUNT);
    return { totalReportsToday: res.totalReportsToday.totalReportsToday };
};

// Create a report
export const createReport = async (
    reportData: CreateReportRequest
): Promise<string> => {
    const response = await apiClient<string>(
        ENDPOINTS.REPORT.CREATE, 
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(reportData),
        },
        true,
        false  
    );

    return response;
};