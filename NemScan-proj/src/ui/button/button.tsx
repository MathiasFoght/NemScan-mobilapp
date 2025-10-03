import React from "react";
import {
    Pressable,
    Text,
    ActivityIndicator,
    View,
} from "react-native";
import styles from "./button.styles";
import {colors} from "@/src/shared/global/colors";
import { ButtonProps} from "./interfaces"

export default function Button({
   onPress,
   title,
   loading = false,
   disabled = false,
   icon,
   iconPosition = "right",
   style,
   textStyle,
   variant = "primary",
}: ButtonProps) {
    const getButtonStyle = () => {
        switch (variant) {
            case "back":
                return [styles.backButton, style];
            case "outline":
                return [
                    styles.outlineButton,
                    (disabled || loading) && styles.outlineButtonDisabled,
                    style,
                ];
            default:
                return [
                    styles.button,
                    (disabled || loading) && styles.buttonDisabled,
                    style,
                ];
        }
    };

    const getTextStyle = () => {
        switch (variant) {
            case "back":
                return [styles.backButtonText, textStyle];
            case "outline":
                return [styles.outlineButtonText, textStyle];
            default:
                return [styles.buttonText, textStyle];
        }
    };

    return (
        <Pressable
            style={getButtonStyle()}
            onPress={onPress}
            disabled={disabled || loading}
            hitSlop={8}
        >
            {loading ? (
                <ActivityIndicator color={variant === "outline" ? colors.primary : colors.white} />
            ) : (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {icon && iconPosition === "left" && (
                        <View
                            style={[
                                variant === "back"
                                    ? styles.iconLeftBack
                                    : styles.iconLeft,
                            ]}
                        >
                            {icon}
                        </View>
                    )}
                    <Text style={getTextStyle()}>{title}</Text>
                    {icon && iconPosition === "right" && (
                        <View
                            style={[
                                variant === "back"
                                    ? styles.iconRightBack
                                    : styles.iconRight,
                            ]}
                        >
                            {icon}
                        </View>
                    )}
                </View>
            )}
        </Pressable>
    );
}

