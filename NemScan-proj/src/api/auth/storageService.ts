import * as SecureStore from 'expo-secure-store';

export const saveData = async (key: string, value: string): Promise<void> => {
    await SecureStore.setItemAsync(key, value);
    console.log('Data saved:', { key, value });
};

export const getData = async (key: string): Promise<string | null> => {
    console.log('Fetching data for key:', key);
    return await SecureStore.getItemAsync(key);
};

export const removeData = async (key: string): Promise<void> => {
    console.log('Removing data for key:', key);
    await SecureStore.deleteItemAsync(key);
};