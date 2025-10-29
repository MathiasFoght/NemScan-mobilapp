import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { ErrorRateTrend } from '@/src/services/statistics/interfaces';
import { getIncreasingErrorRateProducts } from '@/src/services/statistics/statisticsService';
import {IncreasingErrorProductsProps} from "@/src/components/increasingErrorProducts/interfaces";
import styles from "./increasingErrorProducts.styles";
import "@/i18n/i18n.config";
import {useTranslation} from "react-i18next";
export const IncreasingErrorProducts: React.FC<IncreasingErrorProductsProps> = ({daysFilter = 7,}) => {
    const [products, setProducts] = useState<ErrorRateTrend[]>([]);
    const [error, setError] = useState<string | null>(null);
    const { t } = useTranslation(["screens", "common"]);

    useEffect(() => {
        const loadData = async () => {
            try {
                setError(null);
                const data = await getIncreasingErrorRateProducts(daysFilter);
                setProducts(data);
            } catch (err) {
                console.error('Error loading increasing error rate products:', err);
                setError(t("common:errors.errorFetching"));
            }
        };

        loadData();
    }, [daysFilter]);

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{t("screens:statistics.increasingErrorProducts.title")}</Text>
                <Text style={styles.emptyText}>{error}</Text>
            </View>
        );
    }

    if (products.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{t("screens:statistics.increasingErrorProducts.title")}</Text>
                <Text style={styles.emptyText}>{t("screens:statistics.increasingErrorProducts.noProductsWithIncreasingError")}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{t("screens:statistics.increasingErrorProducts.title")}</Text>
            <Text style={styles.subtitle}>{t('screens:statistics.increasingErrorProducts.period', { count: daysFilter })}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {products.map((product, index) => (
                    <View key={product.productNumber} style={styles.card}>
                        <Text style={styles.name}>{product.productName}</Text>
                        <Text style={styles.rate}>{product.currentErrorRate.toFixed(1)}%</Text>
                        <Text style={styles.trend}>↑ {product.trendChange.toFixed(1)}%</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};
