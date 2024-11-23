import {createContext, useCallback} from "react";
import axios from "axios";

type ApiContextProviderProps = {
  children: React.ReactNode;
};

type Product = {
  seller_id: number|undefined;
  title: string;
  description?: string;
  price: number;
  FinaleImages: string[];
  stock: number;
  colors?: string[]|null;
  sizes?: string[]|null;
  category: string;
  pets?: string[];
  tags?: string[];
  Images:{name:string}[]
};
type Category = {
  category_id: number;
  category_name: string;
  Category_image: string;
  product_count:number|string

}
type Pets = {
  pet_id: number;
  Pets_name: string;

  Pet_image: {name:string}[];

};
type FetchDataCategory={
  success: boolean,
  response:[Category]
}
type FetchDataPets={
  success: boolean,
  response:[Pets]
}
type FetchDataProduct={
  success: boolean,
  response:[Product]
}
type users={
  name:string,
  email:string,
  password:string,
  role:string
}
type usersSignIn={
  email:string,
  password:string,
}
type User ={
  name: string;
  email: string;
  image: string;
  role: string;
}
type Seller ={
  seller_id: number,
  user_id: number,
  Store_name: string|null,
  Bio: string|null,
  telephone: string|null,
  Rating: string|null,
}
type usersData={
  status: number;
  message: number;
  token: string;
  success:boolean,
  result:{user:User},
  user:User,
  seller:Seller


}
type ApiContextType = {
  FetchCategory: () => Promise<FetchDataCategory>;
  FetchPets: () => Promise<FetchDataPets>;
  FetchProducts: () => Promise<FetchDataProduct>;
  FetchProduct: (id:number) => Promise<Product>;
SignUp:(data:users)=>Promise<usersData>
SignIn:(data:usersSignIn)=>Promise<usersData>
  User:()=>Promise<usersData>
};

export const ApiContext = createContext({} as ApiContextType);
const url ="http://localhost:3001"

export const ApiContextProvider = ({ children }: ApiContextProviderProps) => {
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
  const FetchProduct = useCallback(async (id: number) => {
    const results = await axios.get(`${url}/Product/${id}`);
    return results.data.response[0];
  }, []);
  const SignUp=async(data: users)=>{
const results = await axios.post(`${url}/user/SignUp`,data);
return results.data;
  }
  const SignIn=async(data: usersSignIn)=>{
const results = await axios.post(`${url}/user/SignIn`,data,{
  withCredentials: true,
});
return results.data;
  }
  const User=async()=>{
const results = await axios.get(`${url}/user`,{
  withCredentials: true,
});
return results.data;
  }

  return <ApiContext.Provider value={{FetchCategory,FetchPets,FetchProducts,FetchProduct,SignUp,SignIn,User}}>{children}</ApiContext.Provider>;
};
