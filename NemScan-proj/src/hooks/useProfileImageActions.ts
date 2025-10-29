import { Alert, Linking } from "react-native";
import * as ImagePicker from "expo-image-picker";
import "@/i18n/i18n.config";
import { useTranslation } from "react-i18next";
import { getEmployeeProfile, uploadEmployeeProfileImage, deleteEmployeeProfileImage } from "@/src/services/employee/employeeService";
import { useGalleryPermission } from "@/src/hooks/useGalleryPermission";

export const useProfileImageActions = (
    setEmployee: (emp: any) => void,
    setToast: (toast: any) => void
) => {
    const { t } = useTranslation(["screens", "common"]);
    const { hasPermission, requestPermission } = useGalleryPermission();

    // Change profile image
    const handleProfileImageUpload = async () => {
        try {
            if (hasPermission === false) {
                Alert.alert(
                    t("screens:settings.permission.permissionDeniedTitle"),
                    t("screens:settings.permission.permissionDeniedMessage"),
                    [
                        { text: t("common:cancel"), style: "cancel" },
                        {
                            text: t("common:goToSettings"),
                            onPress: () => Linking.openSettings(),
                        },
                    ]
                );
                return;
            }

            if (hasPermission === null) {
                const granted = await requestPermission();
                if (!granted) {
                    setToast({
                        type: "error",
                        message: "Permission to access camera roll was denied",
                    });
                    return;
                }
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.8,
            });

            if (result.canceled) return;

            const uri = result.assets[0].uri;
            const filename = uri.split("/").pop() || "profile.jpg";
            const match = /\.(\w+)$/.exec(filename);
            const type = match ? `image/${match[1]}` : `image`;

            const file = { uri, name: filename, type } as any;

            setToast({ type: "loading", message: t("screens:settings.toastStates.uploading") });

            await uploadEmployeeProfileImage(file);
            const updated = await getEmployeeProfile();
            setEmployee(updated);

            setToast({ type: "success", message: t("screens:settings.toastStates.uploadSuccess") });
        } catch (err) {
            console.error("Upload error:", err);
            setToast({
                type: "error",
                message: t("screens:settings.toastStates.errorUploadingImage"),
            });
        } finally {
            setTimeout(() => setToast({ type: null, message: "" }), 2000);
        }
    };

    // Reset profile image
    const handleResetProfileImage = () => {
        Alert.alert(
            t("screens:settings.preferences.resetProfileImageConfirmTitle"),
            t("screens:settings.preferences.resetProfileImageConfirmMessage"),
            [
                { text: t("common:cancel"), style: "cancel" },
                {
                    text: t("common:confirm"),
                    style: "destructive",
                    onPress: async () => {
                        try {
                            setToast({ type: "loading", message: t("screens:settings.toastStates.deletingImage") });
                            await deleteEmployeeProfileImage();
                            const updated = await getEmployeeProfile();
                            setEmployee(updated);
                            setToast({ type: "success", message: t("screens:settings.toastStates.imageDeletedSuccess") });
                        } catch (err) {
                            console.error("Delete error:", err);
                            setToast({
                                type: "error",
                                message: t("screens:settings.toastStates.errorDeletingImage"),
                            });
                        } finally {
                            setTimeout(() => setToast({ type: null, message: "" }), 2000);
                        }
                    },
                },
            ]
        );
    };

    return { handleProfileImageUpload, handleResetProfileImage };
};
