import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "@/src/shared/global/colors";
import styles from "./logo.styles";

export default function Logo() {
    return (
        <View style={styles.logoContainer}>
            <MaterialCommunityIcons
                name="barcode-scan"
                size={64}
                color={colors.white}
            />
        </View>
    );
}
