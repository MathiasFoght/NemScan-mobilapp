import { StyleSheet } from "react-native";
import {colors} from "@/src/shared/global/colors";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
    },
    headerBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 16,
        backgroundColor: colors.white,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.primary,
    },
    placeholder: {
        width: 40,
    },
    productList: {
        flex: 1,
    },
    productListContent: {
        padding: 20,
        paddingTop: 8,
    },
    productItemSkeleton: {
        flexDirection: 'row',
        alignItems: 'center',
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
    skeletonImage: {
        width: 50,
        height: 50,
        borderRadius: 8,
        marginRight: 12,
        backgroundColor: '#E5E7EB',
    },
    skeletonTextContainer: {
        flex: 1,
    },
    skeletonText: {
        height: 16,
        backgroundColor: '#E5E7EB',
        borderRadius: 4,
        marginBottom: 8,
    },
    skeletonTextShort: {
        height: 14,
        width: '60%',
        backgroundColor: '#F3F4F6',
        borderRadius: 4,
    },
});