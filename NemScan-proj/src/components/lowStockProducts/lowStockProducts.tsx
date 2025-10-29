import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Animated } from 'react-native';
import { LowStockProduct } from '@/src/services/statistics/interfaces';
import { getLowStockProducts } from "@/src/services/statistics/statisticsService";
import { LowStockProductsProps } from "@/src/components/lowStockProducts/interfaces";
import styles from "./lowStockProducts.styles";
import { colors } from "@/src/shared/global/colors";
import '@/i18n/i18n.config';
import { useTranslation } from "react-i18next";

const ITEMS_PER_PAGE = 10;

export const LowStockProducts: React.FC<LowStockProductsProps> = ({ minThreshold = 100 }) => {
    const [allProducts, setAllProducts] = useState<LowStockProduct[]>([]);
    const [displayedProducts, setDisplayedProducts] = useState<LowStockProduct[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [newItemsStartIndex, setNewItemsStartIndex] = useState(0);
    const { t } = useTranslation(["screens", "common"]);

    useEffect(() => {
        const loadData = async () => {
            try {
                setError(null);
                setIsLoading(true);
                const data = await getLowStockProducts(minThreshold);
                setAllProducts(data);
                setDisplayedProducts(data.slice(0, ITEMS_PER_PAGE));
                setCurrentPage(1);
                setNewItemsStartIndex(0);
            } catch (err) {
                console.error('Error loading low stock products:', err);
                setError(t("common:errors.errorFetching"));
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, [minThreshold]);

    const loadMore = () => {
        const nextPage = currentPage + 1;
        const startIndex = 0;
        const endIndex = nextPage * ITEMS_PER_PAGE;
        const currentLength = displayedProducts.length;
        setNewItemsStartIndex(currentLength);
        setDisplayedProducts(allProducts.slice(startIndex, endIndex));
        setCurrentPage(nextPage);
    };

    const hasMore = displayedProducts.length < allProducts.length;

    const getCriticalityLevel = (product: LowStockProduct) => {
        const percentage = (product.currentStock / product.minStock) * 100;
        if (percentage <= 25) return 'critical';
        if (percentage <= 50) return 'warning';
        return 'low';
    };

    const getCriticalityColor = (level: string) => {
        switch (level) {
            case 'critical': return colors.lowStcok.critical;
            case 'warning': return colors.lowStcok.warning;
            default: return colors.lowStcok.low;
        }
    };

    const getCriticalityText = (level: string) => {
        switch (level) {
            case 'critical': return t("screens:statistics.lowStockProducts.labels.critical");
            case 'warning': return t("screens:statistics.lowStockProducts.labels.warning");
            default: return t("screens:statistics.lowStockProducts.labels.low");
        }
    };

    const AnimatedCard: React.FC<{ product: LowStockProduct; index: number; shouldAnimate: boolean }> = ({ product, index, shouldAnimate }) => {
        const [slideAnim] = useState(new Animated.Value(shouldAnimate ? 50 : 0));
        const [fadeAnim] = useState(new Animated.Value(shouldAnimate ? 0 : 1));

        useEffect(() => {
            if (shouldAnimate) {
                Animated.parallel([
                    Animated.timing(slideAnim, {
                        toValue: 0,
                        duration: 400,
                        delay: index * 80,
                        useNativeDriver: true,
                    }),
                    Animated.timing(fadeAnim, {
                        toValue: 1,
                        duration: 400,
                        delay: index * 80,
                        useNativeDriver: true,
                    }),
                ]).start();
            }
        }, [shouldAnimate]);

        const level = getCriticalityLevel(product);
        const color = getCriticalityColor(level);
        const levelText = getCriticalityText(level);

        return (
            <Animated.View
                style={{
                    transform: [{ translateY: slideAnim }],
                    opacity: fadeAnim,
                }}
            >
                <View style={styles.productCard}>
                    <View style={styles.productHeader}>
                        <View style={styles.productInfo}>
                            <Text style={styles.productName} numberOfLines={2}>
                                {product.productName}
                            </Text>
                            <Text style={styles.productNumber}>#{product.productId}</Text>
                        </View>

                        <View style={[styles.badge, { backgroundColor: color }]}>
                            <Text style={styles.badgeText}>{levelText}</Text>
                        </View>
                    </View>

                    <View style={styles.stockInfo}>
                        <View style={styles.stockItem}>
                            <Text style={styles.stockLabel}>{t("screens:statistics.lowStockProducts.currentCount")}</Text>
                            <Text style={[styles.stockValue, { color }]}>{product.currentStock}</Text>
                        </View>

                        <View style={styles.stockDivider} />

                        <View style={styles.stockItem}>
                            <Text style={styles.stockLabel}>{t("screens:statistics.lowStockProducts.threshold")}</Text>
                            <Text style={styles.stockValue}>{product.minStock}</Text>
                        </View>
                    </View>

                    <View style={styles.progressBar}>
                        <View
                            style={[
                                styles.progressFill,
                                {
                                    width: `${Math.min((product.currentStock / product.minStock) * 100, 100)}%`,
                                    backgroundColor: color,
                                },
                            ]}
                        />
                    </View>
                </View>
            </Animated.View>
        );
    };

    if (error) {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>{t("screens:statistics.lowStockProducts.title")}</Text>
                </View>
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>{error}</Text>
                </View>
            </View>
        );
    }

    if (isLoading && allProducts.length === 0) {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>{t("screens:statistics.lowStockProducts.title")}</Text>
                </View>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#8E8E93" />
                </View>
            </View>
        );
    }

    if (allProducts.length === 0) {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>{t("screens:statistics.lowStockProducts.title")}</Text>
                </View>
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>{t("screens:statistics.lowStockProducts.noProducts")}</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{t("screens:statistics.lowStockProducts.title")}</Text>
            </View>

            <ScrollView style={styles.listContainer} showsVerticalScrollIndicator={false}>
                {displayedProducts.map((product, index) => {
                    const isNewItem = index >= newItemsStartIndex;
                    const animationIndex = isNewItem ? index - newItemsStartIndex : 0;
                    return (
                        <AnimatedCard
                            key={product.productId}
                            product={product}
                            index={animationIndex}
                            shouldAnimate={isNewItem}
                        />
                    );
                })}

                {hasMore && (
                    <TouchableOpacity
                        style={styles.loadMoreButton}
                        onPress={loadMore}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.loadMoreText}>{t("screens:statistics.lowStockProducts.loadMore")}</Text>
                        <Text style={styles.loadMoreSubtext}>
                            ({allProducts.length - displayedProducts.length} {t("screens:statistics.lowStockProducts.paginationRest")})
                        </Text>
                    </TouchableOpacity>
                )}
            </ScrollView>
        </View>
    );
};
