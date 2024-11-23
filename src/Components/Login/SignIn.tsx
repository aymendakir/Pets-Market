import HeaderNav from "@/Components/Client/Pages/Home/HeaderNav.tsx";
import Footer from "@/Components/Client/Pages/Home/Footer.tsx";
import {Link, useNavigate} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {useContext, useEffect, useState} from "react";
import {ApiContext} from "@/Context/ClientContext.tsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Loader} from "lucide-react";
import {useQuery} from "@tanstack/react-query";
import {Loading} from "@/Components/Loading/Loading.tsx";
const UsersShema = z.object({


    email: z.string().email(),

    password: z
        .string()
        .min(10, { message: "Password must be at least 10 characters long" })
        .max(128, { message: "Password must not exceed 128 characters" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
        .regex(/[0-9]/, { message: "Password must contain at least one number" })
        .regex(/[@$!%*?&]/, { message: "Password must contain at least one special character (@$!%*?&)" }),




});
type UsersShemaType = z.infer<typeof UsersShema>;

export default function SignIn()
{
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate=useNavigate()
    const {SignIn,User}=useContext(ApiContext)
    const { register, handleSubmit, formState: { errors,submitCount } } = useForm<UsersShemaType>({
        resolver: zodResolver(UsersShema),
    });
    const { data: useData, isLoading:UserLoading } = useQuery({
        queryKey: ['CheckUser'],
        queryFn: () => User(),
        refetchInterval:false,
        refetchIntervalInBackground:false,
        refetchOnWindowFocus:false,
        refetchOnMount:false,
        retry:false,
        retryOnMount:false
    });
    useEffect(() => {
if (useData?.success){
    navigate("/")
}
    }, [ UserLoading]);
    if (UserLoading) {
        return <>
            <title className={"poppinsblack"}>PETS|SIGN IN</title>
            <Loading/>
        </>

    }
    const onSubmit: SubmitHandler<UsersShemaType> =async (data) => {
        setIsLoading(true)
        SignIn(data).then(data=>{
            console.log(data)
                if (data.success) {

                    navigate({
                        pathname: `/secret`,
                        search: `?role=${data?.result?.user.role}&Store_name=${data?.seller?.Store_name}&Bio=${data?.seller?.Bio}&Seller_id=${data?.seller?.seller_id}`,
                    });

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
        <>
            <title className={"poppinsblack"}>PETS|SIGN IN</title>
            <ToastContainer position="top-center" limit={1} />

            <HeaderNav />
            <section className={"flex flex-col justify-center items-center h-[80vh] w-[60%] mx-auto"}>
                <h1 className={"text-5xl uppercase poppinsblack font-bold text-orange-950"}>Login</h1>
                <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col items-start justify-start  w-[50%] mt-10 gap-5"}>
                     <input type={"text"} placeholder={"email"}
                           {...register("email") }
                           className={"p-2 border-gray-100 border rounded-lg poppinsblack font-bold capitalize focus:!border-gray-300 w-[100%]"}/>
                    {errors.email&&(<span className={"text-red-400"}>{errors.email.message}</span>)}

                    <input type={"password"} placeholder={"password"}
                           {...register("password") }
                           className={"p-2 border-gray-100 border rounded-lg poppinsblack font-bold capitalize focus:!border-gray-300 w-[100%]"}/>
                    {errors.password&&(<span className={"text-red-400"}>{errors.password.message}</span>)}


                    <button disabled={submitCount>5 || isLoading} type={"submit"} className={"w-full mt-5 bg-orange-400 rounded-lg p-2 uppercase text-white disabled:bg-gray-200 inline-flex justify-center items-center gap-4 "}>
                        {isLoading&&(

                            <Loader className={"animate-spin"} />)}
                        Login
                    </button>
                    <Link to={"/account/SignUp"} className={"w-full   uppercase  text-center poppinsblack hover:underline hover:underline-offset-8"}>
                        Create Account
                    </Link>
                </form>
            </section>
            <Footer />
        </>
    );
}
