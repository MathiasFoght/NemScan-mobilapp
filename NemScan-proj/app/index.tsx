import { View, Text, StyleSheet, Modal } from "react-native";
import { useEffect, useState, useCallback } from "react";
import { router } from "expo-router";
import { useAuth } from "@/src/contexts/authContext";
import CameraPermissionWrapper from "@/src/permissions/CameraPermissionWrapper";
import { MaterialIcons } from "@expo/vector-icons";
import Button from "@/src/ui/button/button";
import styles from "@/src/styles/screens/scanScreen.styles";
import { colors } from "@/src/shared/global/colors";
import { useTranslation } from "react-i18next";
import { useCameraPermissions } from "expo-camera";
import Scanner from "@/src/components/scanner/scanner";
import { getProductCustomer} from "@/src/services/product/productService";
import { useFocusEffect } from '@react-navigation/native';

export default function Index() {
    const { t } = useTranslation();
    const { userType } = useAuth();

    const [scanning, setScanning] = useState(false);
    const [permission, requestPermission] = useCameraPermissions();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Reset scanning når skærmen får fokus
    useFocusEffect(
        useCallback(() => {
            setScanning(false);
        }, [])
    );

    useEffect(() => {
        if (userType === "employee") router.replace("/(tabs)");
    }, [userType]);

    useEffect(() => {
        if (!permission) requestPermission();
    }, [permission]);

    const handleEmployeeLogin = () => {
        router.push("/loginScreen");
    };

    const handleScanned = async (barcode: string) => {
        if (scanning) return;
        setScanning(true);

        try {
            const product = await getProductCustomer(barcode);

            if (product) {
                router.push({
                    pathname: "/productScreen",
                    params: { barcode },
                });
            } else {
                setErrorMessage("Produktet findes ikke i systemet.");
            }
        } catch (error) {
            console.error("Fejl under scanning:", error);
            setErrorMessage("Kunne ikke kontakte serveren.");
        }
    };

    const handleClosePopup = () => {
        setErrorMessage(null);
        setScanning(false); // tillad scanning igen
    };

    if (!permission) return <Text>Anmoder om kamera adgang...</Text>;
    if (!permission.granted) return <Text>Ingen adgang til kameraet</Text>;

    return (
        <CameraPermissionWrapper>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                {/* Scanner */}
                <Scanner onScanned={handleScanned} paused={scanning} />

                {/* Popup modal */}
                <Modal
                    transparent
                    animationType="fade"
                    visible={!!errorMessage}
                    onRequestClose={handleClosePopup}
                >
                    <View style={localStyles.modalBackground}>
                        <View style={localStyles.modalBox}>
                            <Text style={localStyles.modalText}>{errorMessage}</Text>
                            <Button
                                onPress={handleClosePopup}
                                title="Luk"
                                variant="simple"
                            />
                        </View>
                    </View>
                </Modal>
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
    modalBackground: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalBox: {
        width: "80%",
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
    },
    modalText: {
        marginBottom: 16,
        fontSize: 16,
        textAlign: "center",
    },
});
