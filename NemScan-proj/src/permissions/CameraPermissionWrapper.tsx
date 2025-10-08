import React, { useState } from "react";
import { View, Text } from "react-native";
import CameraPermissionScreen from "./cameraPermissionScreen";
import { useCameraPermission } from "@/src/hooks/useCameraPermission";
import { CameraPermissionWrapperProps } from "./interfaces";
import "@/i18n/i18n.config";
import { useTranslation } from "react-i18next";

export default function CameraPermissionWrapper({ children }: CameraPermissionWrapperProps) {
    const { t } = useTranslation();
    const { status, requestPermission } = useCameraPermission();
    const [skipped, setSkipped] = useState(false);

    if (status === null || skipped) {
        return <>{children}</>;
    }

    if (status === "undetermined") {
        return (
            <CameraPermissionScreen
                onRequestPermission={requestPermission}
                onSkip={() => setSkipped(true)}
            />
        );
    }

    if (status === "denied") {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>{t("permission.deniedByUser")}</Text>
            </View>
        );
    }

    // status === "granted"
    return <>{children}</>;
}
