export interface Product_Customer {
    productName: string;
    currentSalesPrice: number;
    productGroup: string;
    campaigns: Campaigns[];
}

export interface Campaigns {
    uid: string;
    name: string;
    fromDate: string;
    toDate: string;
    activateAtQuantity: number;
    discountInPercentage: number;
}

export interface Product_Employee extends Product_Customer {
    productNumber: string;
    currentStockQuantity: number;
}