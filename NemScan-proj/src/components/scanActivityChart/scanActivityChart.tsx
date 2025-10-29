import React, {memo, useEffect, useRef, useState} from 'react';
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
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { getScanActivity } from '@/src/services/statistics/statisticsService';
import { ScanActivityResponse } from '@/src/services/statistics/interfaces';
import styles from './scanActivityChart.styles'

export const ScanActivityChartComponent: React.FC = () => {
    const { t } = useTranslation(["screens"]);
    const [data, setData] = useState<ScanActivityResponse | null>(null);
    const [chartData, setChartData] = useState<any[]>([]);
    const [maxValue, setMaxValue] = useState(50);
    const [selectedPeriod, setSelectedPeriod] = useState<string>(t("screens:dashboard.scanActivityChart.period.all"));
    const [loading, setLoading] = useState(true);
    const [periodType, setPeriodType] = useState<'week' | 'month'>('week');
    const [isTransitioning, setIsTransitioning] = useState(false);

    const scaleAnim = useRef(new Animated.Value(1)).current;
    const opacityAnim = useRef(new Animated.Value(1)).current;
    const filterHeightAnim = useRef(new Animated.Value(1)).current;

    const screenWidth = Dimensions.get('window').width;

    const periods = [
        t('screens:dashboard.scanActivityChart.period.all'),
        t('screens:dashboard.scanActivityChart.period.morning'),
        t('screens:dashboard.scanActivityChart.period.lateMorning'),
        t('screens:dashboard.scanActivityChart.period.afternoon'),
        t('screens:dashboard.scanActivityChart.period.evening'),
    ];

    const periodMapping: { [key: string]: string } = {
        [t('screens:dashboard.scanActivityChart.period.all')]: 'All',
        [t('screens:dashboard.scanActivityChart.period.morning')]: 'Morning',
        [t('screens:dashboard.scanActivityChart.period.lateMorning')]: 'Late Morning',
        [t('screens:dashboard.scanActivityChart.period.afternoon')]: 'Afternoon',
        [t('screens:dashboard.scanActivityChart.period.evening')]: 'Evening',
    };

    const getWeekRange = () => {
        const today = new Date();
        const dayOfWeek = today.getDay();
        const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
        const sundayOffset = mondayOffset + 6;

        const monday = new Date(today);
        monday.setDate(today.getDate() + mondayOffset);
        monday.setHours(0, 0, 0, 0);

        const sunday = new Date(today);
        sunday.setDate(today.getDate() + sundayOffset);
        sunday.setHours(23, 59, 59, 999);

        return { monday, sunday };
    };

    const getMonthRange = () => {
        const today = new Date();
        const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
        firstDay.setHours(0, 0, 0, 0);

        const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        lastDay.setHours(23, 59, 59, 999);

        return { firstDay, lastDay };
    };

    const getDateRange = () => {
        const locale = i18n.language === 'en' ? 'en-US' : 'da-DK';

        if (periodType === 'week') {
            const { monday, sunday } = getWeekRange();
            return t('screens:dashboard.scanActivityChart.dateRange', {
                start: `${monday.getDate()} ${monday.toLocaleString(locale, { month: 'short' })}`,
                end: `${sunday.getDate()} ${sunday.toLocaleString(locale, { month: 'short' })}`,
            });
        } else {
            const { firstDay } = getMonthRange();
            const today = new Date();
            return t('screens:dashboard.scanActivityChart.dateRange', {
                start: `${firstDay.getDate()} ${firstDay.toLocaleString(locale, { month: 'short' })}`,
                end: `${today.getDate()} ${today.toLocaleString(locale, { month: 'short' })}`,
            });
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await getScanActivity(periodType);
                setData(res);
            } catch (err) {
                console.error(t('screens:dashboard.scanActivityChart.noData'), err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [periodType]);

    const animateChange = () => {
        setIsTransitioning(true);

        Animated.parallel([
            Animated.timing(opacityAnim, {
                toValue: 0,
                duration: 150,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 0.95,
                duration: 150,
                easing: Easing.ease,
                useNativeDriver: true,
            }),
        ]).start(() => {
            setTimeout(() => {
                setIsTransitioning(false);
                Animated.parallel([
                    Animated.timing(opacityAnim, {
                        toValue: 1,
                        duration: 200,
                        useNativeDriver: true,
                    }),
                    Animated.spring(scaleAnim, {
                        toValue: 1,
                        friction: 6,
                        tension: 40,
                        useNativeDriver: true,
                    }),
                ]).start();
            }, 50);
        });
    };

    const animatePeriodTypeChange = (newType: 'week' | 'month') => {
        setIsTransitioning(true);
        setChartData([]);

        if (newType === 'month') {
            Animated.parallel([
                Animated.timing(filterHeightAnim, {
                    toValue: 0,
                    duration: 250,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: false,
                }),
                Animated.timing(opacityAnim, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                setTimeout(() => {
                    setIsTransitioning(false);
                    Animated.parallel([
                        Animated.timing(opacityAnim, {
                            toValue: 1,
                            duration: 250,
                            useNativeDriver: true,
                        }),
                        Animated.spring(scaleAnim, {
                            toValue: 1,
                            friction: 6,
                            tension: 40,
                            useNativeDriver: true,
                        }),
                    ]).start();
                }, 50);
            });
        } else {
            Animated.parallel([
                Animated.timing(opacityAnim, {
                    toValue: 0,
                    duration: 150,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                setTimeout(() => {
                    setIsTransitioning(false);
                    Animated.parallel([
                        Animated.timing(filterHeightAnim, {
                            toValue: 1,
                            duration: 250,
                            easing: Easing.inOut(Easing.ease),
                            useNativeDriver: false,
                        }),
                        Animated.timing(opacityAnim, {
                            toValue: 1,
                            duration: 250,
                            delay: 100,
                            useNativeDriver: true,
                        }),
                        Animated.spring(scaleAnim, {
                            toValue: 1,
                            friction: 6,
                            tension: 40,
                            useNativeDriver: true,
                        }),
                    ]).start();
                }, 50);
            });
        }
    };

    useEffect(() => {
        if (!data || isTransitioning) return;

        if (periodType === 'month' && data.trend?.length) {
            const trendData = data.trend;
            const values = trendData.map(item => item.rollingAverage);

            const peak = Math.max(...values, 1);
            const peakIndex = values.indexOf(peak);
            const avg = values.reduce((a, b) => a + b, 0) / values.length;
            const ratio = peak / (avg || 1);

            const scaleBoost =
                ratio > 10 ? 1.5 : ratio > 5 ? 1.4 : ratio > 3 ? 1.3 :
                    ratio > 2 ? 1.25 : ratio > 1.5 ? 1.2 : 1.15;

            const roundedMax =
                peak <= 10 ? Math.ceil(peak / 2) * 2 :
                    peak <= 20 ? Math.ceil(peak / 5) * 5 :
                        peak <= 50 ? Math.ceil(peak / 10) * 10 :
                            peak <= 100 ? Math.ceil(peak / 20) * 20 :
                                peak <= 200 ? Math.ceil(peak / 25) * 25 :
                                    peak <= 500 ? Math.ceil(peak / 50) * 50 :
                                        Math.ceil(peak / 100) * 100;

            setMaxValue(Math.ceil(roundedMax * scaleBoost));

            const showEveryNth = Math.ceil(trendData.length / 7);

            setChartData(
                trendData.map((item, index) => {
                    const value = item.rollingAverage;
                    const isPeak = index === peakIndex;
                    const isHighValue = value >= peak * 0.7;
                    const text = isPeak || isHighValue ? String(Math.round(value)) : undefined;

                    const shouldShowLabel = index % showEveryNth === 0 || index === trendData.length - 1;

                    let dayLabel = '';
                    if (shouldShowLabel) {
                        const dateStr = String(item.dayOrDate);

                        if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
                            const [year, month, day] = dateStr.split('-');
                            const monthName = new Date(Number(year), Number(month) - 1)
                                .toLocaleString('da-DK', { month: 'short' });
                            dayLabel = `${Number(day)} ${monthName}`;
                        }
                        else if (/^\d{1,2}[\/\.]\d{1,2}$/.test(dateStr)) {
                            const [day, month] = dateStr.split(/[\/\.]/);
                            const monthName = new Date(2025, Number(month) - 1)
                                .toLocaleString('da-DK', { month: 'short' });
                            dayLabel = `${Number(day)} ${monthName}`;
                        }
                        else {
                            dayLabel = dateStr;
                        }
                    }

                    const textShiftX =
                        text && text.length === 1 ? 0 :
                            text && text.length === 2 ? -4 :
                                text && text.length >= 3 ? -6 : 0;

                    return {
                        value: Math.round(value * 10) / 10,
                        label: dayLabel,
                        labelTextStyle: {
                            color: '#9CA3AF',
                            fontSize: 10,
                            fontWeight: '600',
                            transform: [{ rotate: '-30deg' }],
                            width: 50,
                            textAlign: 'right',
                            alignSelf: 'flex-end',
                            marginRight: index === trendData.length - 1 ? 10 : 0,
                        },
                        dataPointText: text,
                        textColor: '#5B8DEF',
                        textFontSize: isHighValue ? 14 : 13,
                        textShiftX,
                        textShiftY: -20,
                    };
                })
            );
        }

        else if (periodType === 'week' && data.heatmap?.length) {
            const englishPeriod = periodMapping[selectedPeriod];
            const filtered =
                selectedPeriod === t('screens:dashboard.scanActivityChart.period.all')
                    ? data.heatmap
                    : data.heatmap.filter((d) => d.period === englishPeriod);

            const grouped = filtered.reduce((acc: any, curr) => {
                acc[curr.day] = (acc[curr.day] || 0) + curr.count;
                return acc;
            }, {});

            const dayOrder = [
                'Monday', 'Tuesday', 'Wednesday', 'Thursday',
                'Friday', 'Saturday', 'Sunday',
            ];

            const sortedDays = dayOrder.filter((day) => grouped[day] !== undefined);
            const values = sortedDays.map((day) => grouped[day] ?? 0);

            const peak = Math.max(...values, 1);
            const peakIndex = values.indexOf(peak);
            const peakDayName = sortedDays[peakIndex];
            const avg = values.reduce((a, b) => a + b, 0) / values.length;
            const ratio = peak / (avg || 1);

            const scaleBoost =
                ratio > 10 ? 1.5 : ratio > 5 ? 1.4 : ratio > 3 ? 1.3 :
                    ratio > 2 ? 1.25 : ratio > 1.5 ? 1.2 : 1.15;

            const roundedMax =
                peak <= 10 ? Math.ceil(peak / 2) * 2 :
                    peak <= 20 ? Math.ceil(peak / 5) * 5 :
                        peak <= 50 ? Math.ceil(peak / 10) * 10 :
                            peak <= 100 ? Math.ceil(peak / 20) * 20 :
                                peak <= 200 ? Math.ceil(peak / 25) * 25 :
                                    peak <= 500 ? Math.ceil(peak / 50) * 50 :
                                        Math.ceil(peak / 100) * 100;

            setMaxValue(Math.ceil(roundedMax * scaleBoost));

            const dayTranslations: Record<string, string> = {
                Monday: t('screens:dashboard.scanActivityChart.days.monday'),
                Tuesday: t('screens:dashboard.scanActivityChart.days.tuesday'),
                Wednesday: t('screens:dashboard.scanActivityChart.days.wednesday'),
                Thursday: t('screens:dashboard.scanActivityChart.days.thursday'),
                Friday: t('screens:dashboard.scanActivityChart.days.friday'),
                Saturday: t('screens:dashboard.scanActivityChart.days.saturday'),
                Sunday: t('screens:dashboard.scanActivityChart.days.sunday'),
            };

            setChartData(
                sortedDays.map((day) => {
                    const value = Math.max(0, grouped[day] ?? 0);
                    const isPeak = day === peakDayName;
                    const text = isPeak ? String(value) : undefined;

                    const textShiftX =
                        text && text.length === 1 ? 0 :
                            text && text.length === 2 ? -4 :
                                text && text.length >= 3 ? -6 : 0;

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
        }
    }, [data, selectedPeriod, periodType, isTransitioning]);

    return (
        <View style={[styles.container, { height: 440, overflow: 'hidden' }]}>
            <View style={styles.header}>
                <Text style={styles.title}>
                    {periodType === 'week'
                        ? t('screens:dashboard.scanActivityChart.weeklyActivity')
                        : t('screens:dashboard.scanActivityChart.monthlyActivity')}
                </Text>
                <Text style={styles.dateRange}>{getDateRange()}</Text>

                <View style={styles.weekSwitch}>
                    <TouchableOpacity
                        style={[
                            styles.switchButton,
                            periodType === 'week' && styles.switchButtonActive,
                        ]}
                        onPress={() => {
                            if (periodType !== 'week') {
                                setPeriodType('week');
                                setSelectedPeriod(t('screens:dashboard.scanActivityChart.period.all'));
                                animatePeriodTypeChange('week');
                                setTimeout(() => setPeriodType('week'), 150);
                            }
                        }}
                    >
                        <Text
                            style={[
                                styles.switchText,
                                periodType === 'week' && styles.switchTextActive,
                            ]}
                        >
                            {t("screens:dashboard.scanActivityChart.dataView.week")}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.switchButton,
                            periodType === 'month' && styles.switchButtonActive,
                        ]}
                        onPress={() => {
                            if (periodType !== 'month') {
                                setPeriodType('month');
                                animatePeriodTypeChange('month');
                                setTimeout(() => setPeriodType('month'), 150);
                            }
                        }}
                    >
                        <Text
                            style={[
                                styles.switchText,
                                periodType === 'month' && styles.switchTextActive,
                            ]}
                        >
                            {t("screens:dashboard.scanActivityChart.dataView.month")}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ minHeight: 50, marginBottom: 10 }}>
                <Animated.View
                    style={{
                        maxHeight: filterHeightAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 100],
                        }),
                        opacity: filterHeightAnim,
                        overflow: 'hidden',
                    }}
                >
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        pointerEvents={periodType === 'week' ? 'auto' : 'none'}
                    >
                        {periods.map((period) => (
                            <TouchableOpacity
                                key={period}
                                onPress={() => {
                                    if (selectedPeriod !== period) {
                                        setSelectedPeriod(period);
                                        animateChange();
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
                </Animated.View>
            </View>

            <Animated.View
                style={[
                    styles.chartWrapper,
                    {
                        transform: [{ scale: scaleAnim }],
                        opacity: opacityAnim,
                        minHeight: 240,
                    },
                ]}
                pointerEvents="box-none"
            >
                {!chartData.length ? (
                    <Text style={styles.dateRange}>
                        {t('screens:dashboard.scanActivityChart.noData')}
                    </Text>
                ) : (
                    <>
                        {loading && (
                            <Text style={[styles.dateRange, { opacity: 0.6, marginBottom: 8 }]}>
                                {t('screens:dashboard.scanActivityChart.fetchingData')}
                            </Text>
                        )}

                        <LineChart
                            data={chartData}
                            width={screenWidth - 80}
                            height={220}
                            maxValue={maxValue}
                            spacing={(screenWidth - 120) / (chartData.length - 1)}
                            initialSpacing={20}
                            endSpacing={20}
                            color="#7C9FFF"
                            thickness={periodType === 'month' ? 3 : 2.5}
                            startFillColor="rgba(124, 159, 255, 0.25)"
                            endFillColor="rgba(124, 159, 255, 0.02)"
                            startOpacity={0.9}
                            endOpacity={0.1}
                            areaChart
                            curved
                            curveType={CurveType.QUADRATIC}
                            hideDataPoints={periodType === 'month'}
                            dataPointsRadius={periodType === 'month' ? 0 : 4}
                            dataPointsColor="#5B8DEF"
                            showVerticalLines={false}
                            xAxisColor="transparent"
                            yAxisColor="transparent"
                            hideRules
                            hideYAxisText
                            isAnimated
                            animationDuration={800}
                            pointerConfig={
                                periodType === 'week'
                                    ? {
                                        pointerStripHeight: 200,
                                        pointerStripColor: '#5B8DEF',
                                        pointerStripWidth: 1.5,
                                        strokeDashArray: [4, 4],
                                        pointerColor: '#FFFFFF',
                                        radius: 4,
                                        pointerLabelWidth: 100,
                                        pointerLabelHeight: 75,
                                        autoAdjustPointerLabelPosition: true,
                                        pointerVanishDelay: 0,
                                        pointerLabelComponent: (items: any) => (
                                            <View
                                                style={[
                                                    styles.pointerLabel,
                                                    {
                                                        alignSelf: 'center',
                                                        transform: [{ translateY: -10 }],
                                                    },
                                                ]}
                                            >
                                                <Text style={styles.pointerDay}>
                                                    {t('screens:dashboard.scanActivityChart.pointer.day', { day: items[0].label })}
                                                </Text>
                                                <Text style={styles.pointerValue}>
                                                    {t('screens:dashboard.scanActivityChart.pointer.value', { value: items[0].value })}
                                                </Text>
                                            </View>
                                        ),
                                    }
                                    : {
                                        pointerStripHeight: 0,
                                        pointerStripWidth: 0,
                                        pointerColor: 'transparent',
                                        radius: 0,
                                        pointerLabelWidth: 0,
                                        pointerLabelHeight: 0,
                                    }
                            }
                        />
                    </>
                )}
            </Animated.View>
        </View>
    );
};

export const ScanActivityChart = memo(ScanActivityChartComponent);
export default ScanActivityChart;
