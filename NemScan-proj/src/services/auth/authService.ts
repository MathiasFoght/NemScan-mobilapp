import { apiClient } from '../../api/client';
import { ENDPOINTS } from '../../api/endpoints';
import { saveData, clearAuthData } from './storageService';
import { LoginResponse } from './interfaces';

// Login
export const login = async (employeeNumber: string): Promise<LoginResponse> => {
    const data = await apiClient<LoginResponse>(
        ENDPOINTS.AUTH.LOGIN,
        {
            method: 'POST',
            body: JSON.stringify({ employeeNumber }),
        },
        false
    );

    await saveData('token', data.token);
    await saveData('user', JSON.stringify(data.employee));
    await saveData('userType', 'employee');

    return data;
};

// Get customer token
export const getCustomerToken = async (deviceId: string): Promise<string> => {
    const data = await apiClient<{ token: string }>(
        ENDPOINTS.AUTH.CUSTOMER_TOKEN,
        {
            method: 'POST',
            body: JSON.stringify({ deviceId }),
        },
        false
    );

    await saveData('token', data.token);
    await saveData('userType', 'customer');

    return data.token;
};

// Logout
export const logout = async (): Promise<void> => {
    await clearAuthData();
};
