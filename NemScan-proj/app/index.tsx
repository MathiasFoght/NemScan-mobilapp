import { View, Text, StyleSheet } from "react-native";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/src/contexts/authContext";
import CameraPermissionWrapper from "@/src/permissions/CameraPermissionWrapper";
import { MaterialIcons } from "@expo/vector-icons";
import Button from "@/src/ui/button/button";
import styles from "@/src/styles/scanScreen.styles";
import { colors } from "@/src/shared/global/colors";
import "@/i18n/i18n.config";
import { useTranslation } from "react-i18next";

import { CameraView, useCameraPermissions, BarcodeScanningResult } from "expo-camera";

export default function Index() {
    const { t } = useTranslation();
    const { userType } = useAuth();

    const [scanned, setScanned] = useState(false);
    const [data, setData] = useState<string | null>(null);

    const [permission, requestPermission] = useCameraPermissions();

    useEffect(() => {
        if (userType === "employee") router.replace("/(tabs)");
    }, [userType]);

    useEffect(() => {
        if (!permission) requestPermission();
    }, [permission]);

    const handleEmployeeLogin = () => {
        router.push("/loginScreen");
    };

    const handleBarCodeScanned = (result: BarcodeScanningResult) => {
        if (!scanned) {
            setScanned(true);
            setData(result.data);
            console.log("Scannet:", result.data);
            // fx router.push(`/product/${result.data}`);
        }
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
                <View style={localStyles.overlay}>
                    <View style={localStyles.cameraBox}>
                        <CameraView
                            style={StyleSheet.absoluteFill}
                            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                            barcodeScannerSettings={{
                                barcodeTypes: ["qr", "ean13", "ean8", "code128"],
                            }}
                        />

                        <View style={localStyles.overlayTop} />
                        <View style={localStyles.overlayBottom} />
                        <View style={localStyles.overlayLeft} />
                        <View style={localStyles.overlayRight} />

                        <View style={localStyles.cameraInner} />

                        <View style={localStyles.innerFrame} />
                    </View>
                </View>

                {scanned && (
                    <View style={localStyles.resultBox}>
                        <Text style={localStyles.resultText}>
                            {t("scan.result")}: {data}
                        </Text>
                        <Button
                            onPress={() => setScanned(false)}
                            title={t("scan.scanAgain")}
                            variant="simple"
                        />
                    </View>
                )}
            </View>

            {/* Footer */}
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
    overlay: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: "#00000000",
        paddingTop: "25%",
    },

    cameraBox: {
        width: "90%",
        height: "30%",
        borderRadius: 32,
        borderWidth: 6,
        borderColor: colors.primary,
        overflow: "hidden",
        position: "relative",
    },

    overlayTop: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 25,
        backgroundColor: "rgba(0,0,0,0.3)",
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
    },
    overlayBottom: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 25,
        backgroundColor: "rgba(0,0,0,0.3)",
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
    },
    overlayLeft: {
        position: "absolute",
        top: 25,
        bottom: 25,
        left: 0,
        width: 25,
        backgroundColor: "rgba(0,0,0,0.3)",
    },
    overlayRight: {
        position: "absolute",
        top: 25,
        bottom: 25,
        right: 0,
        width: 25,
        backgroundColor: "rgba(0,0,0,0.3)",
    },

    cameraInner: {
        position: "absolute",
        top: 15,
        left: 15,
        right: 15,
        bottom: 15,
        borderRadius: 20,
        overflow: "hidden",
    },

    innerFrame: {
        position: "absolute",
        top: 23,
        left: 23,
        right: 23,
        bottom: 23,
        borderWidth: 1,
        borderColor: colors.white,
        borderStyle: "dashed",
        borderRadius: 5,
        backgroundColor: "transparent",
    },

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
