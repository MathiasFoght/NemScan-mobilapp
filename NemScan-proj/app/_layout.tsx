import { Stack } from "expo-router";
import { AuthProvider } from "@/src/contexts/authContext";
import { ProductProvider } from "@/src/contexts/productContext";
import {StatusBar} from "react-native";

export default function RootLayout() {
    return (
        <AuthProvider>
            <ProductProvider>
                <StatusBar />
                <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="index" />
                    <Stack.Screen name="loginScreen" options={{ animation: "slide_from_right" }} />
                    <Stack.Screen name="(tabs)" options={{ animation: "none", gestureEnabled: false }} />
                </Stack>
            </ProductProvider>
        </AuthProvider>
    );
}
