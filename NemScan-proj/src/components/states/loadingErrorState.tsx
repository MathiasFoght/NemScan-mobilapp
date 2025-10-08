import { View, Text, ActivityIndicator } from 'react-native';
import styles from './loadingErrorState.styles'
import {StatesProps} from "@/src/components/states/interfaces";

export const LoadingErrorState = ({ loading, error }: StatesProps) => {
    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#102570" />
                <Text style={styles.loadingText}>Henter...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.center}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return null;
};

