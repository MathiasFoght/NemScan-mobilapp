import { apiClient } from '@/src/api/client';
import { ENDPOINTS } from "@/src/api/endpoints"
import {
    ErrorRateTrend,
    LowStockProduct,
    ProductGroupStat, ScanActivityResponse,
    ScanPerformance, TopScannedProduct
} from "@/src/services/statistics/interfaces";
import i18n from "i18next";

export const getScanActivity = async (
    periodType: 'week' | 'month' = 'week'
): Promise<ScanActivityResponse> => {
    const url = `${ENDPOINTS.STATISTICS.SCANS.ACTIVITY}?periodType=${periodType}`;
    const data = await apiClient<ScanActivityResponse>(url);

    if (data?.trend?.length) {
        const locale = i18n.language.startsWith('en') ? 'en-US' : 'da-DK';
        data.trend = translateTrendDates(data.trend, locale);
    }

    return data;
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

// Helper function to translate month names
export const monthTranslations: Record<string, Record<string, string>> = {
    'da-DK': {
        jan: 'jan.', feb: 'feb.', mar: 'mar.', apr: 'apr.', maj: 'maj', jun: 'jun.',
        jul: 'jul.', aug: 'aug.', sep: 'sep.', okt: 'okt.', nov: 'nov.', dec: 'dec.'
    },
    'en-US': {
        jan: 'Jan', feb: 'Feb', mar: 'Mar', apr: 'Apr', maj: 'May', jun: 'Jun',
        jul: 'Jul', aug: 'Aug', sep: 'Sep', okt: 'Oct', nov: 'Nov', dec: 'Dec'
    }
};

// Helper function to translate trend dates
const translateTrendDates = (trend: any[], locale: string) => {
    const monthsDA = monthTranslations['da-DK'];
    const monthsEN = monthTranslations['en-US'];
    const targetMonths = monthTranslations[locale];

    return trend.map(item => {
        let newDate = item.dayOrDate;

        for (const [daKey, daValue] of Object.entries(monthsDA)) {
            if (newDate.toLowerCase().includes(daValue.replace('.', '').toLowerCase())) {
                newDate = newDate.replace(daValue, targetMonths[daKey]);
                break;
            }
        }

        return { ...item, dayOrDate: newDate };
    });
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
        `${ENDPOINTS.STATISTICS.LOW_STOCK_PRODUCTS}?minThreshold=${minThreshold}`
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
