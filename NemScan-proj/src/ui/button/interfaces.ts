import React, {type ComponentProps} from "react";
import {MaterialIcons} from "@expo/vector-icons";
import {StyleProp, TextStyle, ViewStyle} from "react-native";

type ButtonVariant = "primary" | "simple" | "outline";

type IconPosition = "left" | "right";

export interface ButtonProps {
    onPress: () => void;
    title?: string;
    loading?: boolean;
    disabled?: boolean;
    icon?: React.ReactElement<ComponentProps<typeof MaterialIcons>>;
    iconPosition?: IconPosition;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    variant?: ButtonVariant;
};