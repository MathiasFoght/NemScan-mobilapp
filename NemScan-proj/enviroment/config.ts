import { Platform } from 'react-native';

export const getApiUrl = (): string => {
    const env = process.env.EXPO_PUBLIC_ENV || 'dev';

    if (env === 'prod') {
        return process.env.EXPO_PUBLIC_API_URL || '';
    }

    const target = process.env.EXPO_PUBLIC_DEVICE_TARGET || 'simulator';
    if (target === 'device') {
        return process.env.EXPO_PUBLIC_LOCAL_IP_FOR_DEV_ON_DEVICE || '';
    }
    if (Platform.OS === 'ios') {
        return process.env.EXPO_PUBLIC_API_URL_DEV_IOS || '';
    }

    if (Platform.OS === 'android') {
        return process.env.EXPO_PUBLIC_API_URL_DEV_ANDROID || '';
    }
    return '';
};

export const API_URL = getApiUrl();
