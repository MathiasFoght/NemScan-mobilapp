import {View, Text} from "react-native";
import { router } from "expo-router";
import { useEffect } from "react";
import { useAuth } from "@/src/contexts/authContext";
import CameraPermissionWrapper from "@/src/permissions/CameraPermissionWrapper";
import {MaterialIcons} from "@expo/vector-icons";
import Button from "@/src/ui/button/button";
import styles from "@/src/styles/scanScreen.styles"
import {colors} from "@/src/shared/global/colors";
import '@/i18n/i18n.config';
import { useTranslation} from "react-i18next";

export default function Index() {
    const { t } = useTranslation();
    const { userType } = useAuth();

    useEffect(() => {
        if (userType === "employee") router.replace("/(tabs)");
    }, [userType]);

    const handleEmployeeLogin = () => {
        router.push("/loginScreen");
    }

    return (

        <CameraPermissionWrapper>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>Scan Screen</Text>
            </View>

            <View style={styles.footer}>
                <Button
                    onPress={handleEmployeeLogin}
                    title={t('login.employeeLogin')}
                    variant="simple"
                    icon={<MaterialIcons name="person-outline" size={16} color={colors.primary} />}
                    iconPosition="left"
                    textStyle={styles.employeeText}
                    style={styles.employeeButton}
                />
            </View>
        </CameraPermissionWrapper>
    );
}
