import { useRef } from "react";
import { View, StyleSheet } from "react-native";
import { CameraView, BarcodeScanningResult } from "expo-camera";
import { ScannerProps } from "@/src/components/scanner/interfaces";
import { localStyles } from "./scanner.styles";

export default function Scanner({ onScanned, paused }: ScannerProps) {
    const lastScanned = useRef<string | null>(null);

    const handleBarCodeScanned = (result: BarcodeScanningResult) => {
        if (paused) return; // hvis parent har paused scanner
        if (lastScanned.current === result.data) return; // ignore duplikater

        lastScanned.current = result.data;
        onScanned(result.data);

        // reset efter 1 sekund så man kan scanne samme kode igen senere
        setTimeout(() => {
            lastScanned.current = null;
        }, 1000);
    };

    return (
        <View style={localStyles.overlay}>
            <View style={localStyles.cameraBox}>
                <CameraView
                    style={StyleSheet.absoluteFill}
                    onBarcodeScanned={handleBarCodeScanned}
                    barcodeScannerSettings={{
                        barcodeTypes: ["qr", "ean13", "ean8", "code128"],
                    }}
                />

                {/* Transparente overlays */}
                <View style={localStyles.overlayTop} />
                <View style={localStyles.overlayBottom} />
                <View style={localStyles.overlayLeft} />
                <View style={localStyles.overlayRight} />

                {/* Inderste lag */}
                <View style={localStyles.cameraInner} />
                <View style={localStyles.innerFrame} />
            </View>
        </View>
    );
}
