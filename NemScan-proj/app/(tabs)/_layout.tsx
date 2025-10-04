import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/src/shared/global/colors";
import '@/i18n/i18n.config';
import { useTranslation } from "react-i18next";

export default function TabLayout() {
    const { t } = useTranslation();

    return (
        <Tabs
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.inactive,
                tabBarIcon: ({ color, size }) => {
                    if (route.name === "index") {
                        return <MaterialIcons name="home" size={size} color={color} />;
                    } else if (route.name === "statisticsScreen") {
                        return <MaterialIcons name="query-stats" size={size} color={color} />;
                    } else if (route.name === "graphicsScreen") {
                        return <MaterialIcons name="bar-chart" size={size} color={color} />;
                    } else if (route.name === "settingsScreen") {
                        return <MaterialIcons name="settings" size={size} color={color} />;
                    }
                    return null;
                },
            })}
        >
            <Tabs.Screen name="index" options={{ title: t('tabs.homeScreen') }} />
            <Tabs.Screen name="statisticsScreen" options={{ title: t('tabs.statisticsScreen') }} />
            <Tabs.Screen name="graphicsScreen" options={{ title: t('tabs.graphicsScreen') }} />
            <Tabs.Screen name="settingsScreen" options={{ title: t('tabs.settingsScreen') }} />
        </Tabs>
    );
}
