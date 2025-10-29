import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { ProductGroupStat } from '@/src/services/statistics/interfaces';
import { getProductGroupDistribution } from "@/src/services/statistics/statisticsService";
import { colors } from "@/src/shared/global/colors";
import AnimatedBar from "@/src/components/animatedBar/animatedBar";
import styles from "./productGroupDistribution.styles";
import "@/i18n/i18n.config";
import {useTranslation} from "react-i18next";

const COLORS = [colors.primary, '#50E3C2', '#F5A623', '#FF6B9D', '#9013FE', '#7ED321'];

export const ProductGroupDistribution: React.FC = () => {
    const [groups, setGroups] = useState<ProductGroupStat[]>([]);
    const [error, setError] = useState<string | null>(null);
    const { t } = useTranslation(["screens", "common"]);

    useEffect(() => {
        const loadData = async () => {
            try {
                setError(null);
                const data = await getProductGroupDistribution();
                setGroups(data);
            } catch (err) {
                console.error('Error loading product group distribution:', err);
                setError(t("common:errors.errorFetching"));
            }
        };

        loadData();
    }, []);

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{t("screens:statistics.productGroupDistribution.title")}</Text>
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>{error}</Text>
                </View>
            </View>
        );
    }

    if (groups.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{t("screens:statistics.productGroupDistribution.title")}</Text>
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>{t("screens:statistics.productGroupDistribution.noData")}</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{t("screens:statistics.productGroupDistribution.title")}</Text>

            <View style={styles.chartContainer}>
                {groups.map((group, index) => {
                    const color = COLORS[index % COLORS.length];
                    return (
                        <View key={index} style={styles.barItem}>
                            <View style={styles.barHeader}>
                                <Text style={styles.groupName}>
                                    {group.groupName.charAt(0).toUpperCase() + group.groupName.slice(1)}
                                </Text>
                            </View>

                            <AnimatedBar
                                percentage={group.percentage}
                                color={color}
                                duration={1200}
                            />

                            <Text style={styles.scanCount}>{group.scanCount} {t("screens:statistics.productGroupDistribution.scans")}</Text>
                        </View>
                    );
                })}
            </View>
        </View>
    );
};
