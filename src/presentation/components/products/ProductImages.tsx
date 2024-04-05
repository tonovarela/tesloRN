import React from 'react';
import { FlatList, Image } from 'react-native'
import { FadeInImage } from '../../hooks/FadeInImage';
interface Props {
    images: string[]
}
export const ProductImages = ({ images }: Props) => {
    return (

        (images.length == 0)
            ?
            <Image style={{ width: 300, height: 300 }} source={require('../../../assets/no-product-image.png')} />
            : <FlatList
                data={images}
                keyExtractor={(item) => item}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => <FadeInImage uri={item} style={{ width: 300, height: 300, marginHorizontal: 7 }} />}
            />


    )
}