export interface Employee {
    employeeNumber: string;
    name: string;
    role: string;
    position: string;
    storeNumber: string;
}

export interface LoginResponse {
    employee: Employee;
    token: string;
}

export interface AuthContextType {
    user: Employee | null;
    token: string | null;
    isLoading: boolean;
    userType: 'employee' | 'customer' | null;
    login: (employeeNumber: string) => Promise<void>;
    logout: () => Promise<void>;
    initializeCustomerToken: () => Promise<void>;
}