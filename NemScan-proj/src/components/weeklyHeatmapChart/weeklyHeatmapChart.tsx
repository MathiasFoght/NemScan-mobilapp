import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    Animated,
    Easing,
} from 'react-native';
import { LineChart, CurveType } from 'react-native-gifted-charts';
import { useTranslation } from 'react-i18next';
import { getScanWeeklyHeatmap } from '@/src/services/statistics/statisticsService';
import {HeatmapItem} from "@/src/components/weeklyHeatmapChart/interfaces";
import styles from './weeklyHeatmapChart.styles'

const periods = ['Alle', 'Morgen', 'Formiddag', 'Eftermiddag', 'Aften'];

const periodMapping: { [key: string]: string } = {
    Alle: 'All',
    Morgen: 'Morning',
    Formiddag: 'Late Morning',
    Eftermiddag: 'Afternoon',
    Aften: 'Evening',
};

export const WeeklyHeatmapChart: React.FC = () => {
    const { t } = useTranslation();
    const [data, setData] = useState<HeatmapItem[]>([]);
    const [chartData, setChartData] = useState<any[]>([]);
    const [maxValue, setMaxValue] = useState(50);
    const [selectedPeriod, setSelectedPeriod] = useState<string>('Alle');
    const [loading, setLoading] = useState(true);
    const [weekType, setWeekType] = useState<'current' | 'previous'>('current');
    const [peakValue, setPeakValue] = useState<number>(0);
    const [peakDay, setPeakDay] = useState<string>('');

    const opacityAnim = useRef(new Animated.Value(1)).current;
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const screenWidth = Dimensions.get('window').width;

    const getWeekRange = (type: 'current' | 'previous') => {
        const today = new Date();
        const offset = type === 'previous' ? -7 : 0;
        const baseDate = new Date(today);
        baseDate.setDate(today.getDate() + offset);

        const dayOfWeek = baseDate.getDay();
        const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
        const sundayOffset = mondayOffset + 6;

        const monday = new Date(baseDate);
        monday.setDate(baseDate.getDate() + mondayOffset);
        monday.setHours(0, 0, 0, 0);

        const sunday = new Date(baseDate);
        sunday.setDate(baseDate.getDate() + sundayOffset);
        sunday.setHours(23, 59, 59, 999);

        return { monday, sunday };
    };

    const { monday, sunday } = getWeekRange(weekType);
    const dateRange = `${monday.getDate()} ${monday.toLocaleString('da-DK', {
        month: 'short',
    })} - ${sunday.getDate()} ${sunday.toLocaleString('da-DK', {
        month: 'short',
    })}`;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getScanWeeklyHeatmap(
                    monday.toISOString(),
                    sunday.toISOString()
                );
                setData(res);
            } catch (err) {
                console.error('Kunne ikke hente scanningsdata:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [weekType]);

    const animateWeekChange = () => {
        Animated.parallel([
            Animated.sequence([
                Animated.timing(opacityAnim, {
                    toValue: 0.3,
                    duration: 200,
                    easing: Easing.ease,
                    useNativeDriver: true,
                }),
                Animated.timing(opacityAnim, {
                    toValue: 1,
                    duration: 400,
                    easing: Easing.out(Easing.cubic),
                    useNativeDriver: true,
                }),
            ]),
            Animated.sequence([
                Animated.timing(scaleAnim, {
                    toValue: 0.95,
                    duration: 200,
                    easing: Easing.ease,
                    useNativeDriver: true,
                }),
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    friction: 7,
                    tension: 40,
                    useNativeDriver: true,
                }),
            ]),
        ]).start();
    };

    useEffect(() => {
        if (!data?.length) return;

        const englishPeriod = periodMapping[selectedPeriod];
        const filtered =
            selectedPeriod === 'Alle'
                ? data
                : data.filter((d) => d.period === englishPeriod);

        const grouped = filtered.reduce((acc: any, curr) => {
            acc[curr.day] = (acc[curr.day] || 0) + curr.count;
            return acc;
        }, {});

        const dayOrder = [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
        ];
        const sortedDays = dayOrder.filter((day) => grouped[day] !== undefined);
        const values = sortedDays.map((day) => grouped[day] ?? 0);

        const peak = Math.max(...values, 1);
        const peakIndex = values.indexOf(peak);
        const peakDayName = sortedDays[peakIndex];

        setPeakValue(peak);
        setPeakDay(peakDayName);

        const avg = values.reduce((a, b) => a + b, 0) / values.length;
        const ratio = peak / (avg || 1);
        const scaleBoost =
            ratio > 10
                ? 1.5
                : ratio > 5
                    ? 1.4
                    : ratio > 3
                        ? 1.3
                        : ratio > 2
                            ? 1.25
                            : ratio > 1.5
                                ? 1.2
                                : 1.15;

        const roundedMax =
            peak <= 10
                ? Math.ceil(peak / 2) * 2
                : peak <= 20
                    ? Math.ceil(peak / 5) * 5
                    : peak <= 50
                        ? Math.ceil(peak / 10) * 10
                        : peak <= 100
                            ? Math.ceil(peak / 20) * 20
                            : peak <= 200
                                ? Math.ceil(peak / 25) * 25
                                : peak <= 500
                                    ? Math.ceil(peak / 50) * 50
                                    : Math.ceil(peak / 100) * 100;

        setMaxValue(Math.ceil(roundedMax * scaleBoost));

        const dayTranslations: Record<string, string> = {
            Monday: 'Man',
            Tuesday: 'Tir',
            Wednesday: 'Ons',
            Thursday: 'Tor',
            Friday: 'Fre',
            Saturday: 'Lør',
            Sunday: 'Søn',
        };

        setChartData(
            sortedDays.map((day) => {
                const value = Math.max(0, grouped[day] ?? 0);
                const isPeak = day === peakDayName;
                const text = isPeak ? String(value) : undefined;

                const textShiftX =
                    text && text.length === 1
                        ? 0
                        : text && text.length === 2
                            ? -4
                            : text && text.length >= 3
                                ? -6
                                : 0;

                return {
                    value,
                    label: dayTranslations[day] || day,
                    labelTextStyle: {
                        color: '#9CA3AF',
                        fontSize: 11,
                        fontWeight: '600',
                    },
                    dataPointText: text,
                    textColor: '#5B8DEF',
                    textFontSize: 13,
                    textShiftX,
                    textShiftY: -20,
                };
            })
        );
    }, [data, selectedPeriod]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Ugentlig Aktivitet</Text>
                <Text style={styles.dateRange}>{dateRange}</Text>

                {/* Simpel switch */}
                <View style={styles.weekSwitch}>
                    <TouchableOpacity
                        style={[
                            styles.switchButton,
                            weekType === 'current' && styles.switchButtonActive,
                        ]}
                        onPress={() => {
                            if (weekType !== 'current') {
                                setWeekType('current');
                                animateWeekChange();
                            }
                        }}
                    >
                        <Text
                            style={[
                                styles.switchText,
                                weekType === 'current' && styles.switchTextActive,
                            ]}
                        >
                            Denne uge
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.switchButton,
                            weekType === 'previous' && styles.switchButtonActive,
                        ]}
                        onPress={() => {
                            if (weekType !== 'previous') {
                                setWeekType('previous');
                                animateWeekChange();
                            }
                        }}
                    >
                        <Text
                            style={[
                                styles.switchText,
                                weekType === 'previous' && styles.switchTextActive,
                            ]}
                        >
                            Sidste uge
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ marginBottom: 10 }}
            >
                {periods.map((period) => (
                    <TouchableOpacity
                        key={period}
                        onPress={() => {
                            if (selectedPeriod !== period) {
                                setSelectedPeriod(period);
                                animateWeekChange();
                            }
                        }}
                        style={[
                            styles.filterButton,
                            selectedPeriod === period && styles.filterButtonActive,
                        ]}
                    >
                        <Text
                            style={[
                                styles.filterText,
                                selectedPeriod === period && styles.filterTextActive,
                            ]}
                        >
                            {period}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <Animated.View
                style={[
                    styles.chartWrapper,
                    {
                        opacity: opacityAnim,
                        transform: [{ scale: scaleAnim }],
                    },
                ]}
            >
                {loading ? (
                    <Text style={styles.dateRange}>Henter data...</Text>
                ) : !chartData.length ? (
                    <Text style={styles.dateRange}>Ingen data tilgængelig</Text>
                ) : (
                    <LineChart
                        data={chartData}
                        width={screenWidth - 80}
                        height={220}
                        maxValue={maxValue}
                        spacing={(screenWidth - 120) / (chartData.length - 1)}
                        initialSpacing={20}
                        endSpacing={20}
                        color="#7C9FFF"
                        thickness={2.5}
                        startFillColor="rgba(124, 159, 255, 0.25)"
                        endFillColor="rgba(124, 159, 255, 0.02)"
                        startOpacity={0.9}
                        endOpacity={0.1}
                        areaChart
                        curved
                        curveType={CurveType.QUADRATIC}
                        hideDataPoints={false}
                        dataPointsRadius={4}
                        dataPointsColor="#5B8DEF"
                        showVerticalLines={false}
                        xAxisColor="transparent"
                        yAxisColor="transparent"
                        hideRules
                        hideYAxisText
                        isAnimated
                        animationDuration={800}
                        pointerConfig={{
                            pointerStripHeight: 200,
                            pointerStripColor: '#5B8DEF',
                            pointerStripWidth: 1.5,
                            strokeDashArray: [4, 4],
                            pointerColor: '#FFFFFF',
                            pointerLabelWidth: 100,
                            pointerLabelHeight: 75,
                            autoAdjustPointerLabelPosition: true,
                            pointerVanishDelay: 0,
                            pointerLabelComponent: (items: any) => (
                                <View
                                    style={[
                                        styles.pointerLabel,
                                        { alignSelf: 'center', transform: [{ translateY: -10 }] },
                                    ]}
                                >
                                    <Text style={styles.pointerDay}>{items[0].label}</Text>
                                    <Text style={styles.pointerValue}>{items[0].value}</Text>
                                </View>
                            ),
                        }}
                    />
                )}
            </Animated.View>
        </View>
    );
};

export default WeeklyHeatmapChart;