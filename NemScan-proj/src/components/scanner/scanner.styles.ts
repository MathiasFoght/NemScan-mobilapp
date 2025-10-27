import { StyleSheet } from "react-native";
import { colors } from "@/src/shared/global/colors";

export default StyleSheet.create({
    overlay: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: colors.white,
        paddingTop: "25%",
    },

    cameraBox: {
        width: "90%",
        height: "30%",
        borderRadius: 32,
        borderWidth: 6,
        borderColor: colors.primary,
        overflow: "hidden",
        position: "relative",
    },

    overlayTop: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 25,
        backgroundColor: "rgba(0,0,0,0.3)",
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
    },
    overlayBottom: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 25.2,
        backgroundColor: "rgba(0,0,0,0.3)",
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
    },
    overlayLeft: {
        position: "absolute",
        top: 25,
        bottom: 25,
        left: 0,
        width: 25,
        backgroundColor: "rgba(0,0,0,0.3)",
    },
    overlayRight: {
        position: "absolute",
        top: 25,
        bottom: 25,
        right: 0,
        width: 25,
        backgroundColor: "rgba(0,0,0,0.3)",
    },

    cameraInner: {
        position: "absolute",
        top: 15,
        left: 15,
        right: 15,
        bottom: 15,
        borderRadius: 20,
        overflow: "hidden",
    },

    innerFrame: {
        position: "absolute",
        top: 23,
        left: 23,
        right: 23,
        bottom: 23,
        borderWidth: 1,
        borderColor: colors.secondary,
        borderStyle: "dashed",
        borderRadius: 5,
        backgroundColor: "transparent",
    },
});
