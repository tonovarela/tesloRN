import { STAGE, API_URL as PRODURL, API_URL_ANDROID, API_URL_IOS } from "@env";
import axios from "axios";
import { Platform } from "react-native";

export const API_URL = (STAGE === "prod") ? PRODURL :
    Platform.OS === "android"
        ? PRODURL
        : API_URL_IOS;

        console.log(API_URL);
const tesloApi = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

//Agregar Interceptors

export {
    tesloApi
}