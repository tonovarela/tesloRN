import React from 'react';
import { ScrollView } from 'react-native';
import {  Product, } from '../../../domain/entities/products.entity';
import { MainLayout } from '../../navigation/MainLayout';
import { Button, ButtonGroup, Input, Layout, useTheme } from '@ui-kitten/components';
import { ProductImages } from './ProductImages';
import { CustomIcon } from '../ui/CustomIcon';
import { GENDERS, SIZES } from '../../../config/constants/constans';


interface Props {
    product:Product;
    handleSubmit:()=>void;
    handleChange:(field:string)=>any;
    setFieldValue: (field: string, value: any) => any,
    isSaving:boolean;
}


const theme = useTheme();
export const ProductForm= ({product,handleChange,handleSubmit,setFieldValue,isSaving}:Props) => {
return (
    <MainLayout title={product.title} subtitle={`Precio ${product.price}`}>                        
    <ScrollView  >                            
        <Layout  style={{marginVertical:10,justifyContent:'center',alignItems:'center'}}>
           <ProductImages images={product.images}></ProductImages>                                
        </Layout>
        <Layout style={{ marginHorizontal: 10 }}>
            <Input label='Titulo' onChangeText={handleChange('title')} value={product.title} style={{ marginVertical: 5 }}></Input>
            <Input label='Slug' onChangeText={handleChange('slug')} value={product.slug} style={{ marginVertical: 5 }}></Input>
            <Input label='Descripcion' onChangeText={handleChange('description')} value={product.description} numberOfLines={5} multiline style={{ marginVertical: 5 }}></Input>

        </Layout>
        <Layout style={{ marginHorizontal: 15, marginVertical: 5, flexDirection: 'row', gap: 10 }}>
            <Input label='Precio' keyboardType='numeric' onChangeText={handleChange('price')} value={product.price.toString()} style={{ flex: 1 }}></Input>
            <Input label='Stock'  keyboardType='numeric' onChangeText={handleChange('stock')} value={product.stock.toString()} style={{ flex: 1 }}></Input>
        </Layout>

        <Layout style={{ height: 'auto' }}>
            <ButtonGroup appearance='outline' style={{ margin: 2, marginTop: 30, marginHorizontal: 15 }} size='small'  >
                {
                    SIZES.map((size) => (
                        <Button
                            key={size}
                            onPress={()=>{setFieldValue('sizes',product.sizes.includes(size)
                                                                ?product.sizes.filter(s=>s!==size)
                                                               :[...product.sizes,size]);                                                                                   
                                                            }}
                            style={{
                                flex: 1,
                                backgroundColor : product.sizes.includes(size) ? theme['color-primary-200'] : undefined,
                            }}
                        >
                            {size}
                        </Button>
                    ))
                }
            </ButtonGroup>
            <ButtonGroup appearance='outline' style={{ margin: 2, marginTop: 30, marginHorizontal: 15 }} size='small'  >
                {
                    GENDERS.map((gender) => (
                        <Button
                            key={gender}
                            onPress={()=>setFieldValue('gender', gender)}
                            style={{
                                flex: 1,
                                backgroundColor: product.gender===gender? theme['color-primary-200'] : undefined,
                            }}
                        >
                            {gender}
                        </Button>
                    ))
                }
            </ButtonGroup>
            <Button
                accessoryLeft={<CustomIcon name='save-outline' white></CustomIcon>}
                style={{ margin: 15 }}
                disabled={isSaving}
                onPress={()=>{handleSubmit()}}>
                Guardar
            </Button>
           
        </Layout>


    </ScrollView>                        
</MainLayout>
)
}