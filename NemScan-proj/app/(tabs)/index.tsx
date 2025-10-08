import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { getEmployeeProfile } from '@/src/services/employee/employeeService';
import { Header } from '@/src/ui/header/header';
import { LoadingErrorState } from '@/src/components/states/loadingErrorState';
import styles from "@/src/styles/screens/homeScreen.styles"

export default function HomeScreen() {
    const [employee, setEmployee] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profile = await getEmployeeProfile();
                setEmployee(profile);
            } catch (err: any) {
                setError('Kunne ikke hente medarbejder');
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    if (loading || error) {
        return <LoadingErrorState loading={loading} error={error} />;
    }

    if (!employee) {
        return (
            <View style={[styles.container, styles.center]}>
                <Text>Ingen medarbejder fundet</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Header {...employee} />
            <View style={styles.content}>
                <Text>Home Screen</Text>
            </View>
        </View>
    );
}
