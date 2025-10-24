export interface ErrorPattern {
    label: string;
    count: number;
}

export interface AnimatedErrorRowProps {
    error: ErrorPattern;
    percent: number;
    delay: number;
}