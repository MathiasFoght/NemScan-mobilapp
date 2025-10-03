export interface User {
    employeeNumber: string;
    name: string;
    role: string;
}

export interface LoginResponse {
    user: User;
    token: string;
}

export interface AuthContextType {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    userType: 'employee' | 'customer' | null;
    login: (employeeNumber: string) => Promise<void>;
    logout: () => Promise<void>;
    initializeCustomerToken: () => Promise<void>;
}