import React, { createContext, useContext, useState, ReactNode } from "react";
import { ProductCustomer } from "@/src/services/product/interfaces";

interface ProductContextType {
    product: ProductCustomer | null;
    setProduct: (product: ProductCustomer | null) => void;
    clearProduct: () => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
    const [product, setProductState] = useState<ProductCustomer | null>(null);

    const setProduct = (product: ProductCustomer | null) => {
        setProductState(product);
    };

    const clearProduct = () => {
        setProductState(null);
    };

    return (
        <ProductContext.Provider value={{ product, setProduct, clearProduct }}>
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
