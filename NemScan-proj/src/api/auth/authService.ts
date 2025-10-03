import { User, LoginResponse } from './interfaces';
import { saveData, getData, removeData } from './storageService';
import { API_URL } from '../helpers/config';

console.log('API_URL:', API_URL);

export const login = async (employeeNumber: string): Promise<LoginResponse> => {
    const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employeeNumber }),
    });

    if (!response.ok) {
        throw new Error('Login fejlede');
    }

    const data: LoginResponse = await response.json();
    console.log(data.user);
    console.log(data.token);

    await saveData('token', data.token);
    await saveData('user', JSON.stringify(data.user));
    await saveData('userType', 'employee');

    return data;
};

export const getCustomerToken = async (deviceId: string): Promise<string> => {
    const response = await fetch(`${API_URL}/api/auth/customerToken`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deviceId }),
    });

    if (!response.ok) {
        throw new Error('Kunne ikke hente kunde token');
    }

    const data = await response.json();
    console.log('Customer token received:', data.token);

    // Gem customer token
    await saveData('token', data.token);
    await saveData('userType', 'customer');

    return data.token;
};

export const logout = async () => {
    await removeData('token');
    await removeData('user');
    await removeData('userType');
    console.log('User logged out and data cleared');
};

export const getStoredAuth = async (): Promise<{ token: string; user: User } | null> => {
    const token = await getData('token');
    const userJson = await getData('user');

    if (token && userJson) {
        console.log('Stored auth was found:', { token, user: JSON.parse(userJson) });
        return { token, user: JSON.parse(userJson) };
    }

    console.log('Stored auth was not found');
    return null;
};

export const getToken = async (): Promise<string | null> => {
    console.log('Fetching token from storage');
    return await getData('token');
};

export const getUserType = async (): Promise<'employee' | 'customer' | null> => {
    return (await getData('userType')) as 'employee' | 'customer' | null;
};