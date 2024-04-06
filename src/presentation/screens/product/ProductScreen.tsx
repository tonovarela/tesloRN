import React, { useRef } from 'react';
import { MainLayout } from '../../navigation/MainLayout';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/StackNav';


import { Formik } from 'formik';
import { getProductById, updateCreateProduct } from '../../../actions/products';

import { ProductForm } from '../../components/products/ProductForm';
import { Product } from '../../../domain/entities/products.entity';
import { Text } from '@ui-kitten/components';


interface Props extends StackScreenProps<RootStackParams, 'ProductScreen'> { }


export const ProductScreen = ({ route }: Props) => {
    const productIdRef = useRef(route.params.productId);
    
    const queryClient = useQueryClient();


    const { isLoading, data: product } = useQuery({
        queryKey: ['product', productIdRef.current],
        staleTime: 1000 * 60 * 60,
        queryFn: () => getProductById(productIdRef.current)
    })

    const mutation = useMutation({
        mutationFn: (data: Product) => updateCreateProduct({ ...data, id: productIdRef.current }),
        mutationKey: ['update-product', productIdRef.current],
        onSuccess: (data: Product) => {
            productIdRef.current = data.id;
            queryClient.invalidateQueries({ queryKey: ['products', 'infinite'] });
            queryClient.invalidateQueries({ queryKey: ['product', data.id] });
            //queryClient.setQueryData(['product', productIdRef.current], data);                
        }
    });

    if (product === undefined) {
        return (
            <MainLayout title='...' subtitle=''>
                {!isLoading && <Text style={{ flex: 1, alignSelf: 'center' }}>Producto no encontrado</Text>}
            </MainLayout>
        )
    }
    return (
        <Formik
            initialValues={product}
            onSubmit={mutation.mutate}>
            {
                ({ handleChange, handleSubmit, values, errors, setFieldValue }) => (
                    <ProductForm
                        product={values}
                        
                        handleSubmit={handleSubmit} 
                        handleChange={handleChange}
                        isSaving={mutation.isPending}
                        setFieldValue={setFieldValue}/>                    
                )
            }

        </Formik>


    )
}