import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/src/shared/global/colors";

export default function TabLayout() {
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
            <Tabs.Screen name="index" options={{ title: "Hjem" }} />
            <Tabs.Screen name="statisticsScreen" options={{ title: "Statistik" }} />
            <Tabs.Screen name="graphicsScreen" options={{ title: "Indsigt" }} />
            <Tabs.Screen name="settingsScreen" options={{ title: "Indstillinger" }} />
        </Tabs>
    );
}
