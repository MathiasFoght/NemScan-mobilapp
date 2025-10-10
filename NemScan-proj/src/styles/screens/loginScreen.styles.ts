import { StyleSheet } from "react-native";
import { colors } from "@/src/shared/global/colors";

export default StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.white },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
    },
    closeBtn: { flexDirection: "row", alignItems: "center" },
    headerText: { fontSize: 17, color: colors.black, marginLeft: 6 },
    appName: { fontSize: 28, fontWeight: "700", color: colors.black, marginBottom: 8 },
    subtitle: { fontSize: 16, color: colors.inactive },
    inputSection: { paddingHorizontal: 20 },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F5F5F5",
        borderRadius: 12,
        paddingHorizontal: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#E8E8E8",
    },
    logoSection: {
        alignItems: "center",
        paddingTop: 40, paddingBottom: 60
    },
    logoContainer: {
        alignItems: "center",
        paddingTop: 40, paddingBottom: 60
    },
    inputIcon: { marginRight: 12 },
    input: { flex: 1, paddingVertical: 16, fontSize: 16, color: colors.black },
    loginBtn: {
        backgroundColor: colors.primary,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: "center",
        marginBottom: 48,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    loginBtnDisabled: {
        backgroundColor: "#D0D0D0",
        shadowOpacity: 0,
        elevation: 0,
    },
    loginText: { color: colors.white, fontSize: 17, fontWeight: "600" },
    helpWrapper: {
        borderTopWidth: 1,
        borderTopColor: "#E8E8E8",
        paddingTop: 24,
    },
    helpSection: { flexDirection: "row", alignItems: "center", marginBottom: 12, gap: 8 },
    helpTitle: { fontSize: 16, fontWeight: "600", color: colors.primary },
    helpText: { fontSize: 14, color: colors.inactive, lineHeight: 20 },
});