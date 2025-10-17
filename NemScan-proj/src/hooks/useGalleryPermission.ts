import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';

export const useGalleryPermission = () => {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);

    useEffect(() => {
        const requestPermission = async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            setHasPermission(status === 'granted');
            console.log("Gallery permission status:", status);
        };

        requestPermission();
    }, []);

    return { hasPermission };
};
