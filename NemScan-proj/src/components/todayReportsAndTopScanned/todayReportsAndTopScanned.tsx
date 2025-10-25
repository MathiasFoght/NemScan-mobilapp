import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getTodayReportCount } from "@/src/services/report/reportService";
import { getTopScannedProductToday } from "@/src/services/statistics/statisticsService";
import { Frown } from "lucide-react-native";
import CountUp from "@/src/components/countUp/countUp";

export const TodayReportsAndTopScanned: React.FC = () => {
    const [todayReports, setTodayReports] = useState<number>(0);
    const [mostScannedProduct, setMostScannedProduct] = useState<{ productName: string; scanCount: number } | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                setError(null);
                const [reports, topProduct] = await Promise.all([
                    getTodayReportCount(),
                    getTopScannedProductToday(),
                ]);

                setTodayReports(reports.totalReportsToday);

                if (!topProduct || topProduct.scanCount === 0) {
                    setMostScannedProduct(null);
                } else {
                    setMostScannedProduct(topProduct);
                }
            } catch (err) {
                console.error('Error loading key metrics:', err);
                setError('Kunne ikke hente data');
            }
        };

        loadData();
    }, []);

    if (error) {
        return (
            <View style={[styles.container, styles.centered]}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Dagens rapporter */}
            <View style={styles.card}>
                <Text style={styles.label}>Dagens rapporter</Text>
                <CountUp
                    value={todayReports}
                    duration={2000}
                    delay={200}
                    decimals={0}
                    style={styles.value}
                />
            </View>

            {/* Mest scannede produkt */}
            {!mostScannedProduct || !mostScannedProduct.productName || mostScannedProduct.scanCount === 0 ? (
                <View style={[styles.card, styles.centered]}>
                    <Frown size={42} color="#8E8E93" strokeWidth={1.6} />
                    <Text style={styles.noDataText}>Ingen scanninger</Text>
                </View>
            ) : (
                <View style={styles.card}>
                    <Text style={styles.label}>Flest scanninger</Text>
                    <Text style={styles.productName}>{mostScannedProduct.productName}</Text>
                    <Text style={styles.scanCount}>{mostScannedProduct.scanCount} scanninger</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 12,
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        flex: 1,
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
        minHeight: 110,
    },
    label: {
        fontSize: 12,
        color: '#8E8E93',
        marginBottom: 8,
        fontWeight: '500',
    },
    value: {
        fontSize: 32,
        fontWeight: '700',
        color: '#1C1C1E',
    },
    productName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1C1C1E',
        marginBottom: 4,
    },
    scanCount: {
        fontSize: 14,
        color: '#8E8E93',
    },
    noDataText: {
        fontSize: 15,
        color: '#8E8E93',
        fontWeight: '500',
        marginTop: 8,
    },
    errorText: {
        color: '#FF3B30',
        fontSize: 15,
        textAlign: 'center',
    },
});
