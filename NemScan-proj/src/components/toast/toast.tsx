import { View, Text, Animated } from 'react-native';
import { useEffect, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import styles from './toast.styles';
import { toastStateColors } from "@/src/shared/global/colors";
import {ToastProps} from "@/src/components/toast/interfaces";

export const Toast = ({ type, message, visible }: ToastProps) => {
    const slideAnim = useRef(new Animated.Value(-100)).current;

    useEffect(() => {
        if (visible) {
            Animated.spring(slideAnim, {
                toValue: 0,
                useNativeDriver: true,
                tension: 50,
                friction: 8,
            }).start();
        } else {
            Animated.timing(slideAnim, {
                toValue: -100,
                duration: 200,
                useNativeDriver: true,
            }).start();
        }
    }, [visible]);

    const getToastConfig = () => {
        switch (type) {
            case 'success':
                return {
                    icon: 'checkmark-circle',
                    color: toastStateColors.success.color,
                    backgroundColor: toastStateColors.success.background,
                    borderColor: toastStateColors.success.color
                };
            case 'warning':
                return {
                    icon: 'warning',
                    color: toastStateColors.warning.color,
                    backgroundColor: toastStateColors.warning.background,
                    borderColor: toastStateColors.warning.color,
                };
            case 'info':
                return {
                    icon: 'information-circle',
                    color: toastStateColors.info.color,
                    backgroundColor: toastStateColors.info.background,
                    borderColor: toastStateColors.info.color,
                };
            case 'error':
                return {
                    icon: 'close-circle',
                    color: toastStateColors.error.color,
                    backgroundColor: toastStateColors.error.background,
                    borderColor: toastStateColors.error.color,
                };
            case 'loading':
                return {
                    icon: 'hourglass',
                    color: toastStateColors.loading.color,
                    backgroundColor: toastStateColors.loading.background,
                    borderColor: toastStateColors.loading.color,
                };
        }
    };

    const config = getToastConfig();

    if (!visible) return null;

    return (
        <Animated.View
            style={[
                styles.toastContainer,
                {
                    transform: [{ translateY: slideAnim }],
                    backgroundColor: config.backgroundColor,
                    borderLeftColor: config.borderColor,
                },
            ]}
        >
            <View style={styles.toastContent}>
                <Ionicons name={config.icon as any} size={24} color={config.color} />
                <Text style={[styles.toastMessage, { color: config.color }]}>
                    {message}
                </Text>
            </View>
        </Animated.View>
    );
};