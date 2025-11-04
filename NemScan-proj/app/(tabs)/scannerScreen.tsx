import { View, Text, Modal, TouchableOpacity, TextInput } from "react-native";
import { useEffect, useState, useCallback } from "react";
import { router } from "expo-router";
import { useAuth } from "@/src/contexts/authContext";
import { useProduct } from "@/src/contexts/productContext";
import CameraPermissionWrapper from "@/src/permissions/cameraPermissionWrapper";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "@/src/styles/screens/scanScreen.styles";
import { colors } from "@/src/shared/global/colors";
import '@/i18n/i18n.config';
import { useTranslation } from "react-i18next";
import { useCameraPermissions } from "expo-camera";
import Scanner from "@/src/components/scanner/scanner";
import { getProductEmployee } from "@/src/services/product/productService";
import { useFocusEffect } from "@react-navigation/native";
import { ProductEmployee, ProductCustomer } from "@/src/services/product/interfaces";

export default function ScannerScreen() {
    const { t } = useTranslation(["screens"]);
    const { userType } = useAuth();
    const { setCustomerProduct, setEmployeeProduct } = useProduct();
    const [scanning, setScanning] = useState(false);
    const [permission, requestPermission] = useCameraPermissions();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [manualEntryModalVisible, setManualEntryModalVisible] = useState(false);
    const [manualBarcode, setManualBarcode] = useState("");
    const [manualErrorMessage, setManualErrorMessage] = useState<string | null>(null);

    useFocusEffect(
        useCallback(() => {
            setScanning(false);
            setErrorMessage(null);
        }, [])
    );

    useEffect(() => {
        if (!permission) requestPermission();
    }, [permission]);


    const handleScanned = async (barcode: string) => {
        if (scanning) return false;
        setScanning(true);

        try {
            if (userType === "employee") {
                const product: ProductCustomer = await getProductEmployee(barcode);
                if (product) {
                    setCustomerProduct(product);
                    setTimeout(() => router.push({ pathname: "/productScreen", params: { barcode } }), 100);
                    return true;
                }
            } else {
                const product: ProductEmployee = await getProductEmployee(barcode);
                if (product) {
                    setEmployeeProduct(product);
                    setTimeout(() => router.push({ pathname: "/productScreen", params: { barcode } }), 100);
                    return true;
                }
            }
            setErrorMessage("Produktet findes ikke i systemet.");
            return false;
        } catch {
            setErrorMessage(t("screens:scanner.errorModal.message"));
            return false;
        }
    };

    const handleClosePopup = () => {
        setErrorMessage(null);
        setScanning(false);
    };

    const navigateToProductNotFound = () => {
        setErrorMessage(null);
        router.push("/productNotFoundScreen");
    };

    const handleOpenManualEntry = () => {
        setManualBarcode("");
        setManualEntryModalVisible(true);
    };

    const handleCloseManualEntry = () => {
        setManualEntryModalVisible(false);
        setManualBarcode("");
        setManualErrorMessage(null);
    };

    const isValidBarcode = (code: string) => {
        const trimmed = code.trim();
        if (!/^\d+$/.test(trimmed)) return false;

        return trimmed.length === 8 || trimmed.length === 13;
    };

    const handleSubmitManualBarcode = () => {
        const trimmed = manualBarcode.trim();

        if (isValidBarcode(trimmed)) {
            setManualErrorMessage(null);
            handleScanned(trimmed);
            setManualEntryModalVisible(false);
        } else {
            setManualErrorMessage(t("screens:scanner.manualEntryModal.validationError"));
        }
    };


    return (
        <CameraPermissionWrapper>
            <View style={styles.container}>
                <View style={styles.scannerContainer}>
                    <Scanner onScanned={handleScanned} paused={scanning} />
                </View>

                 <Modal
                    transparent
                    animationType="fade"
                    visible={!!errorMessage}
                    onRequestClose={handleClosePopup}>
                        <View style={styles.modalBackground}>
                                <View style={styles.modalBox}>
                                    <MaterialIcons
                                        name="error-outline"
                                        size={56}
                                        color={colors.attention}
                                        style={styles.modalIcon}
                                    />
                                    <Text style={styles.modalTitle}>{t("screens:scanner.errorModal.title")}</Text>
                                    <Text style={styles.modalText}>{errorMessage}</Text>

                                    <TouchableOpacity style={styles.modalButton} onPress={handleClosePopup}>
                                        <Text style={styles.modalButtonText}>{t("screens:scanner.errorModal.tryAgain")}</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[styles.modalButton, styles.reportButton]}
                                        onPress={navigateToProductNotFound}
                                    >
                                        <Text style={styles.modalButtonText}>{t("screens:scanner.errorModal.report")}</Text>
                                    </TouchableOpacity>

                                </View>
                         </View>
                  </Modal>


                <Modal
                    transparent
                    animationType="fade"
                    visible={manualEntryModalVisible}
                    onRequestClose={handleCloseManualEntry}
                >
                    <View style={styles.modalBackground}>
                        <View style={styles.modalBox}>
                            <Text style={styles.modalTitle}>{t("screens:scanner.manualEntryModal.title")}</Text>
                            <TextInput
                                style={styles.input}
                                placeholder={t("screens:scanner.manualEntryModal.placeholder")}
                                placeholderTextColor="#6c757d"
                                value={manualBarcode}
                                onChangeText={setManualBarcode}
                                keyboardType="numeric"
                                autoFocus
                            />
                            {manualErrorMessage && (
                                <Text style={styles.errorText}>{manualErrorMessage}</Text>
                            )}
                            <View style={styles.modalButtonContainer}>
                                <TouchableOpacity
                                    style={[styles.modalButton, styles.cancelButton]}
                                    onPress={handleCloseManualEntry}
                                >
                                    <Text style={styles.modalButtonText}>{t("screens:scanner.manualEntryModal.modalClose")}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.modalButton} onPress={handleSubmitManualBarcode}>
                                    <Text style={styles.modalButtonText}>{t("screens:scanner.manualEntryModal.modalConfirm")}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                <View style={styles.manualEntryContainer}>
                    <TouchableOpacity style={styles.manualEntryButton} onPress={handleOpenManualEntry}>
                        <MaterialIcons name="edit" size={20} color={colors.primary} />
                        <Text style={styles.manualEntryText}>{t("screens:scanner.manualEntryText")}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.instructionContainer}>
                    <View style={styles.instructionBox}>
                        <MaterialIcons
                            name="barcode-reader"
                            size={80}
                            color={colors.primary}
                            style={styles.instructionIcon}
                        />
                        <Text style={styles.instructionTitle}>{t("screens:scanner.instructionTitle")}</Text>
                        <Text style={styles.instructionText}>{t("screens:scanner.instructionText")}</Text>
                    </View>
                </View>
            </View>
        </CameraPermissionWrapper>
    );
}
