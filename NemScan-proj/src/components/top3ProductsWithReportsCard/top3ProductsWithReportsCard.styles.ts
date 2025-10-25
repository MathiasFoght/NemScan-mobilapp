import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    card: {
        flex: 1,
        borderRadius: 20,
        overflow: 'hidden',
        marginHorizontal: 4,
    },
    gradient: {
        flex: 1,
        borderRadius: 20,
        padding: 16,
        justifyContent: 'space-between',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    iconWrapper: {
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        padding: 6,
        borderRadius: 10,
        marginRight: 10,
    },
    title: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
        flexShrink: 1,
        lineHeight: 18,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 8,
    },
    name: {
        flex: 1,
        color: '#fff',
        fontSize: 13,
    },
    rate: {
        color: '#fff',
        fontWeight: '600',
    },
});
