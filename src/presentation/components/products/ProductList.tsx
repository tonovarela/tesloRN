import React from 'react';
import { Product } from '../../../domain/entities/products.entity';
import { Layout, List } from '@ui-kitten/components';
import { ProductCard } from './ProductCars';

interface Props  {
    products:Product[],
    // siguente pagina MAs productos
}
export const ProductList= ({products}:Props) => {
return (
    <List
    data={products}
    numColumns={2}
    keyExtractor={(p,index)=>`${p.id}-${index}`}
    renderItem={({item})=><ProductCard product={item}></ProductCard>}
    ListFooterComponent={()=><Layout style={{height:150}}></Layout>}
    >
    </List>

)
}