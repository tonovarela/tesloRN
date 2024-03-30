import React from 'react';
import { Product } from '../../../domain/entities/products.entity';
import { Card, Layout, Text } from '@ui-kitten/components';
import { Image } from 'react-native';
import { FadeInImage } from '../../hooks/FadeInImage';
interface Props {
    product: Product
}
export const ProductCard = ({ product }: Props) => {
    return (      
      <Card style={{flex:1,backgroundColor:'#F9F9F9',margin:3}}>
          {
            (product.images.length===0)
            ?<Image style={{width:'100%',height:200}} source={require('../../../assets/no-product-image.png')}/>
            :<FadeInImage uri={product.images[0]} style={{width:'100%',height:200,flex:1}}  ></FadeInImage>            
          }
          <Text numberOfLines={2} style={{textAlign:'center',}}>{product.title}</Text>
      </Card>
    )
}