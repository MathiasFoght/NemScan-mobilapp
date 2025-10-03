import { StyleSheet } from "react-native";
import { colors } from "@/src/shared/global/colors";

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.white,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: 300,
        paddingHorizontal: 32,
    },
    iconCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: `${colors.primary}15`,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: '#1a1a1a',
        marginBottom: 12,
        letterSpacing: -0.5,
    },
    text: {
        fontSize: 15,
        color: '#666',
        textAlign: 'center',
        lineHeight: 22,
    },
    footer: {
        width: '100%',
        gap: 16,
        paddingBottom: 20,
        paddingHorizontal: 20,
    },
    skipContainer: {
        alignItems: 'center',
    },
    skipText: {
        fontSize: 15,
        color: '#999',
    },
});