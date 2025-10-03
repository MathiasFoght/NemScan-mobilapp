import { View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect } from "react";
import { useAuth } from "@/src/contexts/authContext";
import { colors } from "@/src/shared/global/colors";
import styles from "@/src/styles/scanScreen.styles";
import Button from "@/src/ui/button/button";

export default function Index() {
    const { userType } = useAuth();

    useEffect(() => {
        if (userType === 'employee') router.replace("/(tabs)");
    }, [userType]);

    return (
        <View style={styles.container}>
            <Button
                title="Medarbejder Login"
                onPress={() => router.push("/loginScreen")}
                variant="outline"
                icon={
                    <MaterialIcons
                        name="arrow-forward-ios"
                        size={20}
                        color={colors.primary}
                    />
                }
                iconPosition="right"
            />
        </View>
    );
}