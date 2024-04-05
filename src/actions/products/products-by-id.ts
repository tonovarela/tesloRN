import { tesloApi } from "../../config/api/tesloApi";
import { Gender, Product } from "../../domain/entities/products.entity";
import { TesloProducts } from "../../infrastructure/interfaces/produtcts.response";
import { ProductMapper } from "../../infrastructure/mappers/product.mapper";

const emptyProduct: Product = {
    id: '',
    title: '',
    price: 0,
    description: '',
    slug: '',
    stock: 0,
    images: [],
    gender: Gender.Unisex,
    sizes: [],
    tags: []

}

export const getProductById = async (id: string): Promise<Product | undefined> => {
    if (id === 'new') {
        return emptyProduct;
    }
    try {
        const { data } = await tesloApi.get<TesloProducts>(`/products/${id}`);
        return ProductMapper.tesloProductToEntity(data)

    } catch (error) {
        //throw new Error("Error getProductById: "+id);
        return undefined;

    }
}