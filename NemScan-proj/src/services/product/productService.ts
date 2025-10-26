import { apiClient } from '../../api/client';
import { ENDPOINTS } from '../../api/endpoints';
import {ProductEmployee, ProductCustomer, CustomerProductResponse} from '../product/interfaces';

// Get product by barcode from customer
export const getProductCustomer = async (barcode: string): Promise<ProductCustomer> => {
    const url = ENDPOINTS.PRODUCT.CUSTOMER_PRODUCT.replace("{barcode}", barcode);
    const response = await apiClient<CustomerProductResponse>(url);
    return response.product;
};

// Get product by barcode from employee
export const getProductEmployee = async (barcode: string): Promise<ProductEmployee> => {
    const url = ENDPOINTS.PRODUCT.EMPLOYEE_PRODUCT.replace("{barcode}", barcode);
    return await apiClient<ProductEmployee>(url);
};

// Get product image by barcode
export const getProductImage = async (barcode: string): Promise<string> => {
    const url = ENDPOINTS.PRODUCT.IMAGE_PRODUCT.replace("{barcode}", barcode);
    return await apiClient<string>(url, {}, true, false);
};