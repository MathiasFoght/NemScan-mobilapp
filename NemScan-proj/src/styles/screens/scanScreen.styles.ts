import { StyleSheet } from "react-native";
import { colors } from "@/src/shared/global/colors";

export default StyleSheet.create({
    footer: {
        paddingBottom: 40,
        alignItems: 'center',
    },
    employeeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
        gap: 6,
    },
    employeeText: {
        fontSize: 13,
        color: colors.primary,
    },
});
