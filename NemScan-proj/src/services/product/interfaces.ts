export interface Product_Customer {
    clientUid: string;
    name: string;
    number: string;
    uid: string;
}

export interface  Product_Employee extends Product_Customer {
    currentStockQuantity: number;
}

export interface Product_Image {
    imageUrl: string;
}