import React from 'react';
import { Text } from '@ui-kitten/components';
import { useQuery } from '@tanstack/react-query';


import { useAuthStore } from '../../store/auth/useAuth.store';
import { getProductsByPage } from '../../../actions/products/products-by-page';
import { MainLayout } from '../../navigation/MainLayout';
import { FullScreenLoader } from '../../components/ui/FullScreenLoader';
import { ProductList } from '../../components/products/ProductList';


export const HomeScreen = () => {
    const { logout } = useAuthStore();

    const { isLoading, data: products } = useQuery({
        queryKey: ['products', 'infinite'],
        staleTime: 1000 * 60 * 60,
        queryFn: () => getProductsByPage(0)
    });

    return (
        <MainLayout title={'TesloShop -Products'} subtitle={'Administración'}   >
            {
               (isLoading) ? <FullScreenLoader/>:<ProductList products={products!}></ProductList>
            }
            
            

        </MainLayout>
    )
}

