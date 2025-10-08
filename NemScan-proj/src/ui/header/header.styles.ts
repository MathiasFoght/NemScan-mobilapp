import { StyleSheet } from "react-native";
import {colors} from "@/src/shared/global/colors";

export default StyleSheet.create({
    header: {
        backgroundColor: colors.primary,
        paddingTop: 60,
        paddingBottom: 24,
        paddingHorizontal: 20,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoSection: {
        flex: 1,
        marginLeft: 16,
    },
    name: {
        fontSize: 20,
        fontWeight: '600',
        color: colors.white,
        marginBottom: 3,
        letterSpacing: -0.3,
    },
    position: {
        fontSize: 14,
        color: colors.secondary,
        marginBottom: 6,
        fontWeight: '500',
    },
    detailsRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    detail: {
        fontSize: 13,
        color: 'rgba(255, 255, 255, 0.7)',
        fontWeight: '400',
    },
    separator: {
        fontSize: 13,
        color: 'rgba(255, 255, 255, 0.7)',
        marginHorizontal: 8,
    },
});