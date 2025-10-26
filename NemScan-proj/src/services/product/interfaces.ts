export interface ProductCustomer {
    uid: string;
    deviceId: string;
    productNumber: string;
    productName: string;
    productGroup: string;
    productBrand: string;
    currentSalesPrice: number;
    campaigns: Campaigns[];
}

export interface CustomerProductResponse {
    product: ProductCustomer;
    scanLogId: string;
}

export interface Campaigns {
    uid: string;
    name: string;
    fromDate: string;
    toDate: string;
    activateAtQuantity: number;
    discountInPercentage: number;
}

export interface ProductEmployee extends ProductCustomer {
    currentStockQuantity: number;
}
