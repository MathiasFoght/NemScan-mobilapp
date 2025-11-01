import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TrendingUp, TrendingDown, Zap } from 'lucide-react-native';
import { getScanPerformance } from '@/src/services/statistics/statisticsService';
import styles from './performanceCard.styles';
import { CountUp } from "@/src/components/countUp/countUp";
import {useTranslation} from "react-i18next";

export const PerformanceCard: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [successRate, setSuccessRate] = useState<number | null>(null);
    const [trendValue, setTrendValue] = useState<number | null>(null);
    const { t } = useTranslation(["screens"]);

    const isPositive = trendValue && trendValue > 0;
    const TrendIcon = isPositive ? TrendingUp : TrendingDown;

    useEffect(() => {
        const fetchPerformance = async () => {
            try {
                const data = await getScanPerformance();
                setSuccessRate(data.successRate);
                setTrendValue(data.trend);
            } catch (err) {
                console.error('Error fetching performance:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPerformance();
    }, []);

    return (
        <View style={styles.card}>
            <LinearGradient
                colors={['#6366F1', '#8B5CF6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradient}
            >
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.iconWrapper}>
                        <Zap size={20} color="#fff" strokeWidth={2.5} />
                    </View>
                    <Text style={styles.title}>{t("screens:dashboard.performanceCard.title")}</Text>
                </View>

                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <>
                        {successRate !== null && successRate > 0 ? (
                            <CountUp
                                value={successRate}
                                duration={2000}
                                delay={200}
                                suffix="%"
                                style={styles.value}
                            />
                        ) : (
                            <View style={{ alignItems: 'center' }}>
                                <Text style={[styles.value, { opacity: 0.8 }]}>--</Text>
                                <Text
                                    style={{
                                        color: 'rgba(255,255,255,0.85)',
                                        fontSize: 13,
                                        textAlign: 'center',
                                        marginTop: 4,
                                    }}
                                >
                                    {t("screens:dashboard.performanceCard.noDataThisMonth")}
                                </Text>
                            </View>
                        )}

                        <View style={styles.footer}>
                            <Text style={styles.subtitle}>
                                {t("screens:dashboard.performanceCard.trend")}
                            </Text>
                            {trendValue !== null && trendValue !== 0 ? (
                                <View
                                    style={[
                                        styles.trendContainer,
                                        { backgroundColor: '#FFFFFF', borderColor: '#FFFFFF' },
                                    ]}
                                >
                                    <TrendIcon
                                        size={14}
                                        color={isPositive ? '#10B981' : '#EF4444'}
                                    />
                                    <Text
                                        style={[
                                            styles.trendText,
                                            { color: isPositive ? '#10B981' : '#EF4444' },
                                        ]}
                                    >
                                        {Math.abs(trendValue)}%
                                    </Text>
                                </View>
                            ) : (
                                <Text
                                    style={{
                                        color: 'rgba(255,255,255,0.85)',
                                        fontSize: 12,
                                        marginLeft: 8,
                                    }}
                                >
                                    {t("screens:dashboard.performanceCard.noTrend")}
                                </Text>
                            )}
                        </View>
                    </>
                )}
            </LinearGradient>
        </View>
    );
};
