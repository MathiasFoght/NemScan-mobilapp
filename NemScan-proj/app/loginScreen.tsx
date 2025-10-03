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

export default function LoginScreen() {
    const { login } = useAuth();
    const [employeeNumber, setEmployeeNumber] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!employeeNumber.trim()) {
            Alert.alert("Fejl", "Indtast venligst dit medarbejdernummer");
            return;
        }

        try {
            setLoading(true);
            await login(employeeNumber);
            router.replace("/(tabs)");
        } catch (e: any) {
            Alert.alert("Der skete en fejl", "Medarbejdernummer ikke genkendt.");
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
                            title="Tilbage"
                            onPress={() => router.back()}
                            icon={<MaterialIcons name="arrow-back-ios-new" size={24} color="#000" />}
                            variant="simple"
                            iconPosition="left"
                        />
                    </View>

                    <View style={styles.logoSection}>
                        <Logo />
                        <Text style={styles.appName}>NemScan</Text>
                        <Text style={styles.subtitle}>Medarbejder Login</Text>
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
                                placeholder="Medarbejdernummer"
                                placeholderTextColor={colors.inactive}
                                value={employeeNumber}
                                onChangeText={setEmployeeNumber}
                                keyboardType="number-pad"
                            />
                        </View>

                        <Button
                            title="Log ind"
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
                                <Text style={styles.helpTitle}>Hjælp til login</Text>
                            </View>
                            <Text style={styles.helpText}>
                                Brug dit 3-cifrede medarbejdernummer, som du har modtaget fra din leder.
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
