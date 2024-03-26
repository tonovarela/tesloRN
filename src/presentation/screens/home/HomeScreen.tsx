import { Button, Icon, Layout } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet } from 'react-native'

export const HomeScreen = () => {
    return (
        <Layout style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Button
            accessoryLeft={<Icon                            
                name='arrow-circle-left-outline'
            />}
            >Cerrar sesión</Button>
            
        </Layout>
    )
}

