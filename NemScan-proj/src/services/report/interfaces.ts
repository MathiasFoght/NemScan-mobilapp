export interface FrequentErrorProduct {
    productNumber: string;
    productName: string
    errorCount: number;
    percentage: number;
}

export interface ErrorPattern {
    reportType: string;
    label: string;
    count: number;
    percentage: number;
}