import { StyleSheet, Dimensions } from "react-native";
import { colors } from "@/src/shared/global/colors";

const { width, height } = Dimensions.get("window");

const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    topSection: {
        height: height * 0.45,
        backgroundColor: hexToRgba(colors.white, 1),
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: width * 0.7,
        height: height * 0.3,
        borderRadius: 10,
    },
    bottomSection: {
        flex: 1,
        backgroundColor: hexToRgba(colors.secondary, 0.8),
        marginTop: -40, // overlapper toppen
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingTop: 30, // plads til at billedet overlapper
        paddingHorizontal: 30,
        alignItems: "flex-start",
    },
    title: {
        fontSize: 26,
        fontWeight: "600",
        color: colors.black,
        textAlign: "left",
        marginBottom: 10,
    },
    text: {
        fontSize: 18,
        color: colors.black,
        textAlign: "left",
        marginBottom: 6,
    },
    label: {
        fontWeight: "bold",
        color: colors.black,
    },
    value: {
        fontWeight: "normal",
        color: colors.black,
    },
    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    error: {
        color: colors.important,
        textAlign: "center",
        marginTop: 20,
        fontSize: 16,
    },
});
