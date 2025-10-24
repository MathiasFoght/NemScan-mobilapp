import { apiClient } from '@/src/api/client';
import {ENDPOINTS} from "@/src/api/endoints";
import {ErrorPattern, FrequentErrorProduct} from "@/src/services/report/interfaces";

// Get most frequently error products
export const getTopFailedProducts = async (): Promise<FrequentErrorProduct[]> => {
    return await apiClient<FrequentErrorProduct[]>(ENDPOINTS.REPORT.TOP_FAILED);
};

// Get error patterns
export const getErrorPatterns = async (language?: string): Promise<ErrorPattern[]> => {
    const url = `${ENDPOINTS.REPORT.ERROR_PATTERNS}?language=${language}`;
    return await apiClient<ErrorPattern[]>(url);
};

// Get today's report count
export const getTodayReportCount = async (): Promise<{ totalReportsToday: number }> => {
    const res = await apiClient<any>(ENDPOINTS.REPORT.TODAY_COUNT);
    return { totalReportsToday: res.totalReportsToday.totalReportsToday };
};
