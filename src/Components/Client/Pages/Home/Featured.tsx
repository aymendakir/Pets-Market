import CardProduct from "@/Components/Client/UI/CardProduct.tsx";
import {useContext} from "react";
import {ApiContext} from "@/Context/ClientContext.tsx";
import {useQuery} from "@tanstack/react-query";
import image from "@/assets/Images/wp7874460-christmas-animal-wallpapers.jpg"
import imageTwo from "@/assets/Images/2168459-2121x1414-desktop-hd-halloween-pets-wallpaper-photo.jpg"

function Featured() {
    const {FetchProducts}=useContext(ApiContext)
    const {data:ListProduct}=useQuery({
        queryKey:["AllProduct"],
        queryFn: ()=>{
            return  FetchProducts()
        },
        refetchOnWindowFocus:false,
        refetchIntervalInBackground:false,
        refetchInterval:false

    })

    return (
        <main className="mt-10 w-[90%] mx-auto min-h-[60vh] my-4">
            <h1 className="text-start  text-3xl text-black/90 uppercase poppinsblack">The Pack Selection</h1>
            <section className={"flex justify-between items-start min-h-[55vh] gap-4 mt-12"}>
                <div className={"bg-gray-200 rounded-xl h-[380px]  w-1/2 "}>
                    <img src={image} alt={"dog santa"} className={"w-full h-full rounded-xl"}/>
                </div>
                <div className="grid grid-cols-2 max-md:grid-cols-1 justify-items-center gap-7 ">
                    {ListProduct?.success && ListProduct.response.slice(0,2).map((product, index) => (
                        <CardProduct key={index} data={product}/>

                    ))}
                </div>
            </section>
            <section className={"flex flex-row-reverse justify-between items-start min-h-[55vh] gap-4 mt-12"}>
                <div className={"bg-gray-200 rounded-lg h-[380px]  w-1/2 "}>
                    <img src={imageTwo} alt={"hallowed pets"} className={"w-full h-full rounded-lg"}/>
                </div>
                <div className="grid grid-cols-2 max-md:grid-cols-1 justify-items-center gap-7 ">
                    {ListProduct?.success && ListProduct.response.slice(2,4).map((product, index) => (
                        <CardProduct key={index} data={product}/>

                    ))}
                </div>
            </section>

        </main>
    );
}

export default Featured;
