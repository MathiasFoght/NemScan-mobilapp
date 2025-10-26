import React, { createContext, useContext, useState, ReactNode } from "react";
import { ProductCustomer, ProductEmployee } from "@/src/services/product/interfaces";

interface ProductContextType {
    customerProduct: ProductCustomer | null;
    employeeProduct: ProductEmployee | null;
    setCustomerProduct: (product: ProductCustomer | null) => void;
    setEmployeeProduct: (product: ProductEmployee | null) => void;
    clearProducts: () => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
    const [customerProduct, setCustomerProductState] = useState<ProductCustomer | null>(null);
    const [employeeProduct, setEmployeeProductState] = useState<ProductEmployee | null>(null);

    const setCustomerProduct = (product: ProductCustomer | null) => {
        setCustomerProductState(product);
        setEmployeeProductState(null); // sikrer at der ikke hænger gammel employee data
    };

    const setEmployeeProduct = (product: ProductEmployee | null) => {
        setEmployeeProductState(product);
        setCustomerProductState(null); // sikrer at der ikke hænger gammel customer data
    };

    const clearProducts = () => {
        setCustomerProductState(null);
        setEmployeeProductState(null);
    };

    return (
        <ProductContext.Provider
            value={{
                customerProduct,
                employeeProduct,
                setCustomerProduct,
                setEmployeeProduct,
                clearProducts,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};

export const useProduct = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error("useProduct must be used within a ProductProvider");
    }
    return context;
};
