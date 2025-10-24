import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ErrorRateTrend } from '@/src/services/statistics/interfaces';
import { getIncreasingErrorRateProducts } from '@/src/services/statistics/statisticsService';
import {IncreasingErrorProductsProps} from "@/src/components/increasingErrorProducts/interfaces";

export const IncreasingErrorProducts: React.FC<IncreasingErrorProductsProps> = ({daysFilter = 7,}) => {
    const [products, setProducts] = useState<ErrorRateTrend[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                setError(null);
                const data = await getIncreasingErrorRateProducts(daysFilter);
                setProducts(data);
            } catch (err) {
                console.error('Error loading increasing error rate products:', err);
                setError('Kunne ikke hente produktdata.');
            }
        };

        loadData();
    }, [daysFilter]);

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Produkter med stigende rapporteringer</Text>
                <Text style={styles.emptyText}>{error}</Text>
            </View>
        );
    }

    if (products.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Produkter med stigende rapporteringer</Text>
                <Text style={styles.emptyText}>Ingen produkter med fejl i perioden</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Produkter med stigende rapporteringer</Text>
            <Text style={styles.subtitle}>De sidste {daysFilter} dage</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {products.map((product, index) => (
                    <View key={product.productNumber} style={styles.card}>
                        <Text style={styles.rank}>#{index + 1}</Text>
                        <Text style={styles.name}>{product.productName}</Text>
                        <Text style={styles.rate}>{product.currentErrorRate.toFixed(1)}%</Text>
                        <Text style={styles.trend}>↑ {product.trendChange.toFixed(1)}%</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { marginBottom: 16, paddingHorizontal: 16 },
    title: { fontSize: 18, fontWeight: '700', marginBottom: 4 },
    subtitle: { fontSize: 13, color: '#8E8E93', marginBottom: 12 },
    card: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 12,
        width: 160,
        marginRight: 12,
        elevation: 2,
    },
    rank: { fontWeight: '700', color: '#FF3B30' },
    name: { fontSize: 15, fontWeight: '600', marginVertical: 4 },
    rate: { fontSize: 18, fontWeight: '700', color: '#FF3B30' },
    trend: { fontSize: 13, color: '#8E8E93' },
    emptyText: { color: '#8E8E93', marginTop: 8 },
});
