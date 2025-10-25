import { apiClient } from '../../api/client';
import { ENDPOINTS } from '../../api/endpoints';
import {Product_Customer, Product_Employee} from '../product/interfaces';

// Get full employee profile
export const getProductCustomer = async (barcode: string): Promise<Product_Customer> => {
    const url = ENDPOINTS.PRODUCT.CUSTOMER_PRODUCT.replace("{barcode}", barcode);
    console.log("Fetching product for customer with URL:", url);
    const response = await apiClient<Product_Customer>(url);
    console.log("Received product data for customer:", response);
    return response;
};

export const getProductEmployee = async (barcode: string): Promise<Product_Employee> => {
    const url = ENDPOINTS.PRODUCT.EMPLOYEE_PRODUCT.replace("{barcode}", barcode);
    return await apiClient<Product_Employee>(url);
};

export const getProductImage = async (barcode: string): Promise<string> => {
    const url = ENDPOINTS.PRODUCT.IMAGE_PRODUCT.replace("{barcode}", barcode);
    return await apiClient<string>(url, {}, true, false);
};