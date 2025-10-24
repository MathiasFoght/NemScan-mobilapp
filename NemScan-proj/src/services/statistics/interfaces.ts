export interface ScanHeatmapItem {
    day: string;
    period: string;
    count: number;
}

export interface ScanPerformance {
    totalScans: number;
    successfulScans: number;
    failedScans: number;
    successRate: number;
    trend: number;
}

export interface ProductGroupStat {
    groupName: string;
    scanCount: number;
    percentage: number;
}

export interface LowStockProduct {
    productId: string;
    productName: string;
    productGroup: string;
    currentStock: number;
    minStock: number;
}

export interface ErrorRateTrend {
    productNumber: string;
    productName: string;
    currentErrorRate: number;
    previousErrorRate: number;
    trendChange: number;
}

export interface TopScannedProduct {
    productNumber: string;
    productName: string;
    scanCount: number;
}