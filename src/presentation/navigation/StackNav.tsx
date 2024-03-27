import React from 'react';

import { createStackNavigator, StackCardStyleInterpolator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/home/HomeScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';
import { ProductScreen } from '../screens/product/ProductScreen';
import { LoadingScreen } from '../screens/loading/LoadingScreen';

export type RootStackParams = {
    LoadingScreen: undefined
    LoginScreen: undefined,
    RegisterScreen: undefined,
    ProductScreen: { productId: string }
    HomeScreen: undefined
}
const Stack = createStackNavigator<RootStackParams>();


const cardStyleInterpolator: StackCardStyleInterpolator = ({ current }) => {
    return {
        cardStyle: {
            opacity: current.progress
        }
    }
}

export const StackNav = () => {
    return (
        <Stack.Navigator
            initialRouteName='LoadingScreen'
            screenOptions={
                {
                    cardStyleInterpolator,
                    headerShown: false,
                }
            }
        >
            <Stack.Screen options={{ cardStyleInterpolator }} name="HomeScreen" component={HomeScreen} />
            <Stack.Screen options={{ cardStyleInterpolator }} name="LoginScreen" component={LoginScreen} />
            <Stack.Screen options={{ cardStyleInterpolator }} name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen options={{ cardStyleInterpolator }} name="LoadingScreen" component={LoadingScreen} />
            <Stack.Screen name="ProductScreen" component={ProductScreen} />

        </Stack.Navigator>
    )
}