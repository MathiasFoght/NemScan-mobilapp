import { StyleSheet, Dimensions } from "react-native";
import { colors } from "@/src/shared/global/colors";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    topSection: {
        height: height * 0.45,
        backgroundColor: colors.secondary,
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: 250,
        height: 250,
        borderRadius: 125, // halvdelen af width/height for perfekt rund
        borderWidth: 2,
        borderColor: colors.white,
    },
    bottomSection: {
        flex: 1,
        backgroundColor: colors.white,
        marginTop: -40, // overlapper topSection halvdelen af billedets højde
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingTop: 30, // plads til billedet
        paddingHorizontal: 30,
        alignItems: "stretch",
    },
    title: {
        fontSize: 28,
        fontWeight: "500",
        color: colors.black,
        textAlign: "center",
        marginBottom: 16,
    },
    text: {
        fontSize: 18,
        color: colors.black,
        textAlign: "left",
        marginBottom: 6,
    },
    label: {
        fontWeight: "600",
        color: colors.black,
    },
    value: {
        fontWeight: "300",
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
