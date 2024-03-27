import { Button, Icon, Layout } from '@ui-kitten/components';
import React from 'react';
import { useAuthStore } from '../../store/auth/useAuth.store';


export const HomeScreen = () => {
    const { logout } = useAuthStore();
    const closeSesion = async () => {
        await logout();

    }
    return (
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button
                onPress={closeSesion}
                accessoryLeft={<Icon name='log-out-outline'/>}
            >Cerrar sesión</Button>

        </Layout>
    )
}

