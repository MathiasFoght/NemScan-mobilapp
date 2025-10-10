import { View, Text, StyleSheet } from "react-native";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/src/contexts/authContext";
import CameraPermissionWrapper from "@/src/permissions/CameraPermissionWrapper";
import { MaterialIcons } from "@expo/vector-icons";
import Button from "@/src/ui/button/button";
import styles from "@/src/styles/screens/scanScreen.styles";
import { colors } from "@/src/shared/global/colors";
import "@/i18n/i18n.config";
import { useTranslation } from "react-i18next";

import { useCameraPermissions } from "expo-camera";
import Scanner from "@/src/components/scanner/scanner"; // ✅ importér din nye komponent

export default function Index() {
    const { t } = useTranslation();
    const { userType } = useAuth();

    const [scannedData, setScannedData] = useState<string | null>(null);
    const [permission, requestPermission] = useCameraPermissions();

    // Redirect hvis medarbejder
    useEffect(() => {
        if (userType === "employee") router.replace("/(tabs)");
    }, [userType]);

    // Kamera tilladelse
    useEffect(() => {
        if (!permission) requestPermission();
    }, [permission]);

    const handleEmployeeLogin = () => {
        router.push("/loginScreen");
    };

    const handleScanned = (data: string) => {
        console.log("Scannet:", data);
        setScannedData(data);
        // fx: router.push(`/product/${data}`);
    };

    if (!permission) {
        return <Text>Anmoder om kamera adgang...</Text>;
    }

    if (!permission.granted) {
        return <Text>Ingen adgang til kameraet</Text>;
    }

    return (
        <CameraPermissionWrapper>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                {/* ✅ Scanner komponent */}
                <Scanner onScanned={handleScanned} />

                {/* ✅ Scannet resultat */}
                {scannedData && (
                    <View style={localStyles.resultBox}>
                        <Text style={localStyles.resultText}>
                            {t("scan.result")}: {scannedData}
                        </Text>
                        <Button
                            onPress={() => setScannedData(null)}
                            title={t("scan.scanAgain")}
                            variant="simple"
                        />
                    </View>
                )}
            </View>

            {/* ✅ Footer bevares */}
            <View style={styles.footer}>
                <Button
                    onPress={handleEmployeeLogin}
                    title={t("login.employeeLogin")}
                    variant="simple"
                    icon={<MaterialIcons name="person-outline" size={16} color={colors.primary} />}
                    iconPosition="left"
                    textStyle={styles.employeeText}
                    style={styles.employeeButton}
                />
            </View>
        </CameraPermissionWrapper>
    );
}

const localStyles = StyleSheet.create({
    resultBox: {
        position: "absolute",
        bottom: 180,
        alignSelf: "center",
        backgroundColor: "rgba(0,0,0,0.7)",
        padding: 16,
        borderRadius: 10,
    },
    resultText: {
        color: "white",
        marginBottom: 8,
        textAlign: "center",
    },
});
