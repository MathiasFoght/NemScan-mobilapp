import { View, Text, ActivityIndicator, Image, ScrollView } from "react-native";
import {router, useLocalSearchParams} from "expo-router";
import React, { useEffect, useState } from "react";
import { getProductCustomer, getProductImage } from "@/src/services/product/productService";
import { Product_Customer } from "@/src/services/product/interfaces";
import { styles } from "@/src/styles/screens/productScreen.styles";
import { colors } from "@/src/shared/global/colors";
import {MaterialIcons} from "@expo/vector-icons";
import Button from "@/src/ui/button/button";

export default function ProductScreen() {
    const { barcode } = useLocalSearchParams<{ barcode: string }>();
    const [product, setProduct] = useState<Product_Customer | null>(null);
    const [productImageUrl, setProductImageUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response: any = await getProductCustomer(barcode);

                const prod: Product_Customer = response.product || response;
                setProduct(prod);

                try {
                    const img: string = await getProductImage(barcode);
                    setProductImageUrl(img);
                } catch {
                    setProductImageUrl(null); // fallback mode
                }

            } catch {
                setError("Kunne ikke hente produktdata");
            } finally {
                setLoading(false);
            }
        };

        if (barcode) fetchProduct();
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
                <Text style={styles.error}>Ingen produktdata fundet</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>

            <View style={styles.topSection}>
                <View style={styles.buttonContainer}>
                    <Button
                        onPress={router.back}
                        icon={<MaterialIcons name="arrow-back-ios-new" size={24} color="#ffff" />}
                        iconPosition="left"
                        variant="simple"
                        style={{ height: 40 }}
                    />
                </View>
                <View style={styles.imageContainer}>
                    {/* 💡 fallback-image */}
                    {productImageUrl ? (
                        <Image
                            source={{ uri: productImageUrl }}
                            style={styles.image}
                            resizeMode="contain"
                        />
                    ) : (
                        <MaterialIcons
                            name="question-mark"
                            size={60}
                            color="#bbb"
                        />
                    )}
                </View>
            </View>

            {/* Bottom section med produktinfo */}
            <ScrollView
                style={styles.bottomSection}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
            >
                <Text style={styles.title}>{product.productName}</Text>

                {/* Price Card - highlighted */}
                <View style={styles.priceCard}>
                    <Text style={styles.priceLabel}>Pris</Text>
                    <Text style={styles.priceValue}>{product.currentSalesPrice} kr</Text>
                </View>

                {/* Additional Info Card */}
                <View style={styles.infoCard}>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Kategori</Text>
                        <Text style={styles.infoValue}>{product.productGroup}</Text>

                    </View>

                    {product.productGroup && (
                        <>
                            <View style={styles.divider} />
                            <View style={styles.infoRow}>
                                <Text style={styles.infoLabel}>Stregkode</Text>
                                <Text style={styles.infoValue}>{barcode}</Text>
                            </View>
                        </>
                    )}
                </View>

                {/* Campaigns Section */}
                {product.campaigns && product.campaigns.length > 0 && (
                    <>
                        {product.campaigns.map((campaign, index) => (
                            <View key={campaign.uid || index} style={styles.campaignCard}>
                                <View style={styles.campaignHeader}>
                                    <Text style={styles.campaignName}>{campaign.name}</Text>
                                    <View style={styles.discountBadge}>
                                        <Text style={styles.discountText}>-{campaign.discountInPercentage}%</Text>
                                    </View>
                                </View>

                                <View style={styles.campaignDetails}>
                                    <View style={styles.campaignRow}>
                                        <Text style={styles.campaignLabel}>Start</Text>
                                        <Text style={styles.campaignValue}>
                                            {new Date(campaign.fromDate).toLocaleDateString('da-DK', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric'
                                            })}
                                        </Text>
                                    </View>
                                    <View style={styles.campaignRow}>
                                        <Text style={styles.campaignLabel}>Slut</Text>
                                        <Text style={styles.campaignValue}>
                                            {new Date(campaign.toDate).toLocaleDateString('da-DK', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric'
                                            })}
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

                {/* You can add more info cards here for other product details */}
            </ScrollView>
        </View>
    );
}