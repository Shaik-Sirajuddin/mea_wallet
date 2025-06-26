import * as SecureStore from "expo-secure-store";

export default {
  save: async (key: string, value: string) => {
    await SecureStore.setItemAsync(key, value);
  },
  retreive: async (key: string) => {
    let result = await SecureStore.getItemAsync(key);
    return result;
  },
  delete: async (key: string) => {
    await SecureStore.deleteItemAsync(key);
  },
};
