import { apiClient } from '../../api/client';
import { ENDPOINTS } from '../../api/endoints';
import { EmployeeProfile } from './interfaces';

// Get full employee profile
export const getEmployeeProfile = async (): Promise<EmployeeProfile> => {
    return await apiClient<EmployeeProfile>(ENDPOINTS.EMPLOYEE.PROFILE);
};

// Upload employee profile image
export const uploadEmployeeProfileImage = async (file: File): Promise<{ message: string }> => {
    const formData = new FormData();
    formData.append('file', file);

    return await apiClient<{ message: string }>
    (
        ENDPOINTS.EMPLOYEE.UPLOAD,
        {
            method: 'POST',
            body: formData,
        }
    );
};

// Reset profile image for employee
export const deleteEmployeeProfileImage = async (): Promise<{message: string}> => {
    return await apiClient<{message: string}>
    (
        ENDPOINTS.EMPLOYEE.DELETE,
        {
            method: 'DELETE',
        }
    );
}
