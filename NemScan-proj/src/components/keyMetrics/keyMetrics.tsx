import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { getTodayReportCount } from "@/src/services/report/reportService";
import { getTopScannedProductToday } from "@/src/services/statistics/statisticsService";
import { Frown } from "lucide-react-native";
import {CountUp} from "@/src/components/countUp/countUp";
import styles from "./keyMetrics.styles";
import "@/i18n/i18n.config";
import {useTranslation} from "react-i18next";

export const KeyMetrics: React.FC = () => {
    const [todayReports, setTodayReports] = useState<number>(0);
    const [mostScannedProduct, setMostScannedProduct] = useState<{ productName: string; scanCount: number } | null>(null);
    const [error, setError] = useState<string | null>(null);
    const { t } = useTranslation(["screens", "common"]);

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
                setError(t("common:errors.errorFetching"));
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
            <View style={styles.card}>
                <Text style={styles.label}>{t("screens:statistics.keyMetrics.todayReports")}</Text>
                <CountUp
                    value={todayReports}
                    duration={2000}
                    delay={200}
                    decimals={0}
                    style={styles.value}
                />
            </View>

            {!mostScannedProduct || !mostScannedProduct.productName || mostScannedProduct.scanCount === 0 ? (
                <View style={[styles.card, styles.centered]}>
                    <Frown size={42} color="#8E8E93" strokeWidth={1.6} />
                    <Text style={styles.noDataText}>{t("screens:statistics.keyMetrics.noScannedProduct")}</Text>
                </View>
            ) : (
                <View style={styles.card}>
                    <Text style={styles.label}>{t("screens:statistics.keyMetrics.mostScannedTitle")}</Text>
                    <Text style={styles.productName}>{mostScannedProduct.productName}</Text>
                    <Text style={styles.scanCount}>{mostScannedProduct.scanCount} {t("screens:statistics.keyMetrics.mostScannedSubtitle")}</Text>
                </View>
            )}
        </View>
    );
};
