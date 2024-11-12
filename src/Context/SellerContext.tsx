import {createContext, useCallback} from "react";
import axios from "axios";

type SellerContextProviderProps = {
    children: React.ReactNode;
};
type FetchData={
    success: boolean,
    response:[]
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
type SellerContextType = {
    FetchCategory: () => Promise<FetchData>;
    FetchPets: () => Promise<FetchData>;

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

    return <SellerContext.Provider value={{FetchCategory,FetchPets}}>{children}</SellerContext.Provider>;
};
