import { API_URL } from '@/enviroment/config';
import { getToken } from '@/src/services/auth/storageService';

console.log('API URL', API_URL);

export const apiClient = async <T>(
    endpoint: string,
    options: RequestInit = {},
    requireAuth = true
): Promise<T> => {
    const token = requireAuth ? await getToken() : null;
    const isFormData = options.body instanceof FormData;

    const headers: HeadersInit = {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        ...options.headers,
    };

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        console.error(`API Error [${response.status}]:`, await response.text());
        throw new Error(`Request failed: ${response.statusText}`);
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
        return (await response.json()) as T;
    }
    return {} as T;
};
