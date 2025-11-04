import React, {useCallback, useEffect, useRef, useState} from "react";
import { View, StyleSheet, Animated } from "react-native";
import { CameraView, BarcodeScanningResult } from "expo-camera";
import * as Haptics from "expo-haptics";
import { Audio } from "expo-av";
import { ScannerProps } from "@/src/components/scanner/interfaces";
import styles from "./scanner.styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useFocusEffect} from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/src/shared/global/colors";

interface Particle {
    id: number;
    x: Animated.Value;
    y: Animated.Value;
    rotation: Animated.Value;
    opacity: Animated.Value;
    color: string;
}

export default function Scanner({ onScanned, paused }: ScannerProps) {
    const lastScanned = useRef<string | null>(null);
    const stopped = useRef(false);
    const cooldown = useRef(false);
    const [soundEnabled, setSoundEnabled] = useState(true);

    // Animation states
    const [showSuccess, setShowSuccess] = useState(false);
    const pulseAnim = useRef(new Animated.Value(0)).current;
    const checkmarkScale = useRef(new Animated.Value(0)).current;
    const successOpacity = useRef(new Animated.Value(0)).current;
    const borderColorAnim = useRef(new Animated.Value(0)).current;
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        stopped.current = paused || false;
    }, [paused]);

    useFocusEffect(
        useCallback(() => {
            (async () => {
                const stored = await AsyncStorage.getItem("scannerSoundEnabled");
                if (stored !== null) {
                    setSoundEnabled(stored === "true");
                }
            })();
        }, [])
    );

    const playSound = async (soundFile: any) => {
        if (!soundEnabled) return;
        try {
            const { sound } = await Audio.Sound.createAsync(soundFile);
            await sound.playAsync();
            sound.setOnPlaybackStatusUpdate((status) => {
                if (status.isLoaded && status.didJustFinish) {
                    void sound.unloadAsync();
                }
            });
        } catch (err) {
            console.warn("Kunne ikke afspille lyd", err);
        }
    };

    const createConfetti = () => {
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE'];
        const newParticles: Particle[] = [];

        for (let i = 0; i < 20; i++) {
            newParticles.push({
                id: Date.now() + i,
                x: new Animated.Value(Math.random() * 100 - 50),
                y: new Animated.Value(-50),
                rotation: new Animated.Value(0),
                opacity: new Animated.Value(1),
                color: colors[Math.floor(Math.random() * colors.length)]
            });
        }

        setParticles(newParticles);

        newParticles.forEach((particle, index) => {
            Animated.parallel([
                Animated.timing(particle.y, {
                    toValue: 300,
                    duration: 1500 + Math.random() * 500,
                    useNativeDriver: true,
                }),
                Animated.timing(particle.rotation, {
                    toValue: Math.random() * 720 - 360,
                    duration: 1500,
                    useNativeDriver: true,
                }),
                Animated.timing(particle.opacity, {
                    toValue: 0,
                    duration: 1500,
                    useNativeDriver: true,
                })
            ]).start(() => {
                if (index === newParticles.length - 1) {
                    setParticles([]);
                }
            });
        });
    };

    const triggerSuccessAnimation = () => {
        setShowSuccess(true);

        // Reset animations
        pulseAnim.setValue(0);
        checkmarkScale.setValue(0);
        successOpacity.setValue(1);
        borderColorAnim.setValue(0);

        // Create confetti
        createConfetti();

        // Border color flash animation (gul)
        Animated.sequence([
            Animated.timing(borderColorAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: false, // Color animations don't support native driver
            }),
            Animated.timing(borderColorAnim, {
                toValue: 0,
                duration: 400,
                useNativeDriver: false,
            })
        ]).start();

        // Pulse animation
        Animated.sequence([
            Animated.timing(pulseAnim, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
            }),
        ]).start();

        // Checkmark pop animation
        Animated.spring(checkmarkScale, {
            toValue: 1,
            tension: 50,
            friction: 5,
            useNativeDriver: true,
        }).start();

        // Fade out everything
        setTimeout(() => {
            Animated.timing(successOpacity, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start(() => {
                setShowSuccess(false);
            });
        }, 1000);
    };

    const handleBarCodeScanned = async (result: BarcodeScanningResult) => {
        if (paused || stopped.current || cooldown.current) return;
        if (lastScanned.current === result.data) return;

        lastScanned.current = result.data;
        cooldown.current = true;

        try {
            const success = await onScanned(result.data);

            if (success) {
                triggerSuccessAnimation();
                void playSound(require('@/assets/sounds/success.mp3'));
                void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            } else {
                void playSound(require('@/assets/sounds/fail.mp3'));
                void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            }
        } catch (err) {
            void playSound(require('@/assets/sounds/fail.mp3'));
            void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        }

        setTimeout(() => {
            lastScanned.current = null;
            cooldown.current = false;
        }, 1000);
    };

    const pulseScale = pulseAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 3]
    });

    const pulseOpacity = pulseAnim.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0.8, 0.4, 0]
    });

    const borderColor = borderColorAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [colors.primary, '#FFD700'] // Fra primary til gul
    });

    return (
        <View style={styles.overlay}>
            <Animated.View style={[
                styles.cameraBox,
                {
                    borderColor: showSuccess ? borderColor : colors.primary
                }
            ]}>
                <CameraView
                    style={StyleSheet.absoluteFill}
                    onBarcodeScanned={paused ? undefined : handleBarCodeScanned}
                    barcodeScannerSettings={{
                        barcodeTypes: ["ean13", "upc_a", "upc_e", "ean8", "code128"],
                    }}
                />

                {/* Transparente overlays */}
                <View style={styles.overlayTop} />
                <View style={styles.overlayBottom} />
                <View style={styles.overlayLeft} />
                <View style={styles.overlayRight} />

                {/* Inderste lag */}
                <View style={styles.cameraInner} />
                <View style={styles.innerFrame} />

                {/* Success Animation */}
                {showSuccess && (
                    <Animated.View
                        style={[
                            StyleSheet.absoluteFill,
                            {
                                opacity: successOpacity,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }
                        ]}
                        pointerEvents="none"
                    >
                        {/* Pulserende grøn cirkel */}
                        <Animated.View
                            style={{
                                position: 'absolute',
                                width: 100,
                                height: 100,
                                borderRadius: 50,
                                backgroundColor: '#4CAF50',
                                transform: [{ scale: pulseScale }],
                                opacity: pulseOpacity,
                            }}
                        />

                        {/* Checkmark */}
                        <Animated.View
                            style={{
                                transform: [{ scale: checkmarkScale }],
                                backgroundColor: '#4CAF50',
                                borderRadius: 30,
                                padding: 8,
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 4 },
                                shadowOpacity: 0.3,
                                shadowRadius: 8,
                                elevation: 8,
                            }}
                        >
                            <MaterialIcons name="check" size={40} color="white" />
                        </Animated.View>

                        {/* Confetti partikler */}
                        {particles.map((particle) => (
                            <Animated.View
                                key={particle.id}
                                style={{
                                    position: 'absolute',
                                    width: 10,
                                    height: 10,
                                    backgroundColor: particle.color,
                                    borderRadius: 5,
                                    transform: [
                                        { translateX: particle.x },
                                        { translateY: particle.y },
                                        {
                                            rotate: particle.rotation.interpolate({
                                                inputRange: [0, 360],
                                                outputRange: ['0deg', '360deg']
                                            })
                                        }
                                    ],
                                    opacity: particle.opacity,
                                }}
                            />
                        ))}
                    </Animated.View>
                )}
            </Animated.View>
        </View>
    );
}