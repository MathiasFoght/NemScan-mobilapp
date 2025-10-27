import { StyleSheet } from 'react-native';
import { colors } from '@/src/shared/global/colors';

export default StyleSheet.create({
    productItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.white,
        padding: 16,
        borderRadius: 12,
        marginBottom: 8,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    productItemSelected: {
        backgroundColor: colors.primary,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    productImage: {
        width: 50,
        height: 50,
        borderRadius: 8,
        marginRight: 12,
    },
    productImagePlaceholder: {
        width: 50,
        height: 50,
        borderRadius: 8,
        marginRight: 12,
        backgroundColor: '#F5F7FA',
        alignItems: 'center',
        justifyContent: 'center',
    },
    productName: {
        fontSize: 16,
        fontWeight: '500',
        color: colors.primary,
        flex: 1,
    },
    productNameSelected: {
        color: colors.white,
        fontWeight: '600',
    },
});