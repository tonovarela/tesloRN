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
     let checkedImages;    
     checkedImages = await preparedImages(images) ;        
    try {
        const { data } = await tesloApi.patch<Product>(`/products/${id}`, { images: checkedImages, ...rest });        
        return data

    } catch (error) {
        console.log(error);
        if (isAxiosError(error)) {
            console.log(error.response?.data);
        }
        throw new Error("Error al actualizar el producto ");
    }



}

const createProduct = async (product: Partial<Product>) => {
    const { id, images = [], ...rest } = product;
    const checkedImages = await preparedImages(images);
    console.log(checkedImages);
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

const preparedImages = async (images: string[]) => {

    const filesImages = images.filter(image => image.startsWith('file://'));
    const currentImages = images.filter(image => !image.startsWith('file://'));
    const promises = filesImages.map(image => uploadImage(image))
    try {
        const uploadImages = await Promise.all(promises);
        currentImages.push(...uploadImages);
    }catch (error) {
        console.log(error);
    }    
    return currentImages.map((image) => {
        return image.split("/").pop();
    });

}


const uploadImage = async (image: string) => {
    const formData = new FormData();
    formData.append('file', { uri: image, name: image.split("/").pop() ,type: 'image/jpeg' });
    const { data } = await tesloApi.post<{ image: string }>('/files/product', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }

    });

    return data.image

}
