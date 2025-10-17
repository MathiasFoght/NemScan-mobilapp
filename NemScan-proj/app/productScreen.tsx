import { View, Text, ActivityIndicator, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { getProductCustomer, getProductImage } from "@/src/services/product/productService";
import { Product_Customer } from "@/src/services/product/interfaces";
import { styles } from "@/src/styles/screens/productScreen.styles";
import { colors } from "@/src/shared/global/colors";

export default function ProductScreen() {
    const { barcode } = useLocalSearchParams<{ barcode: string }>();
    const [product, setProduct] = useState<Product_Customer | null>(null);
    const [productImageUrl, setProductImageUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const prod: Product_Customer = await getProductCustomer(barcode);
                const img: string = await getProductImage(barcode);

                setProduct(prod);
                setProductImageUrl(img); // URL fra API
            } catch (err) {
                console.error(err);
                setError("Kunne ikke hente produktdata");
            } finally {
                setLoading(false);
            }
        };

        if (barcode) fetchProduct();
    }, [barcode]);

    if (loading) return <ActivityIndicator style={styles.loader} size="large" color={colors.primary} />;
    if (error) return <Text style={styles.error}>{error}</Text>;
    if (!product) return <Text style={styles.error}>Ingen produktdata fundet</Text>;

    return (
        <View style={styles.container}>
            {/* Top section med baggrund og billede */}
            <View style={styles.topSection}>
                {productImageUrl && (
                    <Image
                        source={{ uri: productImageUrl }}
                        style={styles.image}
                        resizeMode="contain"
                    />
                )}
            </View>

            {/* Bottom section med tekst */}
            <View style={styles.bottomSection}>
                <Text style={styles.title}>{product.name}</Text>

                <Text style={styles.text}>
                    <Text style={styles.label}>Produktnummer: </Text>
                    <Text style={styles.value}>{product.number}</Text>
                </Text>

                <Text style={styles.text}>
                    <Text style={styles.label}>UID: </Text>
                    <Text style={styles.value}>{product.uid}</Text>
                </Text>

                <Text style={styles.text}>
                    <Text style={styles.label}>Client UID: </Text>
                    <Text style={styles.value}>{product.clientUid}</Text>
                </Text>
            </View>
        </View>
    );
}
