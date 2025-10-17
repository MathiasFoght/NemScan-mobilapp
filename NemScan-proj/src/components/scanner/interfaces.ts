export interface ScannerProps {
    onScanned: (data: string) => void;
    paused?: boolean;
}