import { View, StyleSheet } from "react-native";
import { useState } from "react";
import { CameraView, BarcodeScanningResult } from "expo-camera";
import { localStyles } from "./scanner.styles";
import {ScannerProps} from "@/src/components/scanner/interfaces";

export default function Scanner({ onScanned }: ScannerProps) {
    const [scanned, setScanned] = useState(false);

    const handleBarCodeScanned = (result: BarcodeScanningResult) => {
        if (!scanned) {
            setScanned(true);
            onScanned(result.data);
            // Du kan evt. lave en reset via timeout
            setTimeout(() => setScanned(false), 2000);
        }
    };

    return (
        <View style={localStyles.overlay}>
            <View style={localStyles.cameraBox}>
                <CameraView
                    style={StyleSheet.absoluteFill}
                    onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
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
