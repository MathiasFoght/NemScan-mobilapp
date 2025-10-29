import { Tabs, useSegments } from "expo-router";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/src/shared/global/colors";
import '@/i18n/i18n.config';
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { StatusBar } from "react-native";

export default function TabLayout() {
    const { t } = useTranslation(["navbar"]);
    const segments = useSegments();

    useEffect(() => {
        const currentTab = segments[segments.length - 1];

        if (currentTab === "scannerScreen" || currentTab === "statisticsScreen" || currentTab === "settingsScreen") {
            StatusBar.setBarStyle("dark-content");
        } else {
            StatusBar.setBarStyle("light-content");
        }
    }, [segments]);

    return (
        <Tabs
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.inactive,
                animation: 'none',
                gestureEnabled: false,
                tabBarIcon: ({ color, size }) => {
                    if (route.name === "index") {
                        return <MaterialIcons name="home" size={size} color={color} />;
                    } else if (route.name === "scannerScreen") {
                        return <AntDesign name="scan" size={size} color={color} />;
                    } else if (route.name === "statisticsScreen") {
                        return <MaterialIcons name="query-stats" size={size} color={color} />;
                    } else if (route.name === "settingsScreen") {
                        return <MaterialIcons name="settings" size={size} color={color} />;
                    }
                    return null;
                },
            })}
        >
            <Tabs.Screen name="index" options={{ title: t('navbar:tabs.index') }} />
            <Tabs.Screen name="scannerScreen" options={{ title: t('navbar:tabs.scannerScreen') }} />
            <Tabs.Screen name="statisticsScreen" options={{ title: t('navbar:tabs.statisticsScreen') }} />
            <Tabs.Screen name="settingsScreen" options={{ title: t('navbar:tabs.settingsScreen') }} />
        </Tabs>
    );
}