import {StyleSheet} from "react-native";

export default StyleSheet.create({
    row: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 8 },
    label: { flex: 1.6, fontSize: 13, color: '#374151' },
    barWrapper: { flex: 2, height: 8, backgroundColor: '#E5E7EB', borderRadius: 8, overflow: 'hidden' },
    bar: { height: '100%', borderRadius: 8 },
    percent: { width: 40, textAlign: 'right', fontSize: 12, fontWeight: '600' },
});