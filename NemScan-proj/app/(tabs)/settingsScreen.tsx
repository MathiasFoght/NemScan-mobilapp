import { Text, View, Pressable, StyleSheet } from "react-native";
import { useAuth } from "@/src/contexts/authContext";
import '@/i18n/i18n.config';
import i18n from "i18next";

export default function SettingsScreen() {
    const { logout } = useAuth();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'da' ? 'en' : 'da';
        console.log('Changing language to:', newLang);
        i18n.changeLanguage(newLang);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Settings</Text>
            <Pressable
                style={styles.button}
                onPress={logout}
            >
                <Text style={styles.buttonText}>Test log ud</Text>
            </Pressable>

            <Pressable
                style={[styles.button, { marginTop: 20 }]}
                onPress={toggleLanguage}
            >
                <Text style={styles.buttonText}>Test skift sprog</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    title: {
        fontSize: 18,
        marginBottom: 20,
    },
    button: {
        backgroundColor: "grey",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    buttonText: {
        color: "white",
    },
});