import * as Application from 'expo-application';
import { Platform } from 'react-native';
import { getData, saveData } from '../auth/storageService';

export const getDeviceId = async (): Promise<string> => {
    const storedDeviceId = await getData('deviceId');
    if (storedDeviceId) {
        console.log('Device id:', storedDeviceId);
        return storedDeviceId;
    }

    let deviceId: string | null = null;

    if (Platform.OS === 'android') {
        deviceId = Application.getAndroidId();
    } else if (Platform.OS === 'ios') {
        deviceId = await Application.getIosIdForVendorAsync();
    }

    if (!deviceId) {
        throw new Error('Device id could not be found');
    }

    await saveData('deviceId', deviceId);
    
    return deviceId;
};
