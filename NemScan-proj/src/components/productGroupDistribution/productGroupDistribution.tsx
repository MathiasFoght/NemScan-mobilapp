import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ProductGroupStat } from '@/src/services/statistics/interfaces';
import { getProductGroupDistribution } from "@/src/services/statistics/statisticsService";
import { colors } from "@/src/shared/global/colors";

const COLORS = [colors.primary, '#50E3C2', '#F5A623', '#FF6B9D', '#9013FE', '#7ED321'];

export const ProductGroupDistribution: React.FC = () => {
    const [groups, setGroups] = useState<ProductGroupStat[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                setError(null);
                const data = await getProductGroupDistribution();
                setGroups(data);
            } catch (err) {
                console.error('Error loading product group distribution:', err);
                setError('Kunne ikke hente kategoridata.');
            }
        };

        loadData();
    }, []);

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Kategorier der scannes mest</Text>
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>{error}</Text>
                </View>
            </View>
        );
    }

    if (groups.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Kategorier der scannes mest</Text>
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>Ingen data tilgængelig</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Kategorier der scannes mest</Text>

            <View style={styles.chartContainer}>
                {groups.map((group, index) => {
                    const color = COLORS[index % COLORS.length];
                    return (
                        <View key={index} style={styles.barItem}>
                            <View style={styles.barHeader}>
                                <Text style={styles.groupName}>
                                    {group.groupName.charAt(0).toUpperCase() + group.groupName.slice(1)}
                                </Text>
                                <Text style={styles.percentage}>{group.percentage.toFixed(1)}%</Text>
                            </View>

                            <View style={styles.barBackground}>
                                <View
                                    style={[
                                        styles.barFill,
                                        { width: `${group.percentage}%`, backgroundColor: color },
                                    ]}
                                />
                            </View>

                            <Text style={styles.scanCount}>{group.scanCount} scanninger</Text>
                        </View>
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        marginHorizontal: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1C1C1E',
        marginBottom: 16,
    },
    chartContainer: {
        gap: 18,
    },
    barItem: {
        gap: 6,
    },
    barHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    groupName: {
        fontSize: 15,
        fontWeight: '600',
        color: '#1C1C1E',
    },
    percentage: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.primary,
    },
    barBackground: {
        height: 12,
        backgroundColor: '#F2F2F7',
        borderRadius: 6,
        overflow: 'hidden',
    },
    barFill: {
        height: '100%',
        borderRadius: 6,
    },
    scanCount: {
        fontSize: 12,
        color: '#8E8E93',
    },
    loadingContainer: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyContainer: {
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 15,
        color: '#8E8E93',
    },
});
