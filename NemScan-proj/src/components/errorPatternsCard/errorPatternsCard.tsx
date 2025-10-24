import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Info } from 'lucide-react-native';
import { getErrorPatterns } from '@/src/services/report/reportService';
import { ErrorPattern } from '@/src/services/report/interfaces';
import { AnimatedErrorRow } from '@/src/components/animatedErrorRow/animatedErrorRow';
import styles from './errorPatternCard.styles';
import { useTranslation } from 'react-i18next';

export const ErrorPatternsCard: React.FC = () => {
    const { i18n } = useTranslation();
    const [errors, setErrors] = useState<ErrorPattern[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchErrors = async () => {
            try {
                const data = await getErrorPatterns(i18n.language);
                setErrors(data);
            } catch (err) {
                console.error('Failed to load error patterns:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchErrors();
    }, [i18n.language]);

    const total = errors.reduce((sum, e) => sum + e.count, 0);

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <Info size={20} color="#143293" />
                <Text style={styles.title}>Fejlmønstre</Text>
            </View>

            {loading ? (
                <ActivityIndicator color="#143293" />
            ) : errors.length === 0 ? (
                <Text style={{ textAlign: 'center', color: '#6B7280' }}>Ingen data</Text>
            ) : (
                errors.map((e, i) => (
                    <AnimatedErrorRow
                        key={i}
                        error={e}
                        percent={Math.round((e.count / total) * 100)}
                        delay={i * 150}
                    />
                ))
            )}
        </View>
    );
};
