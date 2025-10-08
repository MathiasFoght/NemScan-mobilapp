import * as SecureStore from 'expo-secure-store';
import {Employee} from "@/src/services/auth/interfaces";

// Save data by key and value in secure store
export const saveData = async (key: string, value: string): Promise<void> => {
    await SecureStore.setItemAsync(key, value);
    console.log('Data saved:', { key, value });
};

// Hent data by key
export const getData = async (key: string): Promise<string | null> => {
    console.log('Fetching data for key:', key);
    return await SecureStore.getItemAsync(key);
};

// Remove data by key
export const removeData = async (key: string): Promise<void> => {
    console.log('Removing data for key:', key);
    await SecureStore.deleteItemAsync(key);
};

// Get token for API request
export const getToken = async (): Promise<string | null> => {
    console.log('Fetching token from storage');
    return await getData('token');
};

// Get user type
export const getUserType = async (): Promise<'employee' | 'customer' | null> => {
    return (await getData('userType')) as 'employee' | 'customer' | null;
};


// Get stored auth credentials
export const getStoredAuth = async (): Promise<{ token: string; user: Employee } | null> => {
    const token = await getData('token');
    const userJson = await getData('user');

    if (token && userJson) {
        const user: Employee = JSON.parse(userJson);
        console.log('[Storage] Found stored auth for', user.name);
        return { token, user };
    }

    console.log('[Storage] No stored auth found');
    return null;
};

// Remove all auth data from secure storage
export const clearAuthData = async (): Promise<void> => {
    await Promise.all([
        removeData('token'),
        removeData('user'),
        removeData('userType'),
    ]);
    console.log('[Storage] Cleared all auth data');
};