import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AlertCircle } from 'lucide-react-native';
import { getTopFailedProducts } from '@/src/services/report/reportService';
import { FrequentErrorProduct } from '@/src/services/report/interfaces';
import styles from './top3ProductsWithReportsCard.styles';

export const Top3ProductsWithReportsCard: React.FC = () => {
    const [topProducts, setTopProducts] = useState<FrequentErrorProduct[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getTopFailedProducts();
                setTopProducts(data);
            } catch (err) {
                console.error('Failed to load top products:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <View style={styles.card}>
            <LinearGradient
                colors={['#10B981', '#34D399'] as [string, string]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradient}
            >
                <View style={styles.header}>
                    <View style={styles.iconWrapper}>
                        <AlertCircle size={20} color="#fff" strokeWidth={2.5} />
                    </View>
                    <Text style={styles.title}>Mest{'\n'}rapporteret</Text>
                </View>

                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : topProducts.length === 0 ? (
                    <Text style={{ textAlign: 'center', color: '#e5e5e5' }}>Ingen data</Text>
                ) : (
                    <View>
                        {topProducts.map((p, i) => {
                            const color =
                                p.percentage > 25
                                    ? '#fa6464'
                                    : p.percentage > 10
                                        ? '#effb7f'
                                        : '#15ffaa';
                            return (
                                <View key={i} style={styles.row}>
                                    <View style={[styles.dot, { backgroundColor: color }]} />
                                    <Text numberOfLines={1} style={styles.name}>
                                        {p.productName}
                                    </Text>
                                    <Text style={styles.rate}>{p.percentage}%</Text>
                                </View>
                            );
                        })}
                    </View>
                )}
            </LinearGradient>
        </View>
    );
};
