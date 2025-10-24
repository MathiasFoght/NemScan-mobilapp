import {View, Text, TextInput} from "react-native";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/src/contexts/authContext";
import {MaterialIcons} from "@expo/vector-icons";
import Button from "@/src/ui/button/button";
import styles from "@/src/styles/screens/productNotFoundScreen.styles";
import {colors} from "@/src/shared/global/colors";
import '@/i18n/i18n.config';

export default function productNotFoundScreen() {
    const [searchQuery, setSearchQuery] = useState("");

    return (
          <View style={styles.container}>
               <View style={styles.headerBar}>
                    <Button
                        onPress={router.back}
                        icon={<MaterialIcons name="arrow-back-ios-new" size={24} color="#000" />}
                        iconPosition="left"
                        variant="simple"
                        style={{ height: 40 }}
                    />
                    <Text style={styles.headerTitle}>Product Not Found</Text>
                    <View style={styles.placeholder} />
                </View>
                
                <View style={styles.searchContainer}>
                    <MaterialIcons 
                        name="search" 
                        size={24} 
                        color={colors.inactive} 
                        style={styles.searchIcon}
                    />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search for products"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        placeholderTextColor={colors.inactive}
                    />
                    {searchQuery.length > 0 && (
                        <Button
                            onPress={() => setSearchQuery("")}
                            icon={<MaterialIcons name="close" size={20} color={colors.inactive} />}
                            variant="simple"
                            style={styles.clearButton}
                        />
                    )}
                </View>

                <View style={styles.content}>
                    <Text style={styles.messageText}>Product not found</Text>
                    <Text style={styles.subText}>Try searching for the product above</Text>
                </View>
        </View>
    );
}
