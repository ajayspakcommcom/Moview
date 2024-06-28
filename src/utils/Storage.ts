import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key: string, value: any): Promise<void> => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
        console.log(`Data saved with key '${key}'`);
    } catch (e) {
        console.error(`Error saving data with key '${key}' to AsyncStorage:`, e);
    }
};

export const getData = async (key: string): Promise<any | null> => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.error(`Error retrieving data with key '${key}' from AsyncStorage:`, e);
        return null;
    }
};

export const removeData = async (key: string): Promise<void> => {
    try {
        await AsyncStorage.removeItem(key);
        console.log(`Data with key '${key}' removed from AsyncStorage`);
    } catch (e) {
        console.error(`Error removing data with key '${key}' from AsyncStorage:`, e);
    }
};
