import React from 'react';
import { useWindowDimensions } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { Input, Layout, Text, Button } from '@ui-kitten/components';
import { CustomIcon } from '../../components/ui/CustomIcon';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/StackNav';

interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'> {

}

export const RegisterScreen = ({ navigation }: Props) => {
    const { height } = useWindowDimensions();
    return (
        <Layout style={{ flex: 1 }}>
            <ScrollView style={{ marginHorizontal: 30 }} >
                <Layout style={{ paddingTop: height * 0.30 }}>
                    <Text category="h1">Registro</Text>
                    <Text category='p2'>Por favor ,llene la información</Text>
                </Layout>
                <Layout style={{ marginTop: 20 }}>
                    <Input
                        accessoryLeft={<CustomIcon name='person-outline'></CustomIcon>}                        
                        autoCapitalize='none'
                        placeholder='Nombre completo' style={{ marginBottom: 10 }}></Input>

<Input
                        accessoryLeft={<CustomIcon name='email-outline'></CustomIcon>}
                        keyboardType='email-address'
                        autoCapitalize='none'
                        placeholder='Correo electrónico' style={{ marginBottom: 10 }}></Input>
                    <Input
                        accessoryLeft={<CustomIcon name='lock'></CustomIcon>}
                        secureTextEntry={true}
                        autoCapitalize='none'
                        placeholder='Password' style={{ marginBottom: 10 }}></Input>

                </Layout>
                <Layout style={{ height: 20 }}></Layout>
                <Layout>
                    <Button
                        accessoryRight={<CustomIcon white name="arrow-forward-outline"></CustomIcon>}
                        onPress={() => { }}    >
                        Registrar
                    </Button>
                </Layout>
                <Layout style={{ height: 50 }}></Layout>
                <Layout style={{ alignItems: 'flex-end', justifyContent: 'center', flexDirection: 'row' }}>
                    <Text>¿Ya tienes una cuenta?</Text>
                    <Text status='primary' category='s1' onPress={() => { navigation.pop() }}> Ingresa</Text>
                </Layout>
            </ScrollView>
        </Layout>
    )
}