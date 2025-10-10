import { StyleSheet } from "react-native";

export default StyleSheet.create({
    profileImage: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#f0f0f0',
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    initialsContainer: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: 'rgba(119, 142, 248, 0.2)',
        borderWidth: 2,
        borderColor: 'rgba(119, 142, 248, 0.3)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    initialsText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#778ef8',
        letterSpacing: 1,
    },
});