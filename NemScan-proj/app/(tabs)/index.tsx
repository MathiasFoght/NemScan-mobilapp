import React, { useCallback, useState } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { getEmployeeProfile } from '@/src/services/employee/employeeService';
import { Header } from '@/src/ui/header/header';
import { Toast } from '@/src/components/toast/toast';
import { WeeklyHeatmapChart } from '@/src/components/weeklyHeatmapChart/weeklyHeatmapChart';
import { PerformanceCard } from '@/src/components/performanceCard/performanceCard';
import { TopFailedProductsCard } from '@/src/components/topFailedProductsCard/topFailedProductsCard';
import { ErrorPatternsCard } from '@/src/components/errorPatternsCard/errorPatternsCard';
import { styles } from '@/src/styles/screens/homeScreen.styles';

export default function HomeScreen() {
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

    useFocusEffect(useCallback(() => { fetchData(); }, [fetchData]));

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
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <View style={styles.content}>
                    <WeeklyHeatmapChart />

                    <View style={styles.cardsRow}>
                        <PerformanceCard />
                        <TopFailedProductsCard />
                    </View>

                    <ErrorPatternsCard />
                </View>
            </ScrollView>
        </View>
    );
}
