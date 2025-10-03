import { StyleSheet } from "react-native";
import { colors } from "@/src/shared/global/colors";

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "flex-end",
        backgroundColor: colors.white,
        paddingBottom: 60,
    },
    loginBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.white,
        paddingVertical: 14,
        borderRadius: 12,
        gap: 10,
        borderWidth: 1.5,
        borderColor: colors.primary,
    },
    loginText: {
        color: colors.primary,
        fontWeight: "600",
        fontSize: 16,
    },
});
