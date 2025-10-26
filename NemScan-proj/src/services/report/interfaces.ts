export interface FrequentErrorProduct {
    productNumber: string;
    productName: string
    errorCount: number;
    percentage: number;
}

export interface CreateReportRequest {
    productNumber: string;
    productName: string;
    userRole: string;
}