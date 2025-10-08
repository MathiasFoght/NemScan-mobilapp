import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    toastContainer: {
        position: 'absolute',
        top: 60,
        left: 20,
        right: 20,
        borderLeftWidth: 4,
        borderRadius: 8,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
        zIndex: 1000,
    },
    toastContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    toastMessage: {
        fontSize: 14,
        fontWeight: '600',
        flex: 1,
    },
});