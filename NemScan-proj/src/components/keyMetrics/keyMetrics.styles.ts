import {StyleSheet} from "react-native";

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 12,
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        flex: 1,
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
        minHeight: 110,
    },
    label: {
        fontSize: 12,
        color: '#8E8E93',
        marginBottom: 8,
        fontWeight: '500',
    },
    value: {
        fontSize: 32,
        fontWeight: '700',
        color: '#1C1C1E',
    },
    productName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1C1C1E',
        marginBottom: 4,
    },
    scanCount: {
        fontSize: 14,
        color: '#8E8E93',
    },
    noDataText: {
        fontSize: 15,
        color: '#8E8E93',
        fontWeight: '500',
        marginTop: 8,
    },
    errorText: {
        color: '#8E8E93',
        fontSize: 15,
        textAlign: 'center',
    },
});