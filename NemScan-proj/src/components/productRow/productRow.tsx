import React from 'react';
import { TouchableOpacity, Text, Image, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '@/src/shared/global/colors';
import styles from './productRow.styles';
import { ProductRowProps } from './interfaces';

export const ProductRow: React.FC<ProductRowProps> = ({
    product,
    isSelected,
    onPress,
}) => {
    return (
        <TouchableOpacity
            style={[
                styles.productItem,
                isSelected && styles.productItemSelected
            ]}
            onPress={onPress}
        >
            {product.imageUrl ? (
                <Image
                    source={{ uri: product.imageUrl }}
                    style={styles.productImage}
                    resizeMode="contain"
                />
            ) : (
                <View style={styles.productImagePlaceholder}>
                    <MaterialIcons name="image" size={24} color={colors.inactive} />
                </View>
            )}
            <Text style={[
                styles.productName,
                isSelected && styles.productNameSelected
            ]}>
                {product.name}
            </Text>
            {isSelected && (
                <MaterialIcons 
                    name="check-circle" 
                    size={24} 
                    color={colors.white} 
                />
            )}
        </TouchableOpacity>
    );
};