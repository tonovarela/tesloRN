import React, { useState } from 'react';
import { Alert, useWindowDimensions } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { Input, Layout, Text, Button } from '@ui-kitten/components';
import { CustomIcon } from '../../components/ui/CustomIcon';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/StackNav';

import { useAuthStore } from '../../store/auth/useAuth.store';
interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> {
}

export const LoginScreen = ({ navigation }: Props) => {
    const { height } = useWindowDimensions();
    const { login } = useAuthStore();
    const [isLoading, setIsLoading] = useState(false)
    const [form, setForm] = useState({ email: '', password: '' });

    const onLogin = async () => {
        
        if (form.email.length === 0 && form.password.length === 0) {

            return;
        }
        setIsLoading(true);
        const isSuccess = await login(form.email, form.password);
        setIsLoading(false);
        console.log(isSuccess)
        if (!isSuccess) {
            Alert.alert("Error", "Invalid user")
            //    navigation.navigate('HomeScreen');
        }
    }

    return (
        <Layout style={{ flex: 1 }}>
            <ScrollView style={{ marginHorizontal: 40 }} >
                <Layout style={{ paddingTop: height * 0.35 }}>
                    <Text category="h1">Ingresar</Text>
                    <Text category='p2'>Por favor ingrese para continuar</Text>
                </Layout>
                <Layout style={{ marginTop: 20 }}>
                    <Input
                        value={form.email}
                        onChangeText={email => setForm({ ...form, email })}
                        accessoryLeft={<CustomIcon name='email-outline'></CustomIcon>}
                        keyboardType='email-address'
                        autoCapitalize='none'
                        placeholder='Correo electrónico' style={{ marginBottom: 10 }}></Input>

                    <Input
                        value={form.password}
                        onChangeText={password => setForm({ ...form, password })}
                        accessoryLeft={<CustomIcon name='lock'></CustomIcon>}
                        secureTextEntry={true}
                        autoCapitalize='none'
                        placeholder='Password' style={{ marginBottom: 10 }}></Input>
                </Layout>
                <Layout style={{ height: 20 }}></Layout>
                <Layout>
                    <Button
                    disabled={isLoading}
                        accessoryRight={<CustomIcon white name="arrow-forward-outline"></CustomIcon>}
                        onPress={onLogin}    >
                        Ingresar
                    </Button>
                </Layout>
                <Layout style={{ height: 50 }}></Layout>
                <Layout style={{ alignItems: 'flex-end', justifyContent: 'center', flexDirection: 'row' }}>
                    <Text>¿No tienes una cuenta?</Text>
                    <Text status='primary' category='s1' onPress={() => { navigation.navigate('RegisterScreen') }}> Crea una</Text>
                </Layout>
            </ScrollView>
        </Layout>
    )
}