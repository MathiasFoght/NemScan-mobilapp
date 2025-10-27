import {View, Text, TextInput, ScrollView, TouchableOpacity, ActivityIndicator, Image} from "react-native";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import { useAuth } from "@/src/contexts/authContext";
import {MaterialIcons} from "@expo/vector-icons";
import Button from "@/src/ui/button/button";
import styles from "@/src/styles/screens/productNotFoundScreen.styles";
import '@/i18n/i18n.config';
import { getAllProducts } from "@/src/services/product/productService";
import { ProductBasic } from "@/src/services/product/interfaces";
import { createReport } from "@/src/services/report/reportService";
import { Toast } from "@/src/components/toast/toast";
import { useTranslation } from "react-i18next";
import { SearchBar } from "@/src/components/searchBar/searchBar";
import { ProductRow } from "@/src/components/productRow/productRow";
import InfoText from "@/src/components/infoText/infoText";
import BottomButton from "@/src/components/bottomButton/bottomButton";

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

                <InfoText text="Search and select the product from the list below." />

                <SearchBar
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholder="Search for products"
                    onClear={() => setSearchQuery("")}
                />

                <ScrollView 
                    style={styles.productList}
                    contentContainerStyle={styles.productListContent}
                >
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((item) => (
                           <ProductRow
                                key={item.productNumber}
                                product={item}
                                isSelected={selectedProduct === item.productNumber}
                                onPress={() => handleSelectProduct(item.productNumber)}
                           />
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

              <BottomButton
                onPress={handleSendProduct}
                title="Send Report"
                submitting={submitting}
                disabled={selectedProduct === null}
                />
        </View>
    );
}