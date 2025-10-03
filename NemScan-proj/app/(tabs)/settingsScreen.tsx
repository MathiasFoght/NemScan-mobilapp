import { Text, View, Pressable, StyleSheet } from "react-native";
import { useAuth } from "@/src/contexts/authContext";

export default function SettingsScreen() {
    const { logout } = useAuth();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Settings</Text>
            <Pressable
                style={styles.button}
                onPress={logout}
            >
                <Text style={styles.buttonText}>Test log ud</Text>
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