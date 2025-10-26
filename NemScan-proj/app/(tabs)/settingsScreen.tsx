import { Text, View, Pressable, ScrollView, Switch } from "react-native";
import { useAuth } from "@/src/contexts/authContext";
import "@/i18n/i18n.config";
import i18n from "i18next";
import Button from "@/src/ui/button/button";
import { Avatar } from "@/src/ui/avatar/avatar";
import { colors } from "@/src/shared/global/colors";
import {useCallback, useEffect, useState} from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { getEmployeeProfile } from "@/src/services/employee/employeeService";
import { Toast } from "@/src/components/toast/toast";
import { router, useFocusEffect } from "expo-router";
import styles from "@/src/styles/screens/settingsScreen.styles";
import { useTranslation } from "react-i18next";
import { useProfileImageActions } from "@/src/hooks/useProfileImageActions";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SettingsScreen() {
    const { logout } = useAuth();
    const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
    const [employee, setEmployee] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { t } = useTranslation();
    const [toast, setToast] = useState<{ type: 'success' | 'error' | 'loading' | 'info' | null; message?: string }>({
        type: null,
        message: "",
    });
    const [scannerSoundEnabled, setScannerSoundEnabled] = useState(true);
    const { handleProfileImageUpload, handleResetProfileImage } = useProfileImageActions(setEmployee, setToast);

    useEffect(() => {
        (async () => {
            const storedValue = await AsyncStorage.getItem("scannerSoundEnabled");
            if (storedValue !== null) setScannerSoundEnabled(storedValue === "true");
        })();
    }, []);

    useFocusEffect(
        useCallback(() => {
            const fetchProfile = async () => {
                try {
                    const profile = await getEmployeeProfile();
                    setEmployee(profile);
                    setError(null);
                } catch (err: any) {
                    setError(t("toastErrors.errorFetching"));
                } finally {
                    setLoading(false);
                }
            };
            fetchProfile();
        }, [t])
    );

    const toggleScannerSound = async (value: boolean) => {
        setScannerSoundEnabled(value);
        await AsyncStorage.setItem("scannerSoundEnabled", value.toString());
    };

    const toggleLanguage = (value: boolean) => {
        const newLang = value ? "da" : "en";
        i18n.changeLanguage(newLang);
        setCurrentLanguage(newLang);
    };

    const navigateToProfile = () => {
        router.push("/myProfileScreen");
    };

    return (
        <View style={styles.container}>
            <Toast type="loading" message={t("common.loading")} visible={loading} />
            <Toast type="error" message={error || ""} visible={!!error} />
            {toast.type && <Toast type={toast.type} message={toast.message || ""} visible={!!toast.type} />}

            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <Avatar
                        name={employee?.name || t("employeeProfile.fallbacks.name")}
                        imageUrl={employee?.profileImageUrl ?? undefined}
                    />
                    <View style={styles.headerTextContainer}>
                        <Text style={styles.userName}>
                            {employee?.name || t("employeeProfile.fallbacks.name")}
                        </Text>
                    </View>
                </View>
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{t("settings.account.title")}</Text>

                    <Pressable style={styles.settingsItem} onPress={navigateToProfile}>
                        <View style={styles.settingsItemLeft}>
                            <View style={styles.iconContainer}>
                                <MaterialIcons name="person" size={22} color={colors.primary} />
                            </View>
                            <View>
                                <Text style={styles.settingsItemTitle}>{t("settings.account.profileTitle")}</Text>
                                <Text style={styles.settingsItemSubtitle}>{t("settings.account.profileSubtitle")}</Text>
                            </View>
                        </View>
                        <MaterialIcons name="chevron-right" size={24} color={colors.inactive} />
                    </Pressable>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{t("settings.preferences.title")}</Text>

                    <View style={styles.settingsItem}>
                        <View style={styles.settingsItemLeft}>
                            <View style={styles.iconContainer}>
                                <MaterialIcons name="language" size={22} color={colors.primary} />
                            </View>
                            <View>
                                <Text style={styles.settingsItemTitle}>{t("settings.preferences.languageTitle")}</Text>
                                <Text style={styles.settingsItemSubtitle}>
                                    {currentLanguage === "da"
                                        ? t("settings.preferences.languageSubtitleDa")
                                        : t("settings.preferences.languageSubtitleEn")}
                                </Text>
                            </View>
                        </View>
                        <Switch
                            value={currentLanguage === "da"}
                            onValueChange={toggleLanguage}
                            trackColor={{ false: "#D1D5DB", true: colors.secondary }}
                            thumbColor={colors.white}
                            ios_backgroundColor="#D1D5DB"
                        />
                    </View>
                    <View style={styles.settingsItem}>
                        <View style={styles.settingsItemLeft}>
                            <View style={styles.iconContainer}>
                                <MaterialIcons name="volume-up" size={22} color={colors.primary} />
                            </View>
                            <View>
                                <Text style={styles.settingsItemTitle}>Lyd</Text>
                                <Text style={styles.settingsItemSubtitle}>
                                    Lyd ved scanning
                                </Text>
                            </View>
                        </View>
                        <Switch
                            value={scannerSoundEnabled}
                            onValueChange={toggleScannerSound}
                            trackColor={{ false: "#D1D5DB", true: colors.secondary }}
                            thumbColor={colors.white}
                            ios_backgroundColor="#D1D5DB"
                        />
                    </View>
                    <View style={styles.settingsItem}>
                        <View style={styles.settingsItemLeft}>
                            <View style={styles.iconContainer}>
                                <MaterialIcons name="face" size={22} color={colors.primary} />
                            </View>
                            <View>
                                <Text style={styles.settingsItemTitle}>
                                    {t("settings.preferences.changeProfileImageTitle")}
                                </Text>
                                <Text style={styles.settingsItemSubtitle}>
                                    {t("settings.preferences.changeProfileImageSubtitle")}
                                </Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                            <Pressable onPress={handleProfileImageUpload} style={{ padding: 6 }}>
                                <MaterialIcons name="file-upload" size={22} color={colors.primary} />
                            </Pressable>

                            <Pressable
                                onPress={handleResetProfileImage}
                                disabled={!employee?.profileImageUrl}
                                style={{
                                    padding: 6,
                                    opacity: employee?.profileImageUrl ? 1 : 0.3,
                                }}
                            >
                                <MaterialIcons
                                    name="delete-forever"
                                    size={22}
                                    color={
                                        employee?.profileImageUrl ? colors.important : colors.inactive
                                    }
                                />
                            </Pressable>
                        </View>
                    </View>
                </View>
                <View style={styles.spacer} />
            </ScrollView>

            <View style={styles.logoutContainer}>
                <Button
                    title={t("settings.logout.button")}
                    onPress={logout}
                    variant="outline"
                    style={styles.logoutButton}
                    textStyle={styles.logoutText}
                />
            </View>
        </View>
    );
}
