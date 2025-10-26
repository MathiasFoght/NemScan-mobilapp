import { useEffect, useRef } from "react";
import { View, StyleSheet } from "react-native";
import { CameraView, BarcodeScanningResult } from "expo-camera";
import * as Haptics from "expo-haptics";
import { Audio } from "expo-av";
import { ScannerProps } from "@/src/components/scanner/interfaces";
import styles from "./scanner.styles";

export default function Scanner({ onScanned, paused }: ScannerProps) {
    const lastScanned = useRef<string | null>(null);
    const stopped = useRef(false);
    const cooldown = useRef(false);

    useEffect(() => {
        stopped.current = paused || false;
    }, [paused]);

    // Afspil lyd og håndter fejl
    const playSound = async (soundFile: any) => {
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

    const handleBarCodeScanned = async (result: BarcodeScanningResult) => {
        if (paused || stopped.current || cooldown.current) return;
        if (lastScanned.current === result.data) return;

        lastScanned.current = result.data;
        cooldown.current = true;

        try {
            const success = await onScanned(result.data);

            if (success) {
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


    return (
        <View style={styles.overlay}>
            <View style={styles.cameraBox}>
                {!paused && (
                    <CameraView
                        style={StyleSheet.absoluteFill}
                        onBarcodeScanned={handleBarCodeScanned}
                        barcodeScannerSettings={{
                            barcodeTypes: ["ean13", "upc_a", "upc_e", "ean8", "code128"],
                        }}
                    />
                )}

                {/* Transparente overlays */}
                <View style={styles.overlayTop} />
                <View style={styles.overlayBottom} />
                <View style={styles.overlayLeft} />
                <View style={styles.overlayRight} />

                {/* Inderste lag */}
                <View style={styles.cameraInner} />
                <View style={styles.innerFrame} />
            </View>
        </View>
    );
}
