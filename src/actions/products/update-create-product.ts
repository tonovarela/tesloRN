import { isAxiosError } from "axios";
import { tesloApi } from "../../config/api/tesloApi";
import { Product } from "../../domain/entities/products.entity";

export const updateCreateProduct = async (product: Partial<Product>) => {
    product.stock = isNaN(Number(product.stock)) ? 0 : Number(product.stock);
    product.price = isNaN(Number(product.price)) ? 0 : Number(product.price);

    if (product.id && product.id !== 'new') {
        return updateProduct(product);
    }
    return createProduct(product);    
}


const updateProduct = async (product: Partial<Product>) => {
    const { id, images = [], ...rest } = product;
    const checkedImages = preparedImages(images);
    try {
        const { data } = await tesloApi.patch<Product>(`/products/${id}`, { images: checkedImages, ...rest });
        return data

    } catch (error) {
        if (isAxiosError(error)) {
            console.log(error.response?.data);
        }
        throw new Error("Error al actualizar el producto ");
    }



}

const createProduct = async (product: Partial<Product>) => {
    const { id, images = [], ...rest } = product;
    const checkedImages = preparedImages(images);
    try {
        const { data } = await tesloApi.post<Product>(`/products`, { images: checkedImages, ...rest });

        return data

    } catch (error) {
        if (isAxiosError(error)) {
            console.log(error.response?.data);
        }
        throw new Error("Error al insertar el producto ");
    }

}


const preparedImages = (images: string[]) => {
    return images.map((image) => {
        return image.split("/").pop();
    });

}




