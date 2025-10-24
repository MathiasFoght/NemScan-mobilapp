import {View, Text, TextInput, ScrollView, TouchableOpacity} from "react-native";
import { router } from "expo-router";
import { useState } from "react";
import { useAuth } from "@/src/contexts/authContext";
import {MaterialIcons} from "@expo/vector-icons";
import Button from "@/src/ui/button/button";
import styles from "@/src/styles/screens/productNotFoundScreen.styles";
import {colors} from "@/src/shared/global/colors";
import '@/i18n/i18n.config';

// Hardcoded array til test - erstat senere med API call
const MOCK_PRODUCTS = [
    { id: 1, name: "Coca Cola 330ml" },
    { id: 2, name: "Pepsi Max 500ml" },
    { id: 3, name: "Fanta Orange 330ml" },
    { id: 4, name: "Sprite 500ml" },
    { id: 5, name: "Red Bull Energy Drink" },
    { id: 6, name: "Monster Energy" },
    { id: 7, name: "7UP 330ml" },
    { id: 8, name: "Mountain Dew" },
    { id: 9, name: "Dr Pepper 330ml" },
    { id: 10, name: "Mirinda Orange" },
];

export default function productNotFoundScreen() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedProduct, setSelectedProduct] = useState<number | null>(null);

    const filteredProducts = MOCK_PRODUCTS.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSelectProduct = (productId: number) => {
        if (selectedProduct === productId) {
            setSelectedProduct(null);
            console.log("Product deselected");
        } else {
            setSelectedProduct(productId);
            console.log("Selected product:", MOCK_PRODUCTS.find(p => p.id === productId));
        }
    };

    const handleSendProduct = () => {
        const product = MOCK_PRODUCTS.find(p => p.id === selectedProduct);
        if (product) {
            console.log("Sending product:", product.name, "id:", product.id);
            router.back();
        }
    };

    return (
          <View style={styles.container}>
               <View style={styles.headerBar}>
                    <Button
                        onPress={router.back}
                        icon={<MaterialIcons name="arrow-back-ios-new" size={24} color="#000" />}
                        iconPosition="left"
                        variant="simple"
                        style={{ height: 40 }}
                    />
                    <Text style={styles.headerTitle}>Product Not Found</Text>
                    <View style={styles.placeholder} />
                </View>
                
                <View style={styles.searchContainer}>
                    <MaterialIcons 
                        name="search" 
                        size={24} 
                        color={colors.inactive} 
                        style={styles.searchIcon}
                    />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search for products"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        placeholderTextColor={colors.inactive}
                    />
                    {searchQuery.length > 0 && (
                        <Button
                            onPress={() => setSearchQuery("")}
                            icon={<MaterialIcons name="close" size={20} color={colors.inactive} />}
                            variant="simple"
                            style={styles.clearButton}
                        />
                    )}
                </View>

                <ScrollView 
                    style={styles.productList}
                    contentContainerStyle={styles.productListContent}
                >
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                style={[
                                    styles.productItem,
                                    selectedProduct === item.id && styles.productItemSelected
                                ]}
                                onPress={() => handleSelectProduct(item.id)}
                            >
                                <Text style={[
                                    styles.productName,
                                    selectedProduct === item.id && styles.productNameSelected
                                ]}>
                                    {item.name}
                                </Text>
                                {selectedProduct === item.id && (
                                    <MaterialIcons 
                                        name="check-circle" 
                                        size={24} 
                                        color={colors.white} 
                                    />
                                )}
                            </TouchableOpacity>
                        ))
                    ) : (
                        <View style={styles.emptyState}>
                            <MaterialIcons 
                                name="search-off" 
                                size={48} 
                                color={colors.inactive} 
                            />
                            <Text style={styles.emptyText}>No products found</Text>
                        </View>
                    )}
                </ScrollView>

                <View style={styles.buttonContainer}>
                    <Button
                        onPress={handleSendProduct}
                        title="Send Product"
                        variant="primary"
                        disabled={selectedProduct === null}
                        style={[
                            styles.sendButton,
                            selectedProduct === null && styles.sendButtonDisabled
                        ]}
                    />
                </View>
        </View>
    );
}