import { ProductBasic } from '@/src/services/product/interfaces';

export interface ProductRowProps {
    product: ProductBasic;
    isSelected: boolean;
    onPress: () => void;
}