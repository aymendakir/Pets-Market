import React, { createContext, useContext, useEffect, useState } from "react";

type CartContextProviderProps = {
    children: React.ReactNode;
};
type Product = {
    product_id: number;
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
type CartContextType = {
    CartAddRemove: (data: Product) => void;
    DataCart:Product[];
    dataCart:()=>void;
    CheckColorCart:(id:number) => string,
    CheckSizeCart:(id:number) => string,
    ChoiseSize: (id: number, Size:string) => void;
    ChoiseColor: (id: number, Size:string) => void;
    FinalProduct:Product[],
    finalProduct:()=>void

};


export const AuthContextCart = createContext({} as CartContextType);
export const AuthProviderCart = ({ children }:CartContextProviderProps) => {
    const [DataCart, setDataCart] = useState<Product[]>([]);
    const [FinalProduct, setFinalProduct] = useState<Product[]>([]);
    useEffect(() => {
        const cartData = JSON.parse(localStorage.getItem("CartProduct") as string);
        sessionStorage.setItem("FinalProduct", JSON.stringify(cartData));

        setDataCart(cartData);
    }, []);

    const finalProduct = () => {
        let products
        const cartData:string|null = sessionStorage.getItem("FinalProduct");
        if (typeof cartData === "string") {
             products = JSON.parse(cartData);
        }
        setFinalProduct(products);
    };
    function CartAddRemove(data:Product) {
        let products = [];

        // Retrieve existing cart data from localStorage
        const cartData = localStorage.getItem("CartProduct");

        // Ensure the existing cart data is valid
        if (cartData) {
            try {
                products = JSON.parse(cartData); // Parse existing cart data
            } catch (e) {
                console.error("Error parsing cart data", e);
            }
        }

        // Find if the product exists in the cart
        const existingProductIndex = products.findIndex(
            (product: { product_id: number; }) => product.product_id === data.product_id
        );

        if (existingProductIndex !== -1) {
            // If product exists, remove it
            products = products.filter((product: { product_id: number; }) => product.product_id !== data.product_id);
        } else {
            products.push(data);
        }
        setDataCart(products);

        localStorage.setItem("CartProduct", JSON.stringify(products));
        sessionStorage.setItem("FinalProduct", JSON.stringify(products));
        finalProduct();
    }

    function dataCart() {
        const cartData = JSON.parse(localStorage.getItem("CartProduct") as string);
        setDataCart(cartData);
    }
    function ChoiseColor(id: number, color:string) {
        let products = [];
        const cartData = sessionStorage.getItem("FinalProduct");
        if (typeof cartData === "string") {
            products = JSON.parse(cartData);
        }
        const existingProductIndex = products?.findIndex(
            (product: { product_id: number; }) => product.product_id === id
        );
        if (existingProductIndex !== -1) {
            products[existingProductIndex].colors = color;
        }
        sessionStorage.setItem("FinalProduct", JSON.stringify(products));
        CheckColorCart(id);
        finalProduct();
    }
    function CheckColorCart(id:number) {
        const cartData = sessionStorage.getItem("FinalProduct");

        // Check if cartData exists and parse it
        if (!cartData) {
            return null;
        }
        const products = JSON.parse(cartData);
        const product = products.find((product: { product_id: number; }) => product.product_id === id);

        return product ? product.colors : null;
    }
    function ChoiseSize(id: number, Size:  string ) {
        let products = [];
        const cartData = sessionStorage.getItem("FinalProduct");
        if (typeof cartData === "string") {
            products = JSON.parse(cartData);
        }
        const existingProductIndex = products.findIndex(
            (product: { product_id: number; }) => product.product_id === id
        );
        if (existingProductIndex !== -1) {
            products[existingProductIndex].sizes = Size;
        }
        sessionStorage.setItem("FinalProduct", JSON.stringify(products));
        CheckColorCart(id);
        finalProduct();
    }
    function CheckSizeCart(id:number) {
        const cartData = sessionStorage.getItem("FinalProduct");

        // Check if cartData exists and parse it
        if (!cartData) {
            return null;
        }

        const products = JSON.parse(cartData);

        // Find the product by id and return its color if it exists
        const product = products.find((product: { product_id: number; }) => product.product_id === id);

        return product ? product.sizes : null;
    }

    return (
        <AuthContextCart.Provider
            value={{
                CheckColorCart,
                CheckSizeCart,
                ChoiseSize,
                ChoiseColor,
                dataCart,
                CartAddRemove,
                DataCart,
                FinalProduct,
                finalProduct,
            }}
        >
            {children}
        </AuthContextCart.Provider>
    );
};
export default function useAuthContextCart() {
    return useContext(AuthContextCart);
}
