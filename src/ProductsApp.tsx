import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StackNav } from './presentation/navigation/StackNav';

import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components';
import { useColorScheme } from 'react-native';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

export const ProductsApp = () => {
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? eva.dark : eva.light;
    const backgroundColor = colorScheme === 'dark'? theme['color-basic-800'] :theme["color-basic-100"];
    return (
        <><IconRegistry icons={EvaIconsPack}/>
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
                    <StackNav />
                </NavigationContainer>
            </ApplicationProvider>
        </>


    )
}