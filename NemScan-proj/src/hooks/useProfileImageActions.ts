import { Alert, Linking } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useTranslation } from "react-i18next";
import { getEmployeeProfile, uploadEmployeeProfileImage, deleteEmployeeProfileImage } from "@/src/services/employee/employeeService";
import { useGalleryPermission } from "@/src/hooks/useGalleryPermission";

export const useProfileImageActions = (
    setEmployee: (emp: any) => void,
    setToast: (toast: any) => void
) => {
    const { t } = useTranslation();
    const { hasPermission, requestPermission } = useGalleryPermission();

    // Change profile image
    const handleProfileImageUpload = async () => {
        try {
            if (hasPermission === false) {
                Alert.alert(
                    t("employeeProfile.errors.permissionDeniedTitle", "Adgang nægtet"),
                    t("employeeProfile.errors.permissionDeniedMessage", "Du skal give adgang til billeder for at kunne uploade et profilbillede."),
                    [
                        { text: t("common.cancel", "Annuller"), style: "cancel" },
                        {
                            text: t("common.goToSettings", "Gå til indstillinger"),
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
                        message: t("employeeProfile.errors.permissionDenied"),
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

            setToast({ type: "loading", message: t("settings.toastStates.uploading") });

            await uploadEmployeeProfileImage(file);
            const updated = await getEmployeeProfile();
            setEmployee(updated);

            setToast({ type: "success", message: t("settings.toastStates.uploadSuccess") });
        } catch (err) {
            console.error("Upload error:", err);
            setToast({
                type: "error",
                message: t("settings.toastStates.errorUploadingImage"),
            });
        } finally {
            setTimeout(() => setToast({ type: null, message: "" }), 2000);
        }
    };

    // Reset profile image
    const handleResetProfileImage = () => {
        Alert.alert(
            t("settings.preferences.resetConfirmTitle"),
            t("settings.preferences.resetConfirmMessage"),
            [
                { text: t("common.cancel"), style: "cancel" },
                {
                    text: t("common.confirm"),
                    style: "destructive",
                    onPress: async () => {
                        try {
                            setToast({ type: "loading", message: t("settings.toastStates.deletingImage") });
                            await deleteEmployeeProfileImage();
                            const updated = await getEmployeeProfile();
                            setEmployee(updated);
                            setToast({ type: "success", message: t("settings.toastStates.imageDeletedSuccess") });
                        } catch (err) {
                            console.error("Delete error:", err);
                            setToast({
                                type: "error",
                                message: t("settings.toastStates.errorDeletingImage"),
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
