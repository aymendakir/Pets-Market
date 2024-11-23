"use client"
import { Loader2, Plus, Verified} from "lucide-react";
import {useForm, SubmitHandler} from "react-hook-form"
import { z} from 'zod';
import {zodResolver} from "@hookform/resolvers/zod";
import {

    useContext,
     useRef,
    useState
} from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/Client/UI/select";




import {SellerContext} from "@/Context/SellerContext.tsx";
import {useQuery} from "@tanstack/react-query";
import JoditEditor from 'jodit-react';
import { ImageUploader} from "@/Components/Seller/FunctionCloudinary/AddImage.tsx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Multitext from "@/Components/Seller/UI/InputMultipe.tsx";
import {UploadImage} from "@/Components/Seller/FunctionCloudinary/UploadImage.tsx";
import {ApiContext} from "@/Context/ClientContext.tsx";



const ProductSchema = z.object({
    seller_id: z.number()
        .min(1, { message: "Seller ID must be at least 1" })
        .max(1000, { message: "Seller ID cannot exceed 1000" })
        .optional(),

    title: z.string()
        .min(3, { message: "Title must be at least 3 characters long" })
        .max(100, { message: "Title cannot exceed 100 characters" })
        ,

    description: z.string()
        .min(10, { message: "Description must be at least 10 characters long" })

        ,

    sizes: z.any().optional(),

    price: z.coerce.number()
        .min(0.01, { message: "Price must be at least 0.01" })
        .max(10000, { message: "Price cannot exceed 10000" })
        ,

    stock: z.coerce.number()
        .min(1, { message: "Stock cannot be negative" })
        .max(1000, { message: "Stock cannot exceed 1000" })
        ,

    colors: z.any().optional(),

    Tags: z.array(z.string({ message: "Each tag must be a string" }))
        .min(3, { message: "At least 3 tag is required" }),

    pets: z.string({message: "pets cannot be null"})
        .min(1, { message: "Pets must be at least 3 characters long" })
        .max(50, { message: "Pets cannot exceed 50 characters" })
        ,

    category: z.string({message: "category cannot be null"})
        .min(1, { message: "Category must be at least 3 characters long" })
        .max(50, { message: "Category cannot exceed 50 characters" })
       ,

    Images: z.array(z.instanceof(File, { message: "Each image must be a file" }))
        .min(1, { message: "At least one image is required" }),


});
const colorOptions = [
    {value: "red", label: "Red", color: "#ff0000"},
    {value: "green", label: "Green", color: "#008000"},
    {value: "blue", label: "Blue", color: "#0000ff"},
    {value: "yellow", label: "Yellow", color: "#ffff00"},
    {value: "purple", label: "Purple", color: "#800080"},
];
type ProductSchemaType = z.infer<typeof ProductSchema>;

const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
    height: '320px',
    width: '100%',
    enableDragAndDropFileToEditor: true,
    buttons: [
        'source',
        '|',
        'bold',
        'italic',
        'underline',
        '|',
        'ul',
        'ol',
        '|',
        'font',
        'fontsize',
        'brush',
        'paragraph',
        '|',
        'image',
        'table',
        'link',
        '|',
        'left',
        'center',
        'right',
        'justify',
        '|',
        'undo',
        'redo',
        '|',
        'hr',
        'eraser',
        'fullsize',
    ],
    uploader: { insertImageAsBase64URI: true },
    removeButtons: ['brush', 'file'],
    showXPathInStatusbar: false,
    showCharsCounter: false,
    showWordsCounter: false,
    toolbarAdaptive: false,
    toolbarSticky: true,
    style: {
        background: 'rgb(229 231 235)',
        color: 'black',
       border:"none",
        radius:"20px"
    },
};


