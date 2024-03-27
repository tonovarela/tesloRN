
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../navigation/StackNav';
import { PropsWithChildren, useEffect } from 'react';
import { useAuthStore } from '../store/auth/useAuth.store';

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
            case 'authenticated':
                navigation.reset({ index: 0, routes: [{ name: 'HomeScreen' }] });
                break;
            case 'unauthenticated':
                navigation.reset({ index: 0, routes: [{ name: 'LoginScreen' }] });
                break;
            case 'checking':
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