import {createContext, useCallback} from "react";
import axios from "axios";


type SellerContextProviderProps = {
    children: React.ReactNode;
};
type FetchData={
    success: boolean,
    response:[]
}
type FetchDataProduct={
    success: boolean,
    response:[Product]
}
type Category = {
    category_id: number;
    category_name: string;
    category_image: string;

}
type Pets = {
    pet_id: number;
    name: string;
    image: string;

};
type Product = {
    seller_id: number|undefined;
    title: string;
    description?: string;
    price: number;
    FinaleImages: string;
    stock: number;
    colors?: string|null;
    sizes?: string|null;
    category: string;
    pets?: string;
    tags?: string;
    Images:{name:string}[]
};
type SellerStoreInfo={
    seller_id:number,
    Store_name: string,
    Bio: string,
    telephone: number,
}
type SellerData={

    status: number;
    message: number;
    success:boolean,
}
type SellerContextType = {
    FetchCategory: () => Promise<FetchData>;
    FetchPets: () => Promise<FetchData>;
    FetchProducts: () => Promise<FetchDataProduct>;
    NewProduct: (product: Product) => Promise<{ status: number }|undefined>
    CreateStore:(data:SellerStoreInfo)=>Promise<SellerData>

};

export const SellerContext = createContext({} as SellerContextType);
const url ="http://localhost:3001"
export const SellerContextProvider = ({ children }: SellerContextProviderProps) => {
    const FetchCategory = useCallback(async () => {
        const results = await axios.get(`${url}/ListCategory`);
        return results.data;
    }, []);
    const FetchPets = useCallback(async () => {
        const results = await axios.get(`${url}/ListPets`);
        return results.data;
    }, []);
    const FetchProducts = useCallback(async () => {
        const results = await axios.get(`${url}/ListProduct`);
        return results.data;
    }, []);
    const NewProduct=async (product:Product) =>{
        try {
            const response = await axios.post<{ status: number }>(`${url}/NewProduct`, product);
            return response.data;

        }catch(error){
            console.log(error);
        }
    }
    const CreateStore =async (SellerInfo:SellerStoreInfo) => {
        try {
            const response = await axios.put(`${url}/CreateStore`, SellerInfo);
            return response.data;

        }catch(error){
            console.log(error);
        }
    }

    return <SellerContext.Provider value={{FetchCategory,FetchPets,NewProduct,FetchProducts,CreateStore}}>{children}</SellerContext.Provider>;
};
