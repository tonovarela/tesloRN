import React from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { getProductsByPage } from '../../../actions/products/products-by-page';
import { MainLayout } from '../../navigation/MainLayout';
import { FullScreenLoader } from '../../components/ui/FullScreenLoader';
import { ProductList } from '../../components/products/ProductList';
import { FAB } from '../../components/products/FAB';

import { RootStackParams } from '../../navigation/StackNav';


export const HomeScreen = () => {
    const  navigation = useNavigation<NavigationProp<RootStackParams>>();
    const { isLoading, data, fetchNextPage } = useInfiniteQuery({
        queryKey: ['products', 'infinite'],
        staleTime: 1000 * 60 * 60,
        initialPageParam: 0,
        queryFn: async (params) => await getProductsByPage(params.pageParam),
        getNextPageParam: (lastPage, allPages) => lastPage.length
    });
    // const { isLoading, data: products } = useQuery({
    //     queryKey: ['products', 'infinite'],
    //     staleTime: 1000 * 60 * 60,
    //     queryFn: () => getProductsByPage(0)
    // });

    return (
        <MainLayout title={'TesloShop -Products'} subtitle={'Administración'}   >
            {

                (isLoading) ? <FullScreenLoader />
                    : <ProductList fetchNextPage={fetchNextPage}
                        products={data?.pages.flat() ?? []}></ProductList>
            }
         <FAB onPress={()=>{
            navigation.navigate('ProductScreen',{productId:'new'})
         }} iconName='plus' 
         style={{position:'absolute',bottom:30,right:30}} />
        </MainLayout>
    )
}

