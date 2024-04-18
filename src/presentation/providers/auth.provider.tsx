
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../navigation/StackNav';
import { PropsWithChildren, useEffect } from 'react';
import { useAuthStore } from '../store/auth/useAuth.store';
import { AuthStatus } from '../../infrastructure/interfaces/auth.estatus';

interface Props extends PropsWithChildren {
}
export const AuthProvider = ({ children }: Props) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
    const { checkStatus, status } = useAuthStore();
    useEffect(() => {
        checkStatus();
    }, []);

    useEffect(() => {
         
        switch (status) {
            case AuthStatus.AUTHENTICATED:
                navigation.reset({ index: 0, routes: [{ name: 'HomeScreen' }] });
                break;
            case AuthStatus.UNAUTHENTICATED:
                navigation.reset({ index: 0, routes: [{ name: 'LoginScreen' }] });
                break;
            case AuthStatus.CHECKING:
                console.log('checking...');
                break;
            default:
                break;
        }

    }, [status])
    return (
        <>
            {children}
        </>
    )
}