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
        DELETE: '/api/employee/profile-image',
        ALL_PRODUCTS: '/api/Product/all-products',
    },
    STATISTICS: {
        SCANS: {
            ACTIVITY: '/api/statistics/scans/activity',
            PERFORMANCE: '/api/statistics/scans/performance',
            PRODUCTGROUP_DISTRIBUTION: '/api/statistics/scans/product-group-distribution',
            INCREASING_ERROR_RATE: '/api/statistics/errors/increasing-error-rate',
            TOP_SCANNED_PRODUCT: '/api/statistics/scans/top-product-today',
        },
        LOW_STOCK_PRODUCTS: '/api/statistics/products/low-stock',
    },
    REPORT: {
        TOP_FAILED: '/api/report/top-3-most-failed-products',
        TODAY_COUNT: '/api/report/reports/count-today',
        CREATE: '/api/Report/create',
    },
};
