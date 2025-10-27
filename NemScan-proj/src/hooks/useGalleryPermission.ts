import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';

export const useGalleryPermission = () => {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);

    // Henter nuværende status ved mount
    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
            setHasPermission(status === 'granted');
            console.log("Gallery permission status:", status);
        })();
    }, []);

    const requestPermission = async (): Promise<boolean> => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        const granted = status === 'granted';
        setHasPermission(granted);
        console.log("Gallery permission request result:", status);
        return granted;
    };

    return { hasPermission, requestPermission };
};
