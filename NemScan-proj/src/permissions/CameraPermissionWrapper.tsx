import React, { useState } from "react";
import { View, Text } from "react-native";
import CameraPermissionScreen from "./cameraPermissionScreen"
import { useCameraPermission } from "@/src/hooks/useCameraPermission";
import { Props } from "./interfaces"

export default function CameraPermissionWrapper({ children }: Props) {
    const { hasPermission, requestPermission } = useCameraPermission();
    const [skipped, setSkipped] = useState(false);

    if (hasPermission === null || skipped) {
        return <>{children}</>;
    }

    if (!hasPermission) {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>Kamera adgang ikke givet. Gå til indstillinger for at slå det til.</Text>
            </View>
        );
    }

    return (
        <CameraPermissionScreen
            onRequestPermission={requestPermission}
            onSkip={() => setSkipped(true)}
        />
    );
}
