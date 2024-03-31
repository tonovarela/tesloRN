import { tesloApi } from "../../config/api/tesloApi";
import { Product } from "../../domain/entities/products.entity";
import { TesloProducts } from "../../infrastructure/interfaces/produtcts.response";
import { ProductMapper } from "../../infrastructure/mappers/product.mapper";

export const getProductById = async (id: string) : Promise<Product | undefined >=> {
    try {
        const { data } = await tesloApi.get<TesloProducts>(`/products/${id}`);
        return ProductMapper.tesloProductToEntity(data)
        
    } catch (error) {
        //throw new Error("Error getProductById: "+id);
        return undefined;
        
    }
}