import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, StyleSheet, RefreshControl, Text, SafeAreaView, LayoutChangeEvent } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Toast } from '@/src/components/toast/toast';
import { getTopScannedProductToday, getLowStockProducts, getProductGroupDistribution, getIncreasingErrorRateProducts } from '@/src/services/statistics/statisticsService';
import { getTodayReportCount } from '@/src/services/report/reportService';
import { ErrorRateTrend, ProductGroupStat, LowStockProduct } from '@/src/services/statistics/interfaces';
import { TodayReportsAndTopScanned } from '@/src/components/todayReportsAndTopScanned/todayReportsAndTopScanned';
import { ProductGroupDistribution } from '@/src/components/productGroupDistribution/productGroupDistribution';
import { LowStockProducts } from '@/src/components/lowStockProducts/lowStockProducts';
import { IncreasingErrorProducts } from '@/src/components/increasingErrorProducts/increasingErrorProducts';

export default function StatisticsScreen() {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [headerHeight, setHeaderHeight] = useState(0);

    const [keyMetrics, setKeyMetrics] = useState({
        todayReports: 0,
        mostScannedProduct: undefined as { productName: string; scanCount: number } | undefined,
    });
    const [errorProducts, setErrorProducts] = useState<ErrorRateTrend[]>([]);
    const [productGroups, setProductGroups] = useState<ProductGroupStat[]>([]);
    const [lowStockProducts, setLowStockProducts] = useState<LowStockProduct[]>([]);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            setError(null);
            const [reports, topProduct, errorTrends, groups, lowStock] = await Promise.all([
                getTodayReportCount(),
                getTopScannedProductToday(),
                getIncreasingErrorRateProducts(),
                getProductGroupDistribution(),
                getLowStockProducts(),
            ]);

            setKeyMetrics({
                todayReports: reports.totalReportsToday,
                mostScannedProduct: topProduct,
            });
            setErrorProducts(errorTrends);
            setProductGroups(groups);
            setLowStockProducts(lowStock);
        } catch (err) {
            console.error('Fejl ved hentning af statistik:', err);
            setError('Kunne ikke hente statistik. Prøv igen.');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, [t]);

    useEffect(() => { fetchData(); }, [fetchData]);

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchData();
        setRefreshing(false);
    };

    const handleHeaderLayout = (event: LayoutChangeEvent) => {
        const { height } = event.nativeEvent.layout;
        setHeaderHeight(height);
    };

    return (
        <View style={styles.root}>
            <Toast type="loading" message={t('common.loading')} visible={loading} />
            <Toast type="error" message={error || ''} visible={!!error} />

            <SafeAreaView style={styles.headerContainer} onLayout={handleHeaderLayout}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Butiksindsigt</Text>
                    <Text style={styles.headerSubtitle}>Få indsigt i statistikker og analyser</Text>
                </View>
            </SafeAreaView>

            <ScrollView
                style={styles.scroll}
                contentContainerStyle={[styles.contentContainer, { paddingTop: headerHeight + 16 }]}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor="#4A90E2"
                        progressViewOffset={headerHeight + 16}
                    />
                }
                showsVerticalScrollIndicator={false}
            >
                <TodayReportsAndTopScanned />

                <IncreasingErrorProducts daysFilter={7} />

                <ProductGroupDistribution />

                <LowStockProducts />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#F2F2F7',
    },
    scroll: {
        flex: 1,
    },
    headerContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        backgroundColor: '#FFFFFF',
        borderBottomColor: '#E5E5EA',
        borderBottomWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 4,
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: 20,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: '#1C1C1E',
        marginBottom: 4,
    },
    headerSubtitle: {
        fontSize: 15,
        color: '#8E8E93',
    },
    contentContainer: {
        paddingBottom: 32,
    },
});
