import {toast, ToastContainer} from "react-toastify";
import HeaderNav from "@/Components/Client/Pages/Home/HeaderNav.tsx";
import {Loader} from "lucide-react";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import Footer from "@/Components/Client/Pages/Home/Footer.tsx";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {useContext, useState} from "react";
import {SellerContext} from "@/Context/SellerContext.tsx";
const SellersShema = z.object({


    Store_name: z.string()
        .min(3, { message: "Store_name must be at least 10 characters long" })
        .max(10, { message: "Store_name must not exceed 128 characters" }),

    Bio: z
        .string()
        .min(10, { message: "bio must be at least 10 characters long" })
        .max(128, { message: "bio must not exceed 128 characters" })
,
    telephone: z
        .coerce.number()
        .min(10, { message: "telephone must be at least 10 characters long" })






});
type SellerShemaType = z.infer<typeof SellersShema>;

export function AddStore() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const seller_id:number = Number(queryParams.get('seller_id'));


    const {CreateStore}=useContext(SellerContext)
    const navigate=useNavigate()
    const { register, handleSubmit, formState: { errors,submitCount } } = useForm<SellerShemaType>({
        resolver: zodResolver(SellersShema),
    });

    const onSubmit: SubmitHandler<SellerShemaType> =async (data) => {
        setIsLoading(true)

        CreateStore({...data, seller_id}).then(data=>{
                if (data.success) {
                    setIsLoading(false)
                    navigate("/Seller/Dashboard")
                    return toast.error(data.message);
                }
                else{
                    setIsLoading(false)

                    return toast.done(data.message);
                }
            }
        ).catch(()=>{
            setIsLoading(false)

        })
    }

    return (
       <main>
           <title>PEST|STORE Customization</title>
           <ToastContainer position="top-center" limit={1} />


           <section className={"flex flex-col justify-center items-center h-[80vh] w-[60%] mx-auto"}>
               <h1 className={"text-5xl uppercase poppinsblack font-bold text-orange-950"}>Store Customization</h1>
               <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col items-start justify-start  w-[50%] mt-10 gap-5"}>
                   <input type={"text"} placeholder={"Store_name"}
                          {...register("Store_name") }
                          className={"p-2 border-gray-100 border rounded-lg poppinsblack font-bold capitalize focus:!border-gray-300 w-[100%]"}/>
                   {errors.Store_name&&(<span className={"text-red-400"}>{errors.Store_name.message}</span>)}

                   <input type={"text"} placeholder={"bio"}
                          {...register("Bio") }
                          className={"p-2 border-gray-100 border rounded-lg poppinsblack font-bold capitalize focus:!border-gray-300 w-[100%]"}/>
                   {errors.Bio&&(<span className={"text-red-400"}>{errors.Bio.message}</span>)}
                   <input type={"tel"} placeholder={"telephone"}
                          {...register("telephone") }
                          className={"p-2 border-gray-100 border rounded-lg poppinsblack font-bold capitalize focus:!border-gray-300 w-[100%]"}/>
                   {errors.telephone&&(<span className={"text-red-400"}>{errors.telephone.message}</span>)}


                   <button disabled={submitCount>5 || isLoading} type={"submit"} className={"w-full mt-5 bg-orange-400 rounded-lg p-2 uppercase text-white disabled:bg-gray-200 inline-flex justify-center items-center gap-4 "}>
                       {isLoading&&(

                           <Loader className={"animate-spin"} />)}
                       Finish
                   </button>

               </form>
           </section>

       </main>
    );
}
