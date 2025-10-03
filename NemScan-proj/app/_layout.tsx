import { Stack } from "expo-router";
import { AuthProvider } from "@/src/contexts/authContext";

export default function RootLayout() {
    return (
        <AuthProvider>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="loginScreen" />
                <Stack.Screen name="(tabs)" />
            </Stack>
        </AuthProvider>
    );
}
