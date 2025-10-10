import { apiClient } from '../../api/client';
import { ENDPOINTS } from '../../api/endpoints';
import { EmployeeProfile } from './interfaces';

// Get full employee profile
export const getEmployeeProfile = async (): Promise<EmployeeProfile> => {
    return await apiClient<EmployeeProfile>(ENDPOINTS.EMPLOYEE.PROFILE);
};
