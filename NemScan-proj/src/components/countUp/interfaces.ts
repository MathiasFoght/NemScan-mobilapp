import {StyleProp, TextStyle} from "react-native";

export interface CountUpProps {
    value: number;
    duration?: number;
    delay?: number;
    decimals?: number;
    suffix?: string;
    style?: StyleProp<TextStyle>;}