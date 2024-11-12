import { createContext } from "react";

type ApiContextProviderProps = {
  children: React.ReactNode;
};
type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
};
type ApiContextType = {
  fetchProducts: () => Promise<Product[]>;
};

export const ApiContext = createContext({} as ApiContextType);

export const ApiContextProvider = ({ children }: ApiContextProviderProps) => {
  const fetchProducts = async () => {
    // Simulate an API call
    return []; // Replace with actual fetching logic
  };

  return <ApiContext.Provider value={{}}>{children}</ApiContext.Provider>;
};
