import {View, Text, TextInput, ScrollView, TouchableOpacity, ActivityIndicator, Image} from "react-native";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import { useAuth } from "@/src/contexts/authContext";
import {MaterialIcons} from "@expo/vector-icons";
import Button from "@/src/ui/button/button";
import styles from "@/src/styles/screens/productNotFoundScreen.styles";
import {colors} from "@/src/shared/global/colors";
import '@/i18n/i18n.config';
import { getAllProducts } from "@/src/services/product/productService";
import { ProductBasic } from "@/src/services/product/interfaces";
import { createReport } from "@/src/services/report/reportService";
import { Toast } from "@/src/components/toast/toast";
import { useTranslation } from "react-i18next";

export default function productNotFoundScreen() {
    const { t } = useTranslation();
    const { userType } = useAuth();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
    const [products, setProducts] = useState<ProductBasic[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const data = await getAllProducts();
                setProducts(data);
            } catch (err) {
                console.error("Failed to fetch products:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSelectProduct = (productNumber: string) => {
        if (selectedProduct === productNumber) {
            setSelectedProduct(null);
        } else {
            setSelectedProduct(productNumber);
        }
    };

    const handleSendProduct = async () => {
        const product = products.find(p => p.productNumber === selectedProduct);
        if (product) {
            try {
                setSubmitting(true);
                
                const reportData = {
                    productNumber: product.productNumber,
                    productName: product.name,
                    userRole: userType || "",
                };
                
                const response = await createReport(reportData);
                
                router.back();
            } catch (err) {
                console.error("Failed to create report:", err);
            } finally {
                setSubmitting(false);
            }
        }
    };

    return (
          <View style={styles.container}>
            <Toast type="loading" message={t('common.loading')} visible={loading} />
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
                <Text style={styles.subText}>
                    Search and select the product from the list below.
                </Text>
                
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
                                key={item.productNumber}
                                style={[
                                    styles.productItem,
                                    selectedProduct === item.productNumber && styles.productItemSelected
                                ]}
                                onPress={() => handleSelectProduct(item.productNumber)}
                            >
                                {item.imageUrl ? (
                                    <Image
                                        source={{ uri: item.imageUrl }}
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
                                    selectedProduct === item.productNumber && styles.productNameSelected
                                ]}>
                                    {item.name}
                                </Text>
                                {selectedProduct === item.productNumber && (
                                    <MaterialIcons 
                                        name="check-circle" 
                                        size={24} 
                                        color={colors.white} 
                                    />
                                )}
                            </TouchableOpacity>
                        ))
                    ) : (
                          [1, 2, 3].map((index) => (
                            <View key={index} style={styles.productItemSkeleton}>
                                <View style={styles.skeletonImage} />
                                <View style={styles.skeletonTextContainer}>
                                    <View style={styles.skeletonText} />
                                    <View style={styles.skeletonTextShort} />
                                </View>
                            </View>
                        ))
                    )}
                </ScrollView>

                <View style={styles.buttonContainer}>
                    <Button
                        onPress={handleSendProduct}
                        title={submitting ? "Sender..." : "Send Report"}
                        variant="primary"
                        disabled={selectedProduct === null || submitting}
                        style={[
                            styles.sendButton,
                            (selectedProduct === null || submitting) && styles.sendButtonDisabled
                        ]}
                    />
                </View>
        </View>
    );
}