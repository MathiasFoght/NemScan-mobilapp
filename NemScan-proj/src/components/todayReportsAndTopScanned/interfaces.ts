export interface TodayReportsAndTopScannedProps {
    todayReports?: number;
    mostScannedProduct?: {
        productName: string;
        scanCount: number;
    } | null;
    loading?: boolean;
}