import {Aside} from "@/Components/Seller/Pages/Aside.tsx";
import {EllipsisVertical, EyeOff, Layers, NotepadTextDashed, PenOff, Plus, ScanEye, Star} from "lucide-react";
import {useContext} from "react";
import {SellerContext} from "@/Context/SellerContext.tsx";
import {useQuery} from "@tanstack/react-query";
import { Image,Transformation } from 'cloudinary-react';
import {Link} from "react-router-dom";


export function ProductSeller() {
    const {FetchProducts}=useContext(SellerContext)
    const {data:ListProduct}=useQuery({
        queryKey:["ListProduct"],
        queryFn: ()=>{
           return  FetchProducts()
        },
        refetchOnWindowFocus:false,
        refetchIntervalInBackground:false,
        refetchInterval:false

    })

    return (
        <main className={"w-full"} >

            <div className={""}>

                <header className={"flex justify-between items-center mx-7"}>
                    <div className={"flex flex-col justify-between items-start"}>
                        <h1 className={"NexaHeavy text-3xl"}>Products</h1>
                        <p className={"text-black/50"}>Let's grow to your business Create your product and upload
                            here</p>
                    </div>
                    <Link to={"/Seller/Product/New"}>
                        <button
                            className={"bg-orange-500 rounded-md flex justify-center items-center gap-5 font-bold text-sm p-2 NexaHeavy text-white"}>
                            <Plus size={30}/>Create item
                        </button>
                    </Link>
                </header>
                <section
                    className={"relative mt-10 w-full h-[70px]  after:absolute after:top-0 after:left-0 after:w-full after:h-0.5 after:bg-gray-100 before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 before:bg-gray-200"}>
                    <ul className={"flex items-center h-full w-full  gap-20 justify-center"}>
                        <li className={"relative inline-flex justify-center items-center gap-2 poppinsblack font-bold text-xl text-orange-500 after:absolute after:bottom-0 after:left-0 after:h-1 after:w-full after:bg-orange-500 h-full after:rounded-full"}>
                            <Layers/>Published
                        </li>
                        <li className={"relative inline-flex justify-center items-center gap-2 poppinsblack font-bold text-xl   h-full after:rounded-full"}>
                            <NotepadTextDashed/>Draft
                        </li>
                        <li className={"relative inline-flex justify-center items-center gap-2 poppinsblack font-bold text-xl h-full after:rounded-full"}>
                            <EyeOff/>Hidden
                        </li>
                        <li className={"relative inline-flex justify-center items-center gap-2 poppinsblack font-bold text-xl  h-full after:rounded-full"}>
                            <PenOff/>Rejected
                        </li>
                        <li className={"relative inline-flex justify-center items-center gap-2 poppinsblack font-bold text-xl  h-full after:rounded-full"}>
                            <ScanEye/>Under Review
                        </li>
                    </ul>
                </section>
                <table className="w-full mx-auto mt-20 poppinsblack uppercase text-xl overflow-hidden">
                    <thead
                        className="relative after:absolute after:-bottom-3 after:left-8 after:w-[90%] after:h-0.5 after:bg-gray-200">
                    <tr>
                        <th scope="col">Product Name</th>
                        <th scope="col">Pricing</th>
                        <th scope="col">Stock</th>
                        <th scope="col">Rating</th>
                        <th scope="col">Option</th>
                    </tr>
                    </thead>
                    <tbody>
                    {ListProduct?.success&&ListProduct.response.map((product,index)=> (
                        <tr key={index} className={"h-[120px]"}>
                            <td className="w-[420px] ">
                                <div className="w-[420px] h-[120px] flex mt-10 gap-5">
                                    <div className=" !w-[200px] !h-[120px] ml-10 rounded-lg">
                                        <Image cloudName={import.meta.env.VITE_REACT_APP_CLOUDINARY_CLOUD_NAME} publicId={product.Images[0].name} className={"rounded-lg"}  >
                                            <Transformation crop="scale" width="200"  height="120" />
                                        </Image>

                                    </div>
                                    <div className=" ">
                                        <h1 className={"max-w-[170px] "}>{product.title}</h1>
                                        <p className="text-sm mt-2 max-w-[170px]">Category</p>
                                    </div>
                                </div>
                            </td>
                            <td className=" text-center">${product.price}</td>
                            <td className="text-center">{product.stock}</td>
                            <td className="h-[160px] w-full flex justify-center items-center gap-2 ">4.9/5 <Star
                                className={"text-yellow-300"}/></td>
                            <td className="translate-x-1/2"><EllipsisVertical /></td>
                        </tr>

                    ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}
