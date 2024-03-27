import React, { useState } from 'react';
import { Alert, useWindowDimensions } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { Input, Layout, Text, Button } from '@ui-kitten/components';
import { CustomIcon } from '../../components/ui/CustomIcon';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/StackNav';
import { useAuthStore } from '../../store/auth/useAuth.store';

interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'> {

}

export const RegisterScreen = ({ navigation }: Props) => {
    const { height } = useWindowDimensions();
    const [form, setForm] = useState({ email: '', password: '', fullName: '' });
    const [isLoading, setIsLoading] = useState(false);
    const { register } = useAuthStore();
    const onRegister = async () => {
        setIsLoading(true);
        const isSuccess = await register(form.email, form.password, form.fullName);
        setIsLoading(false);
        if (!isSuccess) {
            Alert.alert("Error", "Error al registrar")
        }
    }
    return (
        <Layout style={{ flex: 1 }}>
            <ScrollView style={{ marginHorizontal: 30 }} >
                <Layout style={{ paddingTop: height * 0.30 }}>
                    <Text category="h1">Registro</Text>
                    <Text category='p2'>Por favor ,llene la información</Text>
                </Layout>
                <Layout style={{ marginTop: 20 }}>
                    <Input
                        value={form.fullName}
                        onChangeText={(fullName) => { setForm({ ...form, fullName }) }}
                        accessoryLeft={<CustomIcon name='person-outline'></CustomIcon>}
                        autoCapitalize='none'
                        placeholder='Nombre completo' style={{ marginBottom: 10 }}></Input>

                    <Input
                        value={form.email}
                        onChangeText={(email) => { setForm({ ...form, email }) }}
                        accessoryLeft={<CustomIcon name='email-outline'></CustomIcon>}
                        keyboardType='email-address'
                        autoCapitalize='none'
                        placeholder='Correo electrónico' style={{ marginBottom: 10 }}></Input>
                    <Input
                        value={form.password}
                        onChangeText={(password) => { setForm({ ...form, password }) }}
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
                        onPress={onRegister}    >
                        Registrar
                    </Button>
                </Layout>
                <Layout style={{ height: 50 }}></Layout>
                <Layout style={{ alignItems: 'flex-end', justifyContent: 'center', flexDirection: 'row' }}>
                    <Text>¿Ya tienes una cuenta?</Text>
                    <Text status='primary' category='s1' onPress={() => {
                        if (isLoading) return;
                        navigation.pop()
                    }}> Ingresa</Text>
                </Layout>
            </ScrollView>
        </Layout>
    )
}