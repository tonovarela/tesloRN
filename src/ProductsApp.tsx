import React from 'react';
import { useColorScheme } from 'react-native';
import * as eva from '@eva-design/eva';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { NavigationContainer } from '@react-navigation/native';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';

import { StackNav } from './presentation/navigation/StackNav';


import { AuthProvider } from './presentation/providers/auth.provider';

export const ProductsApp = () => {
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? eva.dark : eva.light;
    const backgroundColor = colorScheme === 'dark'? theme['color-basic-800'] :theme["color-basic-100"];
    const queryClient = new QueryClient()
    return (
        <>
        <QueryClientProvider client={queryClient}>
        <IconRegistry icons={EvaIconsPack}/>
            <ApplicationProvider            
             {...eva} theme={theme}>
                <NavigationContainer
                theme={{
                    dark:colorScheme==='dark',
                    colors:{
                        primary:theme['color-primary-500'],
                        background:backgroundColor,
                        card:theme['color-basic-100'],
                        text:theme['text-basic-600'],
                        border:theme['color-basic-800'],
                        notification:theme['color-primary-500'],
                    }                    
                }}
                >
                    <AuthProvider>
                    <StackNav />                                    
                    </AuthProvider>                    
                </NavigationContainer>
            </ApplicationProvider>
            </QueryClientProvider>
            
        </>


    )
}