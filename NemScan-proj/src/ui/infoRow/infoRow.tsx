import {MaterialIcons} from "@expo/vector-icons";
import {Text, View} from "react-native";
import styles from "./infoRow.styles";
import {colors} from "@/src/shared/global/colors";
import React from "react";

export const InfoRow = ({
     icon,
     label,
     value,
     hideBorder = false
 }: {
    icon: keyof typeof MaterialIcons.glyphMap;
    label: string;
    value: string;
    hideBorder?: boolean;
}) => (
    <View style={[styles.row, hideBorder && styles.rowNoBorder]}>
        <View style={styles.rowLeft}>
            <View style={styles.iconContainer}>
                <MaterialIcons name={icon} size={18} color={colors.primary} />
            </View>
            <Text style={styles.label}>{label}</Text>
        </View>
        <Text style={styles.value}>{value}</Text>
    </View>
);