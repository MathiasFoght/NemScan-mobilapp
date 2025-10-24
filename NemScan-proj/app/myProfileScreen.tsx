import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { colors } from '@/src/shared/global/colors';
import { getEmployeeProfile } from '@/src/services/employee/employeeService';
import { Toast } from '@/src/components/toast/toast';
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
                setError(null);
            } catch (err: any) {
                setError(t('toastErrors.errorFetching'));
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [t]);

    return (
        <View style={styles.container}>
            <Toast type="loading" message={t('common.loading')} visible={loading} />
            <Toast type="error" message={error || ''} visible={!!error} />

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

            {!loading && !employee ? (
                <View style={styles.center}>
                    <MaterialIcons name="person-off" size={64} color={colors.inactive} />
                    <Text style={styles.emptyText}>{t('myProfile.fallbacks.noEmployeeFound')}</Text>
                </View>
            ) : employee ? (
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
                                value={t(`employeeProfile.positions.${employee.position}`)}
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
            ) : null}
        </View>
    );
}