import React from "react";
import {CameraPermissionProps} from "@/src/permissions/interfaces";
import {View, Text} from "react-native";
import styles from "./cameraPermission.styles"
import {MaterialIcons} from "@expo/vector-icons";
import {colors} from "@/src/shared/global/colors";
import Button from "@/src/ui/button/button";

export default function CameraPermissionScreen({ onRequestPermission, onSkip }: CameraPermissionProps) {
    const onSkipPress = () => {
        console.log("User skipped camera permission");
        onSkip();
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.iconCircle}>
                    <MaterialIcons name="camera-alt" size={40} color={colors.primary} />
                </View>
                <Text style={styles.title}>Kamera adgang</Text>
                <Text style={styles.text}>
                    For at scanne varer har vi brug for adgang til dit kamera
                </Text>
            </View>

            <View style={styles.footer}>
                <View style={styles.skipContainer}>
                    <Button
                        onPress={onSkipPress}
                        title={'Skip'}
                        variant="simple"
                        textStyle={styles.skipText}
                    />
                </View>

                <Button
                    title="Tillad"
                    onPress={onRequestPermission}
                    variant={"primary"}
                />
            </View>
        </View>
    );
}