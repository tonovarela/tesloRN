import { tesloApi } from "../../config/api/tesloApi"
import  type { Product } from "../../domain/entities/products.entity";
import  type { TesloProducts } from "../../infrastructure/interfaces/produtcts.response"
import { ProductMapper } from "../../infrastructure/mappers/product.mapper";

export const getProductsByPage = async (page: number, limit=20) : Promise<Product[]>=> {
    try {
        const { data } = await tesloApi.get<TesloProducts[]>(`/products?offset=${page}&limit=${limit}`);
        console.log(page);
//        console.log(data);
        const products = data.map(ProductMapper.tesloProductToEntity);
        return products;

    } catch (error) {
     console.log("Error getProductsByPage: ", error);
     return [];
    }
}

