import {StyleSheet} from "react-native";
import {colors} from "@/src/shared/global/colors";

export default StyleSheet.create({
    container: { marginBottom: 16, paddingHorizontal: 16 },
    title: { fontSize: 18, fontWeight: '700', marginBottom: 4 },
    subtitle: { fontSize: 13, color: '#8E8E93', marginBottom: 12 },
    card: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 12,
        width: 160,
        marginRight: 12,
        elevation: 2,
    },
    rank: { fontWeight: '700', color: colors.attention },
    name: { fontSize: 15, fontWeight: '600', marginVertical: 4 },
    rate: { fontSize: 18, fontWeight: '700', color: colors.attention },
    trend: { fontSize: 13, color: '#8E8E93' },
    emptyText: { color: '#8E8E93', marginTop: 8 },
});
