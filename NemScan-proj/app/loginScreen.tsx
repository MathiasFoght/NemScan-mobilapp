import {
    View,
    Text,
    TextInput,
    Alert,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { useAuth } from "@/src/contexts/authContext";
import { colors } from "@/src/shared/global/colors";
import styles from "@/src/styles/loginScreen.styles";
import Button from "@/src/ui/button/button";
import Logo from "@/src/ui/logo/logo";
import '@/i18n/i18n.config';
import { useTranslation } from "react-i18next";

export default function LoginScreen() {
    const { login } = useAuth();
    const [employeeNumber, setEmployeeNumber] = useState("");
    const [loading, setLoading] = useState(false);
    const {t} = useTranslation();

    const handleLogin = async () => {
        try {
            setLoading(true);
            await login(employeeNumber);
            router.replace("/(tabs)");
        } catch (e: any) {
            Alert.alert(t('errors.loginAlertTitle'), t('errors.loginAlertMessage'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: colors.white }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Button
                            title={t('common.back')}
                            onPress={() => router.back()}
                            icon={<MaterialIcons name="arrow-back-ios-new" size={24} color="#000" />}
                            variant="simple"
                            iconPosition="left"
                        />
                    </View>

                    <View style={styles.logoSection}>
                        <Logo />
                        <Text style={styles.appName}>{t('common.appName')}</Text>
                        <Text style={styles.subtitle}>{t('login.subtitle')}</Text>
                    </View>

                    <View style={styles.inputSection}>
                        <View style={styles.inputWrapper}>
                            <MaterialIcons
                                name="person-outline"
                                size={20}
                                color={colors.inactive}
                                style={styles.inputIcon}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder={t('login.employeeNumberPlaceholder')}
                                placeholderTextColor={colors.inactive}
                                value={employeeNumber}
                                onChangeText={setEmployeeNumber}
                                keyboardType="number-pad"
                            />
                        </View>

                        <Button
                            title={t('login.button')}
                            onPress={handleLogin}
                            loading={loading}
                            disabled={!employeeNumber.trim() || loading}
                            icon={<MaterialIcons name="arrow-forward-ios" size={20} color={colors.white} />}
                            iconPosition="right"
                            style={{ marginBottom: 48 }}
                        />

                        <View style={styles.helpWrapper}>
                            <View style={styles.helpSection}>
                                <MaterialIcons
                                    name="info-outline"
                                    size={20}
                                    color={colors.primary}
                                />
                                <Text style={styles.helpTitle}>{t('loginHelper.title')}</Text>
                            </View>
                            <Text style={styles.helpText}>
                                {t('loginHelper.content')}
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
