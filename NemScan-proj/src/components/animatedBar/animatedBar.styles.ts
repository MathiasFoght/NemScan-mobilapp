import {StyleSheet} from "react-native";
import {colors} from "@/src/shared/global/colors";

export default StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    label: {
        alignSelf: 'flex-end',
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 6,
        color: colors.primary,
    },
    barBackground: {
        backgroundColor: '#F2F2F7',
        borderRadius: 6,
        overflow: 'hidden',
    },
    barFill: {
        borderRadius: 6,
    },
});
