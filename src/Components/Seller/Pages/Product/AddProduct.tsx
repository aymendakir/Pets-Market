import {Aside} from "@/Components/Seller/Pages/Aside.tsx";
import {Plus, Verified} from "lucide-react";
import {useForm, SubmitHandler} from "react-hook-form"
import { z } from 'zod';
import {zodResolver} from "@hookform/resolvers/zod";
import {useState} from "react";


const ProductSchema = z.object({
    seller_id: z.number(),
    title: z.string(),
    description: z.string(),
    sizes: z.union([z.array(z.string()), z.boolean()]),
    price: z.number(),
    stock: z.number(),
    colors: z.union([z.array(z.string()), z.boolean()]),
    Tags: z.array(z.string()),
    pets: z.number(),
    category: z.number(),
    Images: z.array(z.string()),
});
const colorOptions = [
    { value: "red", label: "Red", color: "#ff0000" },
    { value: "green", label: "Green", color: "#008000" },
    { value: "blue", label: "Blue", color: "#0000ff" },
    { value: "yellow", label: "Yellow", color: "#ffff00" },
    { value: "purple", label: "Purple", color: "#800080" },
];
type ProductSchemaType = z.infer<typeof ProductSchema>;


export function AddProduct() {


    const [ColorsActive, setColorsActive] = useState(false);
    const [SizesActive, setSizesActive] = useState(false)
    const [Size, setSize] = useState<string[]>([]);
    const ADDSIZEARR = (size: string) => {
        setSize((prevSizes) => {
            const updatedSizes = prevSizes.includes(size)
                ? prevSizes.filter((existingSize) => existingSize !== size)
                : [...prevSizes, size];

            setValue("sizes", updatedSizes);

            return updatedSizes;
        });
    };

    const { register, handleSubmit,setValue,getValues } = useForm<ProductSchemaType>({ resolver: zodResolver(ProductSchema) })
    const onSubmit: SubmitHandler<ProductSchemaType> = (data) => console.log(data)

    return (
        <main className={"flex"}>
            <div className={"w-[20%]"}>
                <Aside/>
            </div>
            <div className={"w-[80%] mt-10"}>
                <header className={"flex justify-between items-center mx-7"}>
                    <div className={"flex flex-col justify-between items-start"}>
                        <h1 className={"NexaHeavy text-3xl"}>Add Product</h1>
                        <p className={"text-black/50"}>Let's grow to your business Create your product and upload
                            here</p>
                    </div>
                    <div className={"flex justify-center items-center gap-7"}>
                        <button
                            className={" rounded-md border border-gray-400 flex justify-center items-center gap-5 font-bold text-sm p-2 NexaHeavy text-white"}>
                            <Verified size={30}/>Save Draf
                        </button>
                        <button
                            className={"bg-orange-500 rounded-md flex justify-center items-center gap-5 font-bold text-sm p-2 NexaHeavy text-white"}>
                            <Verified size={30}/>Add Product
                        </button>
                    </div>
                </header>
                <form onSubmit={handleSubmit(onSubmit)}  className={"flex justify-between"}>
                    <div className={"w-[60%] mx-7 mt-10"}>
                        <div className={"bg-gray-100 rounded-lg px-3 py-5 "}>
                            <h1 className={"poppinsblack font-bold text-3xl"}>Generale Information</h1>

                            <div className={" mt-2 poppinsblack ml-2 flex flex-col gap-2"}>
                                <label className={""}>
                                    Name Product
                                </label>
                                <input type="text" className={"p-3 rounded-md bg-gray-200 font-semibold"}/>
                            </div>
                            <div className={"  poppinsblack ml-2 flex flex-col gap-2 mt-4"}>
                                <label className={""}>
                                    Description Product
                                </label>
                                <input type="text" className={"p-3 h-[220px] rounded-md bg-gray-200 font-semibold"}/>
                            </div>
                            <div className={"  poppinsblack ml-2 flex flex-col gap-2 mt-4"}>
                                <label className={""}>
                                    Specifications
                                </label>
                                <div className={"flex gap-3"}
                                >
                                    <div className="flex">
                                        <input type="checkbox" id="choose-me" className="peer hidden" onClick={() => {
                                            setSizesActive(!SizesActive)
                                        }}/>
                                        <label htmlFor="choose-me" className="select-none cursor-pointer rounded-lg border-2 border-gray-200
   py-3 px-6 font-bold text-gray-400 transition-colors duration-200 ease-in-out peer-checked:bg-gray-200 peer-checked:text-gray-900 peer-checked:border-gray-200 "> SIZES </label>
                                    </div>
                                    <div className="flex">
                                        <input type="checkbox" id="color" className="peer hidden" onClick={() => {
                                            setColorsActive(!ColorsActive)
                                        }}/>
                                        <label htmlFor="color" className="select-none cursor-pointer rounded-lg border-2 border-gray-200
   py-3 px-6 font-bold text-gray-400 transition-colors duration-200 ease-in-out peer-checked:bg-gray-200 peer-checked:text-gray-900 peer-checked:border-gray-200 "> Colors </label>
                                    </div>
                                </div>
                                <div className={"flex justify-between items-center"}>
                                {SizesActive && (

                                        <div className={"mt-5"}>
                                            <label className={""}>
                                                Size
                                            </label>
                                            <div className={"mt-3 flex flex-wrap gap-5"}>
                                                <div>
                                                    <input type="checkbox" id="S" className="peer hidden"
                                                           onClick={() => {
                                                               ADDSIZEARR("S")
                                                           }}/>
                                                    <label htmlFor="S"
                                                           className={"p-2 rounded-sm border border-gray-300 px-3 peer-checked:bg-orange-500 peer-checked:text-white font-bold"}>S</label>
                                                </div>
                                                <div>
                                                    <input type="checkbox" id="M" className="peer hidden"
                                                           onClick={() => {
                                                               ADDSIZEARR("M")
                                                           }}/>
                                                    <label htmlFor="M"
                                                           className={"p-2 rounded-sm border border-gray-300 px-3 peer-checked:bg-orange-500 peer-checked:text-white font-bold"}>M</label>

                                                </div>
                                                <div>
                                                    <input
                                                        type="checkbox" id="XL" className="peer hidden" onClick={() => {
                                                        ADDSIZEARR("XL")
                                                    }}/>
                                                    <label htmlFor="XL"
                                                           className={"p-2 rounded-sm border border-gray-300 px-3 peer-checked:bg-orange-500 peer-checked:text-white font-bold"}>XL</label>

                                                </div>
                                                <div>
                                                    <input
                                                        type="checkbox" id="XLL" className="peer hidden"
                                                        onClick={() => {
                                                            ADDSIZEARR("XLL")
                                                        }}/>
                                                    <label htmlFor="XLL"
                                                           className={"p-2 rounded-sm border border-gray-300 px-3 peer-checked:bg-orange-500 peer-checked:text-white font-bold"}>XLL</label>

                                                </div>

                                            </div>
                                        </div>


                                )}
                                    {ColorsActive&& (
                                        <div className={"mt-5"}>
                                            <label className={""}>
                                                COLORS
                                            </label>

                                            <div className={"mt-3 flex items-center gap-5"}>

                                                {colorOptions.map((color, index) => (
                                                    <div key={index} className={"cursor-pointer"}>
                                                        <input
                                                            type="checkbox" id={color.label} className="peer hidden"
                                                            onClick={() => {
                                                                ADDSIZEARR(color.label)
                                                            }}/>
                                                        <label htmlFor={color.label}
                                                               className={"p-0.5 rounded-sm border border-gray-300 px-3  peer-checked:border-black font-bold cursor-pointer"}
                                                               style={{backgroundColor: color.color}}></label>

                                                    </div>
                                                ))}

                                            </div>
                                        </div>
                                    )
                                    }

                                </div>

                            </div>
                        </div>
                        <div className={"bg-gray-100 rounded-lg px-3 py-5"}>
                            <h1 className={"poppinsblack font-bold text-3xl"}>Pricing And Stock</h1>
                            <div className={"flex items-center w-full gap-4"}>
                                <div className={" mt-4 poppinsblack font-bold ml-2 flex flex-col gap-2 w-1/2"}>
                                    <label className={""}>
                                        Base Pricing
                                    </label>
                                    <input type="number" className={"p-3 rounded-md bg-gray-200 font-semibold w-full"}/>
                                </div>
                                <div className={" mt-4 poppinsblack font-bold ml-2 flex flex-col gap-2 w-1/2"}>
                                    <label className={""}>
                                        STOCK
                                    </label>
                                    <input type="number" className={"p-3 rounded-md bg-gray-200 font-semibold "}/>
                                </div>
                            </div>

                        </div>

                    </div>
                    <div className={"w-[40%] mr-7 mt-10 bg-gray-100 rounded-lg px-3 py-5"}>
                        <h1 className={"poppinsblack font-bold text-3xl"}>Upload Images</h1>
                        <div className={"mt-4"}>
                            <div  className={"relative w-[90%] mx-auto border-4 border-dashed border-orange-500 rounded-lg h-[320px] flex items-center justify-center"}> <Plus size={40} className={"text-orange-400"} />
                                <input type="file" accept={"image/*"} className={"absolute w-full h-full cursor-pointer opacity-0"}/></div>
                            <div>
                                <div className={"flex items-center gap-3 mt-5"}>
                                    <div
                                        className={"relative w-[30%] mx-auto border-2 border-dashed border-orange-500 rounded-lg h-[130px] flex items-center justify-center"}>
                                        <Plus size={40} className={"text-orange-400"}/>
                                        <input type="file" accept={"image/*"}
                                               className={"absolute w-full h-full cursor-pointer opacity-0"}/></div>
                                    <div
                                        className={"relative w-[30%] mx-auto border-2 border-dashed border-orange-500 rounded-lg h-[130px] flex items-center justify-center"}>
                                        <Plus size={40} className={"text-orange-400"}/>
                                        <input type="file" accept={"image/*"}
                                               className={"absolute w-full h-full cursor-pointer opacity-0"}/></div>
                                    <div
                                        className={"relative w-[30%] mx-auto border-2 border-dashed border-orange-500 rounded-lg h-[130px] flex items-center justify-center"}>
                                        <Plus size={40} className={"text-orange-400"}/>
                                        <input type="file" accept={"image/*"}
                                               className={"absolute w-full h-full cursor-pointer opacity-0"}/></div>
                                </div>

                            </div>
                        </div>

                    </div>

                </form>

            </div>
        </main>
    );
}
