import { apiClient } from '@/src/api/client';
import { ENDPOINTS } from "@/src/api/endoints"
import {
    ErrorRateTrend,
    LowStockProduct,
    ProductGroupStat,
    ScanHeatmapItem,
    ScanPerformance, TopScannedProduct
} from "@/src/services/statistics/interfaces";

// Get weekly scan heatmap
export const getScanWeeklyHeatmap = async (
    from?: string,
    to?: string
): Promise<ScanHeatmapItem[]> => {

    const queryParams = new URLSearchParams();
    if (from) queryParams.append('from', from);
    if (to) queryParams.append('to', to);

    const url = queryParams.toString()
        ? `${ENDPOINTS.STATISTICS.SCANS.WEEKLY_HEATMAP}?${queryParams.toString()}`
        : ENDPOINTS.STATISTICS.SCANS.WEEKLY_HEATMAP;

    return await apiClient<ScanHeatmapItem[]>(url);
};

// Get scan performance
export const getScanPerformance = async (
    from?: string,
    to?: string
): Promise<ScanPerformance> => {

    const queryParams = new URLSearchParams();
    if (from) queryParams.append('from', from);
    if (to) queryParams.append('to', to);

    const url = queryParams.toString()
        ? `${ENDPOINTS.STATISTICS.SCANS.PERFORMANCE}?${queryParams.toString()}`
        : ENDPOINTS.STATISTICS.SCANS.PERFORMANCE;

    return await apiClient<ScanPerformance>(url);
};


// Product group distribution
export const getProductGroupDistribution = async (): Promise<ProductGroupStat[]> => {
    const data = await apiClient<any[]>(ENDPOINTS.STATISTICS.SCANS.PRODUCTGROUP_DISTRIBUTION);

    return data.map(item => ({
        groupName: item.productGroup,
        scanCount: item.scanCount,
        percentage: item.percentage,
    }));
};

// Products with increasing error rate
export const getIncreasingErrorRateProducts = async (
    days = 7
): Promise<ErrorRateTrend[]> => {
    const url = `${ENDPOINTS.STATISTICS.SCANS.INCREASING_ERROR_RATE}?days=${days}`;
    return await apiClient<ErrorRateTrend[]>(url);
};

// Low stock products
export const getLowStockProducts = async (minThreshold = 100): Promise<LowStockProduct[]> => {
    const data = await apiClient<any[]>(
        `${ENDPOINTS.STATISTICS.SCANS.LOW_STOCK_PRODUCTS}?minThreshold=${minThreshold}`
    );

    return data.map(item => ({
        productId: item.productNumber,
        productName: item.productName,
        productGroup: item.productGroup,
        currentStock: item.currentStockQuantity,
        minStock: minThreshold,
    }));
};

// Top scanned product today
export const getTopScannedProductToday = async (): Promise<TopScannedProduct> => {
    return await apiClient<TopScannedProduct>(ENDPOINTS.STATISTICS.SCANS.TOP_SCANNED_PRODUCT);
};