export function AddProduct() {
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [ColorsActive, setColorsActive] = useState(false);
    const [SizesActive, setSizesActive] = useState(false);
    const [Size, setSize] = useState<string[]>([]);
    const [Color, setColor] = useState<string[]>([]);
    const [Loading, setLoading] = useState<boolean>(false)
    const ImageDuplicated = () => toast.info("I Notice You Can't Add Duplicated Image!");

const { FetchCategory, FetchPets, NewProduct } = useContext(SellerContext);
const {User}=useContext(ApiContext)

const { data: ListCategory } = useQuery(["ListCategory"], FetchCategory, {
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
    refetchInterval: false,
});
const { data: ListPets } = useQuery(["ListPets"], FetchPets, {
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
    refetchInterval: false,
});
const {data:useData}=useQuery({
        queryKey:["UserData"],
        queryFn:()=>{
            return User()
        },
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false,
        refetchInterval: false,
    })

const ADDSIZEARR = (size: string) => {
    setSize(prevSizes => {
        const updatedSizes = prevSizes.includes(size)
            ? prevSizes.filter(existingSize => existingSize !== size)
            : [...prevSizes, size];
        setValue("sizes", updatedSizes);
        return updatedSizes;
    });
};

const ADDCOLORARR = (color: string) => {
    setColor(prevColor => {
        const updatedColors = prevColor.includes(color)
            ? prevColor.filter(existingColor => existingColor !== color)
            : [...prevColor, color];
        setValue("colors", updatedColors);
        return updatedColors;
    });
};

const handleImage = (imageData: File | null, Name: string | null) => {
    const currentImages = getValues("Images") || [];
    if (imageData === null) {
        setValue("Images", currentImages.filter(image => image.name !== Name));
        return;
    }
    if (currentImages.some(image => image.name === Name)) {
        ImageDuplicated();
        return;
    }
    setValue("Images", [...currentImages, imageData]);
};

const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm<ProductSchemaType>({
    resolver: zodResolver(ProductSchema),
});


    const onSubmit: SubmitHandler<ProductSchemaType> =async (data) => {
        setLoading(true);
        const arr: Promise<string[]> = Promise.all(
            data.Images.map((img) =>
                UploadImage(img, "PetsProduct").then((data) => data.public_id)
            )
        );


        const handleUpload = async () => {
            try {
                const resolvedImages = await arr;

                const serializedImages = resolvedImages.map((file) => ({
                    name: file,
                }));
                const jsonSerializedImages = JSON.stringify(serializedImages);

                const JsonTags=JSON.stringify(getValues("Tags"));
                const JsonSize=JSON.stringify(getValues("sizes"));
                const JsonColors=JSON.stringify(getValues("colors"));

                const dataToSubmit = {
                    ...data,
                    FinaleImages: jsonSerializedImages,
                    tags:JsonTags,
                    colors:JsonColors,
                    sizes:JsonSize,
                    seller_id:useData?.seller.seller_id
                };
                await NewProduct({...dataToSubmit}).then((result)=>{
                    if (result?.status === 201){
                        setLoading(false);

                    }else{
                        setLoading(false);

                    }

                })
            } catch (error) {
                setLoading(false)
                console.error("Error uploading images:", error);
            }
        };

        handleUpload();

    }
    return (
        <main >
            <title>SELLER|NEW PRODUCT</title>
            <ToastContainer />

            <form onSubmit={handleSubmit(onSubmit)} className={""}>
                {Loading&& (
                    <div
                        className={"fixed top-0 left-0 w-full h-full bg-gray-500/60 z-50 flex justify-center items-center"}>
                        <div
                            className={"bg-white rounded-lg w-[300px] h-[200px] flex flex-col justify-center items-center"}>
                            <Loader2 className={"animate-spin"} size={70}/>
                            <p className={"text-lg NexaHeavy"}>Just Wait...!</p>
                        </div>
                    </div>
                )}


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
                            type={"submit"}
                            className={"bg-orange-500 rounded-md flex justify-center items-center gap-5 font-bold text-sm p-2 NexaHeavy text-white"}>
                            <Verified size={30}/>
                            Add Product
                        </button>
                    </div>
                </header>
                <div className={"flex justify-between"}>
                    <div className={"w-[60%] mx-7 mt-10"}>

                        <div className={"bg-gray-100 rounded-lg px-3 py-5 "}>
                            <h1 className={"poppinsblack font-bold text-3xl"}>Generale Information</h1>

                            <div className={" mt-2 poppinsblack ml-2 flex flex-col gap-2"}>
                                <label className={""}>
                                    Name Product
                                </label>
                                <input type="text"
                                       className={"p-3 rounded-md bg-gray-200 font-semibold"} {...register("title")}/>
                                <span className={"text-red-500"}>{errors.title?.message}</span>

                            </div>
                            <div className={"  poppinsblack ml-2 flex flex-col gap-2 mt-4 min-h-[360px]"}>
                                <label className={""}>
                                    Description Product
                                </label>
                                <JoditEditor
                                    className={"bg-gray-300"}
                                    ref={editor}
                                    value={content}
                                    config={
                                        config
                                    }
                                    onChange={newContent => {
                                        setContent(newContent)
                                        setValue("description", newContent)

                                    }}

                                />
                                <span className={"text-red-500"}>{errors.description?.message}</span>

                            </div>
                            <div className={"  poppinsblack ml-2 flex flex-col gap-2 mt-4"}>
                                <label className={""}>
                                    Specifications <span
                                    className={"text-[10px]"}>(If you wanna choice color and size)</span>
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
                                            <span className={"text-red-500"}>{errors?.sizes&&errors?.sizes?.message}</span>

                                        </div>


                                    )}
                                    {ColorsActive && (
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
                                                                ADDCOLORARR(color.label)
                                                            }}/>
                                                        <label htmlFor={color.label}
                                                               className={"p-0.5 rounded-sm border border-gray-300 px-3  peer-checked:border-black font-bold cursor-pointer"}
                                                               style={{backgroundColor: color.color}}></label>

                                                    </div>
                                                ))}

                                            </div>
                                            <span className={"text-red-500"}>{errors.colors?.message}</span>

                                        </div>
                                    )
                                    }

                                </div>

                            </div>
                        </div>
                        <div className={"bg-gray-100 rounded-lg px-3 py-5 mt-5"}>
                            <h1 className={"poppinsblack font-bold text-3xl"}>Pricing And Stock </h1>
                            <div className={"flex items-center w-full gap-4"}>
                                <div className={" mt-4 poppinsblack font-bold ml-2 flex flex-col gap-2 w-1/2"}>
                                    <label className={""}>
                                        Base Pricing
                                    </label>
                                    <input type="number"
                                           className={"p-3 rounded-md bg-gray-200 font-semibold w-full"} {...register("price")}/>
                                    <span className={"text-red-500"}>{errors.price?.message}</span>
                                </div>
                                <div className={" mt-4 poppinsblack font-bold ml-2 flex flex-col gap-2 w-1/2"}>
                                    <label className={""}>
                                        STOCK
                                    </label>
                                    <input type="number"
                                           className={"p-3 rounded-md bg-gray-200 font-semibold "} {...register("stock")}/>
                                    <span className={"text-red-500"}>{errors.stock?.message}</span>

                                </div>

                            </div>
                            <div className={" mt-4 poppinsblack font-bold ml-2 flex flex-col gap-2 w-full"}>
                                <label className={""}>
                                    Tags
                                </label>
                                <Multitext defaultValue={undefined} placeholder={"Tags"} inputClassName={undefined}
                                           ValueClassName={undefined} DateValue={function (Data: string[]) {
                                    setValue("Tags", Data)
                                }}/>
                                <span className={"text-red-500"}>{errors.Tags?.message}</span>
                            </div>

                        </div>

                    </div>
                    <div className={"w-[40%] mr-7 mt-10 "}>
                        <div className={"bg-gray-100 rounded-lg px-3 py-5"}>
                            <h1 className={"poppinsblack font-bold text-3xl"}>Upload Images</h1>
                            <div className={"mt-4"}>
                                <div
                                    className={"relative w-[90%] mx-auto border-4 border-dashed border-orange-500 rounded-lg h-[320px] flex items-center justify-center"}>
                                    <Plus size={40} className={"text-orange-400"}/>
                                    <ImageUploader onImageChange={handleImage}/>
                                </div>
                                <div>
                                    <div className={"flex items-center gap-3 mt-5"}>
                                        <div
                                            className={"relative w-[30%] mx-auto border border-dashed border-orange-500 rounded-lg h-[130px] flex items-center justify-center"}>
                                            <Plus size={40} className={"text-orange-400"}/>
                                            <ImageUploader onImageChange={handleImage}/>

                                        </div>
                                        <div
                                            className={"relative w-[30%] mx-auto border-2 border-dashed border-orange-500 rounded-lg h-[130px] flex items-center justify-center"}>
                                            <Plus size={40} className={"text-orange-400"}/>
                                            <ImageUploader onImageChange={handleImage}/>
                                        </div>
                                        <div
                                            className={"relative w-[30%] mx-auto border-2 border-dashed border-orange-500 rounded-lg h-[130px] flex items-center justify-center"}>
                                            <Plus size={40} className={"text-orange-400"}/>
                                            <ImageUploader onImageChange={handleImage}/>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <span className={"text-red-500"}>{errors.Images?.message}</span>

                        </div>
                        <div className={"bg-gray-100 rounded-lg px-3 py-5 mt-5"}>
                            <h1 className={"poppinsblack font-bold text-3xl"}>Category And Pet</h1>
                            <div className={"mt-4 poppinsblack font-bold ml-2 flex flex-col gap-2"}>
                                <label className={""}>
                                    Category
                                </label>
                                <Select onValueChange={data => setValue("category", data)}>
                                    <SelectTrigger className="p-3 rounded-md bg-gray-200 font-semibold ">
                                        <SelectValue placeholder="Category"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {ListCategory?.success ? ListCategory.response.map((Category: {
                                            Category_id: number;
                                            category_name: string;
                                            Category_image: string | undefined
                                        }) => (
                                            <SelectItem key={Category.Category_id}
                                                        value={Category.category_name}>{Category.category_name}</SelectItem>

                                        )) : (
                                            <SelectItem defaultValue={"Loading..."}
                                                        value={"Loading..."}>Loading...</SelectItem>

                                        )}

                                    </SelectContent>
                                </Select>
                                <span className={"text-red-500"}>{errors.category?.message}</span>

                            </div>
                            <div className={"mt-4 poppinsblack font-bold ml-2 flex flex-col gap-2"}>
                                <label className={""}>
                                    Pet
                                </label>
                                <Select onValueChange={data => setValue("pets", data)}>
                                    <SelectTrigger className="p-3 rounded-md bg-gray-200 font-semibold   ">
                                        <SelectValue placeholder="Pets" className="text-gray-500"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {ListPets?.success ? ListPets.response.map((Pets: {
                                            Pets_id: number;
                                            Pets_name: string;
                                            Pet_image: string | undefined
                                        }) => (
                                            <SelectItem key={Pets.Pets_id}
                                                        value={Pets.Pets_name}>{Pets.Pets_name}</SelectItem>

                                        )) : (
                                            <SelectItem defaultValue={"Loading..."}
                                                        value={"Loading..."}>Loading...</SelectItem>

                                        )}

                                    </SelectContent>
                                </Select>
                                <span className={"text-red-500"}>{errors.pets?.message}</span>

                            </div>
                            <div className={"mt-4 poppinsblack font-bold ml-2 flex flex-col gap-2"}>
                                <label className={""}>
                                    Brand
                                </label>
                                <Select>
                                    <SelectTrigger className="p-3 rounded-md bg-gray-200 font-semibold ">
                                        <SelectValue placeholder="Sort By Latest"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Sort By Latest">Sort By Latest</SelectItem>
                                        <SelectItem value="Sort By Popular">Sort By Popular</SelectItem>
                                        <SelectItem value="Sort By Min Price">
                                            Sort By Min Price
                                        </SelectItem>
                                    </SelectContent>
                                </Select>

                            </div>

                        </div>
                    </div>

                </div>

            </form>
        </main>
    );
}
