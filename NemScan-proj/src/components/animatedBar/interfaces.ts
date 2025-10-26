import {TextStyle, ViewStyle} from "react-native";

export interface AnimatedBarProps {
    percentage: number;
    color: string;
    height?: number;
    duration?: number;
    containerStyle?: ViewStyle;
    labelStyle?: TextStyle;
}