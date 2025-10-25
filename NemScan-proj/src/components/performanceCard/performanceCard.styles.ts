import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
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
    value: {
        color: '#fff',
        fontSize: 28,
        fontWeight: '700',
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    subtitle: {
        color: '#fff',
        fontSize: 12,
    },
    trend: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    trendText: {
        fontSize: 12,
        fontWeight: '600',
        marginLeft: 4,
    },
    trendContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        paddingVertical: 4,
        paddingHorizontal: 8,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
    },
});

export default styles;
