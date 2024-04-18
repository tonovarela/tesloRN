import { create } from "zustand";
import { User } from "../../../domain/entities/user.entity";
import { AuthStatus } from "../../../infrastructure/interfaces/auth.estatus";

import { StorageAdapter } from "../../../config/api/adapter/StorageAdapter";
import { authLogin, checkToken, register } from "../../../actions/auth";

export interface AuthState {
    status: AuthStatus;
    token?: string;
    user?: User;
    login: (email: string, password: string) => Promise<boolean>;
    checkStatus: () => Promise<void>;
    logout: () => Promise<void>;
    register: (email: string, password: string, fullName: string) => Promise<boolean>;

}

export const useAuthStore = create<AuthState>()((set, get) => ({
    status: AuthStatus.CHECKING,
    token: undefined,
    user: undefined,
    register: async (email: string, password: string, fullName: string) => {
           const resp = await register(email, password, fullName);
           console.log(resp);
           if (!resp) {
            set({ status: AuthStatus.UNAUTHENTICATED, user: undefined, token: undefined });
                 return false;
           }
           await StorageAdapter.setItem('token', resp.token);
        set({ status: AuthStatus.AUTHENTICATED, user: resp.user, token: resp.token });
        return true;

    },
    logout: async () => {
        set({ status: AuthStatus.UNAUTHENTICATED, user: undefined, token: undefined });
        await StorageAdapter.removeItem('token');
    },
    checkStatus: async () => {
        const resp= await checkToken();        
        if (!resp){
                 set({ status:AuthStatus.UNAUTHENTICATED, user: undefined, token: undefined });
                 return;
        }
        
        await StorageAdapter.setItem('token', resp.token);
        set({ status: AuthStatus.AUTHENTICATED, user: resp.user, token: resp.token });

    },
    login: async (email: string, password: string) => {
        const resp = await authLogin(email, password);
        if (!resp) {
            
            set({ status: AuthStatus.UNAUTHENTICATED, user: undefined, token: undefined });
            return false;
        }
        await StorageAdapter.setItem("token", resp.token);

        set({ status:AuthStatus.AUTHENTICATED, user: resp.user, token: resp.token });
        return true;
    }
}))
