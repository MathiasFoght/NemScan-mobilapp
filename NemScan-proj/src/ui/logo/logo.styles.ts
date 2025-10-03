import { StyleSheet } from "react-native";
import { colors } from "@/src/shared/global/colors";

export default StyleSheet.create({
    logoContainer: {
        width: 100,
        height: 100,
        backgroundColor: colors.primary,
        borderRadius: 22,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 24,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
});