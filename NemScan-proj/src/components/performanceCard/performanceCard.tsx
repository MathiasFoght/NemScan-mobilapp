import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ActivityIndicator, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TrendingUp, TrendingDown, Zap } from 'lucide-react-native';
import { getScanPerformance } from '@/src/services/statistics/statisticsService';
import styles from './performanceCard.styles';

export const PerformanceCard: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [successRate, setSuccessRate] = useState<number | null>(null);
    const [trendValue, setTrendValue] = useState<number | null>(null);
    const animatedValue = useRef(new Animated.Value(0)).current;
    const [displayValue, setDisplayValue] = useState('--');
    const isPositive = trendValue && trendValue > 0;
    const TrendIcon = isPositive ? TrendingUp : TrendingDown;

    useEffect(() => {
        const fetchPerformance = async () => {
            try {
                const data = await getScanPerformance();
                setSuccessRate(data.successRate);
                setTrendValue(data.trend);

                Animated.timing(animatedValue, {
                    toValue: data.successRate,
                    duration: 2000,
                    delay: 200,
                    easing: Easing.out(Easing.exp),
                    useNativeDriver: false,
                }).start();

                const id = animatedValue.addListener(({ value }) => {
                    setDisplayValue(`${value.toFixed(1)}%`);
                });
                return () => animatedValue.removeListener(id);
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
                colors={['#6366F1', '#8B5CF6'] as [string, string]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradient}
            >
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.iconWrapper}>
                        <Zap size={20} color="#fff" strokeWidth={2.5} />
                    </View>
                    <Text style={styles.title}>Effektivitet{'\n'}denne måned</Text>
                </View>

                {/* Content */}
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <>
                        <Text style={styles.value}>{displayValue}</Text>
                        <View style={styles.footer}>
                            <Text style={styles.subtitle}>Trend</Text>
                            {trendValue !== null && (
                                <View
                                    style={[
                                        styles.trendContainer,
                                        {
                                            backgroundColor: '#FFFFFF',
                                            borderColor: '#FFFFFF'
                                        },
                                    ]}
                                >
                                    <TrendIcon size={14} color={isPositive ? '#10B981' : '#EF4444'} />
                                    <Text
                                        style={[
                                            styles.trendText,
                                            { color: isPositive ? '#10B981' : '#EF4444' },
                                        ]}
                                    >
                                        {Math.abs(trendValue)}%
                                    </Text>
                                </View>
                            )}
                        </View>

                    </>
                )}
            </LinearGradient>
        </View>
    );
};
