import React, { useEffect, useRef } from 'react';
import { Modal, View, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '@/src/shared/global/colors';
import { SuccessModalProps } from './interfaces';
import styles from './successmodal.styles';

export const SuccessModal: React.FC<SuccessModalProps> = ({ visible, onComplete }) => {
    const scaleAnim = useRef(new Animated.Value(0)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            Animated.parallel([
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    tension: 50,
                    friction: 7,
                    useNativeDriver: true,
                }),
                Animated.timing(opacityAnim, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                }),
            ]).start();

            const timer = setTimeout(() => {
                Animated.parallel([
                    Animated.timing(scaleAnim, {
                        toValue: 0,
                        duration: 200,
                        useNativeDriver: true,
                    }),
                    Animated.timing(opacityAnim, {
                        toValue: 0,
                        duration: 200,
                        useNativeDriver: true,
                    }),
                ]).start(() => {
                    if (onComplete) onComplete();
                });
            }, 1500);

            return () => clearTimeout(timer);
        } else {
            scaleAnim.setValue(0);
            opacityAnim.setValue(0);
        }
    }, [visible]);

    return (
        <Modal
            transparent
            visible={visible}
            animationType="none"
            statusBarTranslucent
        >
            <View style={styles.overlay}>
                <Animated.View
                    style={[
                        styles.content,
                        {
                            opacity: opacityAnim,
                            transform: [{ scale: scaleAnim }],
                        },
                    ]}
                >
                    <View style={styles.iconContainer}>
                        <MaterialIcons
                            name="check-circle"
                            size={80}
                            color={colors.white}
                        />
                    </View>
                </Animated.View>
            </View>
        </Modal>
    );
};