import { STAGE, API_URL as PRODURL, API_URL_ANDROID, API_URL_IOS } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Platform } from "react-native";

export const API_URL = (STAGE === "prod") ? PRODURL :
    Platform.OS === "android"
        ? API_URL_ANDROID
        : API_URL_IOS;        
const tesloApi = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});


tesloApi.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem("token");       
    if (token) {        
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export {
    tesloApi
}