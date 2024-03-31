import React, { PropsWithChildren, useRef } from 'react';
import { MainLayout } from '../../navigation/MainLayout';
import { Button, ButtonGroup, Input, Layout, Text, useTheme } from '@ui-kitten/components';
import { useQuery } from '@tanstack/react-query';


import { getProductById } from '../../../actions/products/products-by-id';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/StackNav';
import { ScrollView } from 'react-native-gesture-handler';
import { FlatList } from 'react-native';
import { FadeInImage } from '../../hooks/FadeInImage';
import { Gender, Size } from '../../../domain/entities/products.entity';
import { CustomIcon } from '../../components/ui/CustomIcon';


const sizes :Size[] =[Size.Xxl,Size.Xl,Size.L,Size.M,Size.S];
const genders :Gender[] =[ Gender.Kid,Gender.Men,Gender.Women,Gender.Unisex];

interface Props extends StackScreenProps<RootStackParams, 'ProductScreen'> { }


export const ProductScreen = ({ route }: Props) => {
    const productIdRef = useRef(route.params.productId);
     const theme = useTheme();
    const { data: product } = useQuery({
        queryKey: ['product', productIdRef.current],
        staleTime: 1000 * 60 * 60,
        queryFn: () => getProductById(productIdRef.current)
    })

    if (product === undefined) {
        return (
            <MainLayout title='Cargando ...' subtitle=''>
                <Text>Producto no encontrado</Text>
            </MainLayout>
        )
    }
    return (
        <MainLayout title={product.title} subtitle={`Precio ${product.price}`}>
            <ScrollView style={{ flex: 1 }}>
                {/* TODO: Validar que el producto tenga imagenes */}
                <Layout >
                    <FlatList
                        data={product.images}
                        keyExtractor={(item) => item}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => <FadeInImage uri={item} style={{ width: 300, height: 300, marginHorizontal: 7 }} />}
                    />
                </Layout>
                <Layout style={{ marginHorizontal: 10 }}>
                    <Input label='Titulo' value={product.title} style={{ marginVertical: 5 }}></Input>
                    <Input label='Slug' value={product.slug} style={{ marginVertical: 5 }}></Input>
                    <Input label='Descripcion' value={product.description} numberOfLines={5} multiline style={{ marginVertical: 5 }}></Input>

                </Layout>
                <Layout style={{ marginHorizontal: 15, marginVertical: 5, flexDirection: 'row', gap: 10 }}>
                    <Input label='Precio' value={product.price.toString()} style={{ flex: 1 }}></Input>
                    <Input label='Stock' value={product.stock.toString()} style={{ flex: 1 }}></Input>
                </Layout>

                <Layout style={{ height: 'auto' }}>
                    <ButtonGroup  appearance='outline'  style={{margin:2,marginTop:30,marginHorizontal:15}} size='small'  >
                        {
                            sizes.map((size) => (
                                <Button
                                    key={size}                                    
                                    style={{ flex:1,
                                    backgroundColor:true?theme['color-primary-200']:undefined,}}
                                >
                                    {size}
                                </Button>
                            ))
                        }                        
                    </ButtonGroup>
                    <ButtonGroup  appearance='outline'  style={{margin:2,marginTop:30,marginHorizontal:15}} size='small'  >
                        {
                            genders.map((gender) => (
                                <Button
                                    key={gender}                                    
                                    style={{ flex:1,
                                    backgroundColor:true?theme['color-primary-200']:undefined,}}
                                >
                                    {gender}
                                </Button>
                            ))
                        }                        
                    </ButtonGroup>
                    <Button
                    accessoryLeft={<CustomIcon name='save-outline' white></CustomIcon>}
                    style={{margin:15}}
                     onPress={()=>{console.log("Guardar")}}>
                        Guardar
                    </Button>
                    <Text>
                        {JSON.stringify(product,null,2)}
                    </Text>
                </Layout>





            </ScrollView>
        </MainLayout>

    )
}