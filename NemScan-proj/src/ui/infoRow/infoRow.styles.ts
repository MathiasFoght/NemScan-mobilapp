import { StyleSheet } from "react-native";
import {colors} from "@/src/shared/global/colors";

export default StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomColor: '#E5E7EB',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    rowNoBorder: {
        borderBottomWidth: 0,
    },
    rowLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    iconContainer: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#E8EBFA',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    label: {
        fontSize: 15,
        color: colors.inactive,
        flex: 1,
    },
    value: {
        fontSize: 15,
        color: colors.primary,
        fontWeight: '600',
    },
});