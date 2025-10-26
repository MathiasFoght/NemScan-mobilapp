import { apiClient } from "../../api/client";
import { ENDPOINTS } from "../../api/endpoints";
import { ProductEmployee, ProductCustomer, CustomerProductResponse, ProductBasic } from "../product/interfaces";
import {getDeviceId} from "@/src/utils/helpers/getDeviceId";

// Get product by barcode from customer
export const getProductCustomer = async (
    barcode: string
): Promise<ProductCustomer> => {
    const url = ENDPOINTS.PRODUCT.CUSTOMER_PRODUCT.replace("{barcode}", barcode);
    const deviceId = await getDeviceId();

    const response = await apiClient<CustomerProductResponse>(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ deviceId }),
    });

    return response.product;
};

// Get product by barcode from employee
export const getProductEmployee = async (
    barcode: string
): Promise<ProductEmployee> => {
    const url = ENDPOINTS.PRODUCT.EMPLOYEE_PRODUCT.replace("{barcode}", barcode);
    const deviceId = await getDeviceId();

    const response = await apiClient<ProductEmployee>(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ deviceId }),
    });

    return response;
};

// Get product image by barcode
export const getProductImage = async (barcode: string): Promise<string> => {
    const url = ENDPOINTS.PRODUCT.IMAGE_PRODUCT.replace("{barcode}", barcode);
    return await apiClient<string>(url, {}, true, false);
};
// Get all products
export const getAllProducts = async (): Promise<ProductBasic[]> => {
    const response = await apiClient<ProductBasic[]>(ENDPOINTS.PRODUCT.ALL_PRODUCTS, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    return response;
};