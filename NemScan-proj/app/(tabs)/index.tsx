import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { getEmployeeProfile } from '@/src/services/employee/employeeService';
import { Header } from '@/src/ui/header/header';
import { Toast } from '@/src/components/toast/toast';
import styles from "@/src/styles/screens/homeScreen.styles";
import '@/i18n/i18n.config';
import { useTranslation } from "react-i18next";

export default function HomeScreen() {
    const [employee, setEmployee] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { t } = useTranslation();
    
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profile = await getEmployeeProfile();
                setEmployee(profile);
                setError(null);
            } catch (err: any) {
                setError(t('employeeProfile.errors.errorFetchingEmployee'));
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    return (
        <View style={styles.container}>
            <Toast type="loading" message={t('common.loading')} visible={loading} />
            <Toast type="error" message={error || ''} visible={!!error} />

            {employee && <Header {...employee} />}

            <View style={styles.content}>
                <Text>Home Screen</Text>
            </View>
        </View>
    );
}