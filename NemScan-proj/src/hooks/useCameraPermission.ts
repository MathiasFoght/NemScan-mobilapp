import { useState, useEffect } from "react";
import { Camera } from "expo-camera";

export function useCameraPermission() {
    const [status, setStatus] = useState<"granted" | "denied" | "undetermined" | null>(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.getCameraPermissionsAsync();
            setStatus(status);
            console.log("Camera permission status:", status);
        })();
    }, []);

    const requestPermission = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setStatus(status);
    };

    return { status, requestPermission };
}
