import AsyncStorage from '@react-native-async-storage/async-storage';
export class StorageAdapter {
    static async getItem(key: string): Promise<string | null> {

        try {
            return await AsyncStorage.getItem(key);
        } catch (error) {
            return null;
        }
    }
    static async setItem(key: string, value: string): Promise<void> {
        try {
            await AsyncStorage.setItem(key, value);
        }
        catch (error) {
            throw new Error("Error al almacenar datos en el storage");
        }

    }

    static async removeItem(key: string): Promise<void> {
        try {
            await AsyncStorage.removeItem(key);
        }
        catch (error) {
            throw new Error("Error al borrar datos en el storage");
        }
    }
}