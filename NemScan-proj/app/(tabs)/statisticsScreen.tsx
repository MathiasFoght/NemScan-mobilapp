import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, RefreshControl, Text, SafeAreaView, LayoutChangeEvent } from 'react-native';
import "@/i18n/i18n.config";
import { useTranslation } from 'react-i18next';
import { Toast } from '@/src/components/toast/toast';
import { getTopScannedProductToday, getLowStockProducts, getProductGroupDistribution, getIncreasingErrorRateProducts } from '@/src/services/statistics/statisticsService';
import { getTodayReportCount } from '@/src/services/report/reportService';
import { ErrorRateTrend, ProductGroupStat, LowStockProduct } from '@/src/services/statistics/interfaces';
import { KeyMetrics } from '@/src/components/keyMetrics/keyMetrics';
import { ProductGroupDistribution } from '@/src/components/productGroupDistribution/productGroupDistribution';
import { LowStockProducts } from '@/src/components/lowStockProducts/lowStockProducts';
import { IncreasingErrorProducts } from '@/src/components/increasingErrorProducts/increasingErrorProducts';
import styles from '@/src/styles/screens/statisticsScreen.styles';

export default function StatisticsScreen() {
    const { t } = useTranslation(["screens", "common"]);
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
            console.error('Error fetching statistics:', err);
            setError(t("common:errors.errorFetching"));
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
            <Toast type="loading" message={t('common:loading')} visible={loading} />
            <Toast type="error" message={error || ''} visible={!!error} />

            <SafeAreaView style={styles.headerContainer} onLayout={handleHeaderLayout}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>{t("screens:statistics.title")}</Text>
                    <Text style={styles.headerSubtitle}>{t("screens:statistics.subtitle")}</Text>
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
                <KeyMetrics />

                <IncreasingErrorProducts daysFilter={7} />

                <ProductGroupDistribution />

                <LowStockProducts />
            </ScrollView>
        </View>
    );
}
