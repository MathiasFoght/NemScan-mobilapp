export interface ToastProps {
    type: 'success' | 'warning' | 'info' | 'error' | 'loading';
    message: string;
    visible: boolean;
}