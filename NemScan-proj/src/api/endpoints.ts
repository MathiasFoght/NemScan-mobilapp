export const ENDPOINTS = {
    AUTH: {
        LOGIN: '/api/auth/login',
        CUSTOMER_TOKEN: '/api/auth/customerToken',
    },
    EMPLOYEE: {
        PROFILE: '/api/employee/profile',
        UPLOAD: '/api/employee/upload-profile-image',
        DELETE: '/api/employee/profile-image'
    },
    PRODUCT: {
        CUSTOMER_PRODUCT: '/api/Product/customer/by-barcode/{barcode}',
        EMPLOYEE_PRODUCT: '/api/Product/employee/by-barcode/{barcode}',
        IMAGE_PRODUCT: '/api/Product/image/by-barcode/{barcode}',
    },
};
