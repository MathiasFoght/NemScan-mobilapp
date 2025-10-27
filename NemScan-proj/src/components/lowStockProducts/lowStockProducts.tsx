import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { LowStockProduct } from '@/src/services/statistics/interfaces';
import { getLowStockProducts } from "@/src/services/statistics/statisticsService";
import {LowStockProductsProps} from "@/src/components/lowStockProducts/interfaces";
import styles from "./lowStockProducts.styles";

export const LowStockProducts: React.FC<LowStockProductsProps> = ({ minThreshold = 100 }) => {
    const [products, setProducts] = useState<LowStockProduct[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                setError(null);
                const data = await getLowStockProducts(minThreshold);
                setProducts(data);
            } catch (err) {
                console.error('Error loading low stock products:', err);
                setError('Kunne ikke hente produkter med lav lagerbeholdning.');
            }
        };

        loadData();
    }, [minThreshold]);

    const getCriticalityLevel = (product: LowStockProduct) => {
        const percentage = (product.currentStock / product.minStock) * 100;
        if (percentage <= 25) return 'critical';
        if (percentage <= 50) return 'warning';
        return 'low';
    };

    const getCriticalityColor = (level: string) => {
        switch (level) {
            case 'critical': return '#FF3B30';
            case 'warning': return '#FF9500';
            default: return '#FFCC00';
        }
    };

    const getCriticalityText = (level: string) => {
        switch (level) {
            case 'critical': return 'Kritisk lav';
            case 'warning': return 'Advarsel';
            default: return 'Lav';
        }
    };

    if (error) {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Status for lav lagerbeholdning</Text>
                </View>
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>{error}</Text>
                </View>
            </View>
        );
    }

    if (products.length === 0) {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Status for lav lagerbeholdning</Text>
                </View>
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>Alle produkter har tilstrækkelig lagerbeholdning</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Status for lav lagerbeholdning</Text>
            </View>

            <ScrollView style={styles.listContainer} showsVerticalScrollIndicator={false}>
                {products.map((product) => {
                    const level = getCriticalityLevel(product);
                    const color = getCriticalityColor(level);
                    const levelText = getCriticalityText(level);

                    return (
                        <View key={product.productId} style={styles.productCard}>
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
                                    <Text style={styles.stockLabel}>Nuværende</Text>
                                    <Text style={[styles.stockValue, { color }]}>{product.currentStock}</Text>
                                </View>

                                <View style={styles.stockDivider} />

                                <View style={styles.stockItem}>
                                    <Text style={styles.stockLabel}>Minimum</Text>
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
                    );
                })}
            </ScrollView>
        </View>
    );
};