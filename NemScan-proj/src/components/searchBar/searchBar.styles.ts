import { StyleSheet } from 'react-native';
import { colors } from '@/src/shared/global/colors';

export default StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        marginHorizontal: 20,
        marginTop: 16,
        marginBottom: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 12,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    searchIcon: {
        marginRight: 12,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: colors.primary,
    },
    clearButton: {
        width: 32,
        height: 32,
        marginLeft: 8,
    },
});