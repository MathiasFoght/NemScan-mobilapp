export interface ProductCustomer {
    productName: string;
    currentSalesPrice: number;
    productGroup: string;
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
    productNumber: string;
    currentStockQuantity: number;
}