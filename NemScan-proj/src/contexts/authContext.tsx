import React, { createContext, useState, useContext, useEffect } from 'react';
import { router } from 'expo-router';
import { Employee, AuthContextType } from '@/src/services/auth/interfaces';
import * as authService from '@/src/services/auth/authService';
import { getDeviceId } from '@/src/utils/helpers/getDeviceId';
import {getStoredAuth, getUserType} from "@/src/services/auth/storageService";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<Employee | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [userType, setUserType] = useState<'employee' | 'customer' | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // On app mount - Init. auth
    useEffect(() => {
        initializeAuth().then(r => console.log('Initialize auth on app start'));
    }, []);

    // Init stored auth or init. as customer
    const initializeAuth = async () => {
        try {
            const stored = await getStoredAuth();
            const storedUserType = await getUserType();

            if (stored && storedUserType === 'employee') {
                setUser(stored.user);
                setToken(stored.token);
                setUserType('employee');
            } else {
                await initializeCustomerToken();
            }
        } catch (err) {
            console.error('[Auth] Error loading auth:', err);
            await initializeCustomerToken();
        } finally {
            setIsLoading(false);
        }
    };

    // Init. customer by device ID
    const initializeCustomerToken = async () => {
        try {
            const deviceId = await getDeviceId();
            const token = await authService.getCustomerToken(deviceId);
            setToken(token);
            setUserType('customer');
            setUser(null);
            console.log('[Auth] Initialized customer token');
        } catch (err) {
            console.error('[Auth] Failed to initialize customer token:', err);
        }
    };

    // Employee login
    const login = async (employeeNumber: string) => {
        try {
            const { employee, token } = await authService.login(employeeNumber);
            setUser(employee);
            setToken(token);
            setUserType('employee');
            console.log('[Auth] Employee logged in');
        } catch (err) {
            console.error('[Auth] Login failed:', err);
            throw err;
        }
    };

    // Logout and reset to customer
    const logout = async () => {
        try {
            await authService.logout();
            setUser(null);
            setUserType(null);
            await initializeCustomerToken();
            router.dismissAll();
            router.replace('/');
            console.log('[Auth] Logged out and reset to customer');
        } catch (err) {
            console.error('[Auth] Logout failed:', err);
        }
    };

    const value: AuthContextType = {
        user,
        token,
        isLoading,
        userType,
        login,
        logout,
        initializeCustomerToken,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};
