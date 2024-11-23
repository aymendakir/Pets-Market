import {Check, Eye, ShoppingCart} from "lucide-react";
// @ts-ignore
import { Image } from 'cloudinary-react';
import ReactStars from 'react-stars'
import {Link} from "react-router-dom";
import {useContext} from "react";
import {AuthContextCart} from "@/Context/CartContext.tsx";

type Product = {
    seller_id: number | undefined;
    product_id: number ;
    title: string;
    description?: string;
    price: number;
    FinaleImages: string[];
    stock: number;
    colors?: string[] | null;
    sizes?: string[] | null;
    category: string;
    pets?: string[];
    tags?: string[];
    Images: { name: string }[];
};

type CardFeaturedProps = {
    data: Product;
};
export default function CardProduct({data}: Readonly<CardFeaturedProps>) {
    const {CartAddRemove,DataCart}=useContext(AuthContextCart)
    const checkproduct = () => {
        return (
            DataCart?.findIndex((product) => Number(product?.product_id) === data?.product_id) !== -1
        );
    };

    return (
        <section className="w-[280px] h-[380px]  bg-white  rounded-[10px] relative card shadow-md shadow-gray-100"
        >
            <div className="image w-full h-[68%] bg-white rounded-t-[10px]  shadow-sm shadow-gray-100 relative overflow-hidden">
                <Image cloudName={import.meta.env.VITE_REACT_APP_CLOUDINARY_CLOUD_NAME} publicId={data?.Images[0]?.name}
                       className={`absolute left-0 top-0 rounded-[10px] w-full h-full ${data?.Images[1]&&"image-one"}`}/>
                {data?.Images[1]&&(
                    <Image cloudName={import.meta.env.VITE_REACT_APP_CLOUDINARY_CLOUD_NAME} publicId={data?.Images[1]?.name}
                           className={" absolute rounded-[10px] w-full h-full image-two"}/>
                )}

            </div>
            <div className={"absolute top-1/4 right-3 h-full card-option"}>
                <Link to={{
                          pathname: `/Product/${data?.title}`,
                          search: `id=${data?.product_id}`,
                      }} className={"bg-orange-200/70 rounded-lg w-[30px] h-[30px] flex justify-center items-center"}>
                    <Eye/>
                </Link>
                <p onClick={()=>{
                    CartAddRemove(data)
                }} className={` rounded-lg w-[30px] h-[30px] flex justify-center items-center mt-2 ${checkproduct()?"bg-green-200/70":"bg-orange-200/70"}`}>
                    {checkproduct()?(
                        <Check />
                    ):(
                        <ShoppingCart/>
                        
                    )}
                </p>

            </div>
            <div className="mt-2 flex flex-col justify-center  ">
                <div className="flex justify-between items-center mx-2">
                    <h1 className="text-lg font-semibold poppinsblack ">{data?.title}</h1>

                </div>
                <ReactStars className={"mx-2 -mt-2"}
                    count={5}
                            value={4}
                            edit={false}
                size={25}
                />
                <p className="poppinsblack text-black/80 text-sm mx-2 font-semibold ">${data?.price}</p>
            </div>
        </section>
    );
}
