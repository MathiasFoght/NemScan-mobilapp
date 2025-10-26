import React, { useCallback, useState } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { getEmployeeProfile } from '@/src/services/employee/employeeService';
import { Header } from '@/src/ui/header/header';
import { Toast } from '@/src/components/toast/toast';
import { PerformanceCard } from '@/src/components/performanceCard/performanceCard';
import { Top3ProductsWithReportsCard } from '@/src/components/top3ProductsWithReportsCard/top3ProductsWithReportsCard';
import { styles } from '@/src/styles/screens/homeScreen.styles';
import { ScanActivityChart } from '@/src/components/scanActivityChart/scanActivityChart';

const MemoizedScanActivityChart = React.memo(ScanActivityChart);

export default function DashboardScreen() {
    const { t } = useTranslation();
    const [employee, setEmployee] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [refreshing, setRefreshing] = useState(false);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const profile = await getEmployeeProfile();
            setEmployee(profile);
            setError(null);
        } catch (err) {
            console.error('Error loading data:', err);
            setError(t('toastErrors.errorFetching'));
        } finally {
            setLoading(false);
        }
    }, [t]);

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [fetchData])
    );

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchData();
        setRefreshing(false);
    };

    return (
        <View style={styles.container}>
            <Toast type="loading" message={t('common.loading')} visible={loading} />
            <Toast type="error" message={error || ''} visible={!!error} />

            {employee && <Header {...employee} />}

            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <View style={styles.content}>
                    <View collapsable={false} style={{ overflow: 'hidden', zIndex: 1 }}>
                        <MemoizedScanActivityChart />
                    </View>

                    <View style={styles.cardsRow}>
                        <PerformanceCard />
                        <Top3ProductsWithReportsCard />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
