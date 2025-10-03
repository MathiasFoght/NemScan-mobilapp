import { useState, useEffect } from "react";
import { Camera } from "expo-camera";

export function useCameraPermission() {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.getCameraPermissionsAsync();
            setHasPermission(status === "granted");
            console.log('Camera permission status:', status);
        })();
    }, []);

    const requestPermission = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === "granted");
    };

    return { hasPermission, requestPermission };
}
