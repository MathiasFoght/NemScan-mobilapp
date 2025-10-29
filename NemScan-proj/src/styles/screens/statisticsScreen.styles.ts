import {StyleSheet} from "react-native";

export default StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#F2F2F7',
    },
    scroll: {
        flex: 1,
    },
    headerContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        backgroundColor: '#FFFFFF',
        borderBottomColor: '#E5E5EA',
        borderBottomWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 4,
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: 20,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: '#1C1C1E',
        marginBottom: 4,
    },
    headerSubtitle: {
        fontSize: 15,
        color: '#8E8E93',
    },
    contentContainer: {
        paddingBottom: 32,
    },
});