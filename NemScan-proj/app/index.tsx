import { View, Text, Modal, TouchableOpacity, TextInput } from "react-native";
import { useEffect, useState, useCallback } from "react";
import { router } from "expo-router";
import { useAuth } from "@/src/contexts/authContext";
import { useProduct } from "@/src/contexts/productContext";
import CameraPermissionWrapper from "@/src/permissions/CameraPermissionWrapper";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "@/src/styles/screens/scanScreen.styles";
import { colors } from "@/src/shared/global/colors";
import { useTranslation } from "react-i18next";
import { useCameraPermissions } from "expo-camera";
import Scanner from "@/src/components/scanner/scanner";
import { getProductCustomer } from "@/src/services/product/productService";
import { useFocusEffect } from "@react-navigation/native";

export default function StartScreen() {
    const { t } = useTranslation();
    const { userType } = useAuth();
    const { setCustomerProduct, clearProducts } = useProduct();
    const [scanning, setScanning] = useState(false);
    const [permission, requestPermission] = useCameraPermissions();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [manualEntryModalVisible, setManualEntryModalVisible] = useState(false);
    const [manualBarcode, setManualBarcode] = useState("");

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
        if (scanning) return false;
        clearProducts();
        setScanning(true);

        try {
            const product = await getProductCustomer(barcode);

            if (product) {
                setCustomerProduct(product);

                setTimeout(() => {
                    router.push({ pathname: "/productScreen", params: { barcode } });
                }, 100);

                return true;
            } else {
                setErrorMessage("Produktet findes ikke i systemet.");
                return false;
            }
        } catch {
            setErrorMessage("Beklager! Produkt blev ikke fundet.");
            return false;
        }
    };

    const handleClosePopup = () => {
        setErrorMessage(null);
        clearProducts();
        setScanning(false);
    };

    const navigateToProductNotFound = () => {
        router.push("/productNotFoundScreen");
        handleClosePopup();
    };

    const handleOpenManualEntry = () => {
        setManualBarcode("");
        setManualEntryModalVisible(true);
    };

    const handleCloseManualEntry = () => {
        setManualEntryModalVisible(false);
        setManualBarcode("");
    };

    const handleSubmitManualBarcode = () => {
        if (manualBarcode.trim()) {
            handleScanned(manualBarcode);
            setManualEntryModalVisible(false);
        } else {
            setErrorMessage("Indtast venligst en gyldig stregkode.");
        }
    };

    if (!permission) return <Text>Anmoder om kamera adgang...</Text>;
    if (!permission.granted) return <Text>Ingen adgang til kameraet</Text>;

    return (
        <CameraPermissionWrapper>
            <View style={styles.container}>
                <View style={styles.scannerContainer}>
                    <Scanner onScanned={handleScanned} paused={scanning} />
                </View>

                <Modal transparent animationType="fade" visible={!!errorMessage} onRequestClose={handleClosePopup}>
                    <View style={styles.modalBackground}>
                        <View style={styles.modalBox}>
                            <MaterialIcons name="error-outline" size={56} color={colors.important} style={styles.modalIcon} />
                            <Text style={styles.modalTitle}>Kunne ikke finde produkt</Text>
                            <Text style={styles.modalText}>{errorMessage}</Text>

                            <TouchableOpacity style={styles.modalButton} onPress={handleClosePopup}>
                                <Text style={styles.modalButtonText}>Prøv igen</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.modalButton, styles.reportButton]}
                                onPress={navigateToProductNotFound}
                            >
                                <Text style={styles.modalButtonText}>Rapportér</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </Modal>

                <Modal transparent animationType="fade" visible={manualEntryModalVisible} onRequestClose={handleCloseManualEntry}>
                    <View style={styles.modalBackground}>
                        <View style={styles.modalBox}>
                            <Text style={styles.modalTitle}>Indtast stregkode</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Indtast stregkode"
                                placeholderTextColor="#6c757d"
                                value={manualBarcode}
                                onChangeText={setManualBarcode}
                                keyboardType="numeric"
                                autoFocus
                            />
                            <View style={styles.modalButtonContainer}>
                                <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={handleCloseManualEntry}>
                                    <Text style={styles.modalButtonText}>Annuller</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.modalButton} onPress={handleSubmitManualBarcode}>
                                    <Text style={styles.modalButtonText}>Udfør</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                <View style={styles.manualEntryContainer}>
                    <TouchableOpacity style={styles.manualEntryButton} onPress={handleOpenManualEntry}>
                        <MaterialIcons name="edit" size={20} color={colors.primary} />
                        <Text style={styles.manualEntryText}>Indtast manuelt</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.instructionContainer}>
                    <View style={styles.instructionBox}>
                        <MaterialIcons name="barcode-reader" size={80} color={colors.primary} style={styles.instructionIcon} />
                        <Text style={styles.instructionTitle}>Scan stregkode</Text>
                        <Text style={styles.instructionText}>Placer stregkoden inden for rammen.</Text>
                    </View>
                </View>

                <View style={styles.footer}>
                    <TouchableOpacity style={styles.employeeButton} onPress={handleEmployeeLogin}>
                        <MaterialIcons name="person-outline" size={20} color={colors.primary} />
                        <Text style={styles.employeeText}>{t("login.employeeLogin")}</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </CameraPermissionWrapper>
    );
}