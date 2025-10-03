import React, { createContext, useState, useContext, useEffect } from 'react';
import * as authService from '@/src/api/auth/authService';
import { User, AuthContextType } from '@/src/api/auth/interfaces';
import { getDeviceId } from '@/src/api/helpers/getDeviceId';
import { router } from 'expo-router';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [userType, setUserType] = useState<'employee' | 'customer' | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadAuth().then(r => 'Initial auth loaded');
    }, []);


    const loadAuth = async () => {
        try {
            const stored = await authService.getStoredAuth();
            const storedUserType = await authService.getUserType();

            console.log('Loaded stored auth:', { stored, storedUserType });

            if (stored && storedUserType === 'employee') {
                setUser(stored.user);
                setToken(stored.token);
                setUserType('employee');
                console.log('Loaded user type');
            } else {
                await initializeCustomerToken();
            }
        } catch (error) {
            console.error('Error loading auth:', error);
            await initializeCustomerToken();
        } finally {
            setIsLoading(false);
        }
    };

    const initializeCustomerToken = async () => {
        try {
          const deviceId = await getDeviceId();
          const customerToken = await authService.getCustomerToken(deviceId);
          setToken(customerToken);
          setUserType('customer');
          setUser(null);
        } catch (error) {
          console.error('Error getting customer token:', error);
          throw error;
        }
      };

    const login = async (employeeNumber: string) => {
        const response = await authService.login(employeeNumber);
        setUser(response.user);
        setToken(response.token);
        setUserType('employee');
        console.log('User logged in as employee');
    };

    const logout = async () => {
        await authService.logout();
        setUser(null);
        setUserType(null);
        
        // Når employee logger ud, så henter vi et nyt customer token
        await initializeCustomerToken();
        console.log('Employee logged out and now get a customer token');
        router.dismissAll();
        router.replace('/');
    };

    return (
        <AuthContext.Provider value={{
            user,
            token,
            isLoading,
            userType,
            login,
            logout,
            initializeCustomerToken
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};