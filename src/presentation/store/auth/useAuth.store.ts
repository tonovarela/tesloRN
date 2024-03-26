import { create } from "zustand";
import { User } from "../../../domain/entities/user.entity";
import { AuthStatus } from "../../../infrastructure/interfaces/auth.estatus";
import { authLogin } from "../../../actions/auth/auth";

export interface AuthState {
    status: AuthStatus;
    token?: string;
    user?: User;
    login: (email: string, password: string) => Promise<boolean>;

}

export const useAuthStore = create<AuthState>()((set, get) => ({
    status: 'checking',
    token: undefined,
    user: undefined,
    login: async (email: string, password: string) => {
        const resp = await authLogin(email, password);
        if (!resp) {
            set({ status: 'unauthenticated',user: undefined, token: undefined });
            return false;
        }        
        // Guardar el token en el store
        set({ status: 'authenticated', user: resp.user, token: resp.token });
        console.log(resp);
        return true;
    }
}))
