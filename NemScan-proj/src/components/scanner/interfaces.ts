export interface ScannerProps {
    onScanned: (data: string) => Promise<boolean>;
    paused?: boolean;
}