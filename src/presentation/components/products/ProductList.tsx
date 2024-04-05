import React, { useState } from 'react';
import { Product } from '../../../domain/entities/products.entity';
import { Layout, List } from '@ui-kitten/components';
import { ProductCard } from './ProductCars';
import { RefreshControl } from 'react-native';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
    products: Product[],
    fetchNextPage: () => void
    // siguente pagina MAs productos
}
export const ProductList = ({ products, fetchNextPage }: Props) => {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const queryClient = useQueryClient();


    const onPulltoRefresh = async () => {
        setIsRefreshing(true) 
        await new Promise(resolve => setTimeout(resolve, 200));
        queryClient.invalidateQueries({ queryKey: ['products', 'infinite'] });   
        
        //await fetchNextPage()
        setIsRefreshing(false)
    }
    return (
        <List
           refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onPulltoRefresh}></RefreshControl>}
            data={products}
            numColumns={2}
            onEndReachedThreshold={0.8}
            onEndReached={fetchNextPage}
            keyExtractor={(p, index) => `${p.id}-${index}`}
            renderItem={({ item }) => <ProductCard product={item}></ProductCard>}
            ListFooterComponent={() => <Layout style={{ height: 150 }}></Layout>}
        >
        </List>

    )
}