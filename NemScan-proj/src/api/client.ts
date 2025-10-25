import { API_URL } from '@/enviroment/config'
import {getToken} from "@/src/services/auth/storageService";

console.log('API URL', API_URL);

export const apiClient = async <T>(
    endpoint: string,
    options: RequestInit = {},
    requireAuth = true,
    parseAsJson = true
): Promise<T> => {
    const token = requireAuth ? await getToken() : null;

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
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

    if (parseAsJson) {
        return (await response.json()) as T;
    } else {
        return (await response.text()) as T;
    }

};
