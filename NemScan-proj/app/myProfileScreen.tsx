import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { colors } from '@/src/shared/global/colors';
import { getEmployeeProfile } from '@/src/services/employee/employeeService';
import { LoadingErrorState } from '@/src/components/states/loadingErrorState';
import { EmployeeProfile } from "@/src/services/employee/interfaces";
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import styles from '@/src/styles/screens/myProfileScreen.styles';
import { InfoRow } from "@/src/ui/infoRow/infoRow";
import Button from "@/src/ui/button/button";
import '@/i18n/i18n.config';
import { useTranslation } from "react-i18next";

export default function MyProfileScreen() {
    const [employee, setEmployee] = useState<EmployeeProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const { t } = useTranslation();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getEmployeeProfile();
                setEmployee(data);
            } catch (err) {
                setError(t('myProfile.errorFetchingEmployee'));
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [t]);

    if (loading || error) {
        return <LoadingErrorState loading={loading} error={error} />;
    }

    if (!employee) {
        return (
            <View style={styles.center}>
                <MaterialIcons name="person-off" size={64} color={colors.inactive} />
                <Text style={styles.emptyText}>{t('myProfile.noEmployeeFound')}</Text>
            </View>
        );
    }

    const employeePosition = t(`employeeProfile.positions.${employee.position}`);

    return (
        <View style={styles.container}>
            <View style={styles.headerBar}>
                <Button
                    onPress={router.back}
                    icon={<MaterialIcons name="arrow-back-ios-new" size={24} color="#000" />}
                    iconPosition="left"
                    variant="simple"
                    style={{ height: 40 }}
                />
                <Text style={styles.headerTitle}>{t('myProfile.title')}</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{t('myProfile.employeeInfo')}</Text>

                    <View style={styles.infoCard}>
                        <InfoRow
                            icon="badge"
                            label={t('employeeProfile.details.employeeNumber')}
                            value={employee.employeeNumber}
                        />
                        <InfoRow
                            icon="work"
                            label={t('myProfile.fields.position')}
                            value={employeePosition}
                            hideBorder
                        />
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{t('myProfile.storeInfo')}</Text>

                    <View style={styles.infoCard}>
                        <InfoRow
                            icon="store"
                            label={t('myProfile.fields.storeNumber')}
                            value={employee.storeNumber}
                            hideBorder
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
