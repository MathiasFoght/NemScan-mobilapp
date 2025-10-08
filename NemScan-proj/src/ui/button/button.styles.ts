import { StyleSheet } from "react-native";
import { colors } from "@/src/shared/global/colors";

export default StyleSheet.create({
    button: {
        backgroundColor: colors.primary,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 16,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    simpleButton: {
        backgroundColor: "transparent",
        paddingVertical: 0,
        paddingHorizontal: 0,
        elevation: 0,
        shadowOpacity: 0,
        flexDirection: "row",
        alignItems: "center",
    },
    outlineButton: {
        backgroundColor: colors.white,
        borderWidth: 1.5,
        borderColor: colors.primary,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 16,
    },
    buttonDisabled: {
        backgroundColor: "#D0D0D0",
        shadowOpacity: 0,
        elevation: 0,
    },
    outlineButtonDisabled: {
        borderColor: "#D0D0D0",
    },
    buttonText: {
        color: colors.white,
        fontSize: 17,
        fontWeight: "600",
    },
    simpleButtonText: {
        color: "#000",
        fontSize: 17,
    },
    outlineButtonText: {
        color: colors.primary,
        fontSize: 16,
        fontWeight: "600",
    },
    iconLeft: {
        marginRight: 8,
    },
    iconRight: {
        marginLeft: 8,
    },
    iconLeftSimple: {
        marginRight: 0,
    },
    iconRightSimple: {
        marginLeft: 4,
    },
});