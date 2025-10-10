import { StyleSheet } from "react-native";
import {colors} from "@/src/shared/global/colors";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F7FA",
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 100,
    },
    header: {
        paddingTop: 60,
        paddingBottom: 24,
        paddingHorizontal: 20,
        backgroundColor: colors.white,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    headerContent: {
        flexDirection: "row",
        alignItems: "center",
    },
    headerTextContainer: {
        marginLeft: 16,
        flex: 1,
    },
    userName: {
        fontSize: 20,
        fontWeight: "700",
        color: colors.primary,
        marginBottom: 4,
    },
    userEmail: {
        fontSize: 14,
        color: colors.inactive,
    },
    section: {
        marginTop: 24,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: "600",
        color: colors.inactive,
        marginBottom: 12,
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },
    settingsItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: colors.white,
        padding: 16,
        borderRadius: 12,
        marginBottom: 8,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    settingsItemLeft: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#E8EBFA",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },
    settingsItemTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: colors.primary,
        marginBottom: 2,
    },
    settingsItemSubtitle: {
        fontSize: 14,
        color: colors.inactive,
    },
    spacer: {
        flex: 1,
        minHeight: 40,
    },
    logoutContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        backgroundColor: "#f5f7fa",
    },
    logoutButton: {
        width: "100%",
        borderColor: colors.important,
    },
    logoutText: {
        color: colors.important,
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center'
    },
});