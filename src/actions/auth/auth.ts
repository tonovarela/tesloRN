import { tesloApi } from "../../config/api/tesloApi";
import { User } from "../../domain/entities/user.entity";
import type { AuthResponse } from "../../infrastructure/interfaces/auth.response";



const toUserToken = (data: AuthResponse) => {
    const user: User = {
        id: data.id,
        email: data.email,
        fullName: data.fullName,
        isActive: data.isActive,
        roles: data.roles,

    };
    return {
        user,
        token: data.token
    }
}

export const checkToken = async () => {    
    console.log(tesloApi.defaults.baseURL)
    try {
        const { data } = await tesloApi.get<AuthResponse>("/auth/check-status");
        return toUserToken(data);
    } catch (error) {
        return null;
    }
}

export const authLogin = async (email: string, password: string) => {
    email = email.toLowerCase();    
    try {
        const { data } = await tesloApi.post<AuthResponse>("/auth/login", { email, password });
        return toUserToken(data);
    } catch (error) {        
        return null;
    }
}

export const register = async (email: string, password: string, fullName: string) => {    
    email = email.toLowerCase();
    try {
        const resp = await tesloApi.post<AuthResponse>("/auth/register", { email, password, fullName });        
        return toUserToken(resp.data);
    } catch (error) {
        console.log(error);
        return null;
    }
}