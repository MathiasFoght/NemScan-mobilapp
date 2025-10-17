import { apiClient } from '../../api/client';
import { ENDPOINTS } from '../../api/endpoints';
import {Product_Customer, Product_Employee, Product_Image} from '../product/interfaces';
import {API_URL} from "@/enviroment/config";

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
    const url = `${API_URL}/api/Product/image/by-barcode/${barcode}`;
    const response = await fetch(url); // almindelig fetch uden json parsing
    if (!response.ok) throw new Error("Kunne ikke hente billede");
    const imageUrl = await response.text(); // returner rå URL som string
    return imageUrl;
};