import React from "react";
import { CameraPermissionProps } from "@/src/permissions/interfaces";
import { View, Text } from "react-native";
import styles from "./cameraPermission.styles";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/src/shared/global/colors";
import Button from "@/src/ui/button/button";
import "@/i18n/i18n.config";
import { useTranslation } from "react-i18next";

export default function CameraPermissionScreen({ onRequestPermission, onSkip }: CameraPermissionProps) {
    const { t } = useTranslation();

    const onSkipPress = () => {
        console.log("Camera permission denied by user.");
        onSkip();
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.iconCircle}>
                    <MaterialIcons name="camera-alt" size={40} color={colors.primary} />
                </View>
                <Text style={styles.title}>{t("permission.title")}</Text>
                <Text style={styles.text}>{t("permission.message")}</Text>
            </View>

            <View style={styles.footer}>
                <View style={styles.skipContainer}>
                    <Button
                        onPress={onSkipPress}
                        title={t("permission.denyPermission")}
                        variant="simple"
                        textStyle={styles.skipText}
                    />
                </View>

                <Button
                    title={t("permission.grantPermission")}
                    onPress={onRequestPermission}
                    variant="primary"
                />
            </View>
        </View>
    );
}
