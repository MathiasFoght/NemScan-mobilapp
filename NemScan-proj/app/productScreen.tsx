import { View, Text, ActivityIndicator, Image, ScrollView } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { styles } from "@/src/styles/screens/productScreen.styles";
import { colors } from "@/src/shared/global/colors";
import { MaterialIcons } from "@expo/vector-icons";
import Button from "@/src/ui/button/button";
import { getProductImage, getProductCustomer, getProductEmployee } from "@/src/services/product/productService";
import { useProduct } from "@/src/contexts/productContext";
import { useAuth } from "@/src/contexts/authContext";
import { ProductEmployee, ProductCustomer } from "@/src/services/product/interfaces";

export default function ProductScreen() {
    const { barcode } = useLocalSearchParams<{ barcode: string }>();
    const {
        customerProduct,
        employeeProduct,
        setCustomerProduct,
        setEmployeeProduct
    } = useProduct();
    const { userType } = useAuth();

    const product = userType === "customer" ? customerProduct : employeeProduct;

    const [productImageUrl, setProductImageUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Type-guard for ProductEmployee
    function isEmployeeProduct(product: ProductCustomer | ProductEmployee): product is ProductEmployee {
        return (product as ProductEmployee).currentStockQuantity !== undefined;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                let currentProduct = product;

                // Load produkt hvis context ikke allerede har det
                if (!currentProduct && barcode) {
                    if (userType === "customer") {
                        const res = await getProductCustomer(barcode);
                        setCustomerProduct(res);
                        currentProduct = res;
                    } else {
                        const res = await getProductEmployee(barcode);
                        setEmployeeProduct(res);
                        currentProduct = res;
                    }
                }

                if (!currentProduct) {
                    setError("Ingen produktdata fundet. Prøv at scanne igen.");
                    setLoading(false);
                    return;
                }

                try {
                    const img = await getProductImage(barcode!);
                    setProductImageUrl(img);
                } catch {
                    setProductImageUrl(null);
                }

                setLoading(false);
            } catch {
                setError("Kunne ikke hente produktdata");
                setLoading(false);
            }
        };

        fetchData();
    }, [barcode]);

    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.error}>{error}</Text>
            </View>
        );
    }

    if (!product) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.error}>Ingen produktdata fundet.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.topSection}>
                <View style={styles.buttonContainer}>
                    <Button
                        onPress={router.back}
                        icon={<MaterialIcons name="arrow-back-ios-new" size={24} color="#fff" />}
                        iconPosition="left"
                        variant="simple"
                        style={{ height: 40 }}
                    />
                </View>

                <View style={styles.imageContainer}>
                    {productImageUrl ? (
                        <Image
                            source={{ uri: productImageUrl }}
                            style={styles.image}
                            resizeMode="contain"
                        />
                    ) : (
                        <MaterialIcons name="question-mark" size={60} color="#bbb" />
                    )}
                </View>
            </View>

            <ScrollView
                style={styles.bottomSection}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
            >
                <Text style={styles.title}>{product.productName}</Text>

                <View style={styles.priceCard}>
                    <Text style={styles.priceLabel}>Pris</Text>
                    <Text style={styles.priceValue}>{product.currentSalesPrice} kr</Text>
                </View>

                <View style={styles.infoCard}>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Kategori</Text>
                        <Text style={styles.infoValue}>{product.productGroup}</Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Stregkode</Text>
                        <Text style={styles.infoValue}>{barcode}</Text>
                    </View>

                    {userType === "employee" && isEmployeeProduct(product) && (
                        <>
                            <View style={styles.divider} />
                            <View style={styles.infoRow}>
                                <Text style={styles.infoLabel}>Lagerbeholdning</Text>
                                <Text style={styles.infoValue}>{product.currentStockQuantity} stk.</Text>
                            </View>
                        </>
                    )}
                </View>

                {product.campaigns && product.campaigns.length > 0 && (
                    <>
                        {product.campaigns.map((campaign, index) => (
                            <View key={campaign.uid || index} style={styles.campaignCard}>
                                <View style={styles.campaignHeader}>
                                    <Text style={styles.campaignName}>{campaign.name}</Text>
                                    <View style={styles.discountBadge}>
                                        <Text style={styles.discountText}>
                                            -{campaign.discountInPercentage}%
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.campaignDetails}>
                                    <View style={styles.campaignRow}>
                                        <Text style={styles.campaignLabel}>Start</Text>
                                        <Text style={styles.campaignValue}>
                                            {new Date(campaign.fromDate).toLocaleDateString("da-DK")}
                                        </Text>
                                    </View>

                                    <View style={styles.campaignRow}>
                                        <Text style={styles.campaignLabel}>Slut</Text>
                                        <Text style={styles.campaignValue}>
                                            {new Date(campaign.toDate).toLocaleDateString("da-DK")}
                                        </Text>
                                    </View>

                                    {campaign.activateAtQuantity > 1 && (
                                        <View style={styles.campaignRow}>
                                            <Text style={styles.campaignLabel}>Kræver</Text>
                                            <Text style={styles.campaignValue}>
                                                {campaign.activateAtQuantity} stk.
                                            </Text>
                                        </View>
                                    )}
                                </View>
                            </View>
                        ))}
                    </>
                )}
            </ScrollView>
        </View>
    );
}
