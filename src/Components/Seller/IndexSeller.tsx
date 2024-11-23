import {Navigate, Outlet} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import {Aside} from "@/Components/Seller/Pages/Aside.tsx";
import {useContext} from "react";
import {ApiContext} from "@/Context/ClientContext.tsx";
import {useQuery} from "@tanstack/react-query";
import {Loading} from "@/Components/Loading/Loading.tsx";


export function IndexSeller() {
    const {User}=useContext(ApiContext)

    const {data:useData,isLoading}=useQuery({
        queryKey:["UserData"],
        queryFn:()=>{
            return User()
        }
    })
    if(!isLoading){
        if (useData?.user?.role !== "seller") {

            return <Navigate to="/" replace />;
        }
    }

  if (isLoading){
      return <Loading/>

  }
    return (
        <>
            <main className={"flex "}>
                <ToastContainer/>
                <div className={"w-[20%]  z-[51]"}>
                    <Aside/>
                </div>
                <div className={"w-[80%] mt-10 relative"}>
                    <Outlet/>

                </div>
            </main>

        </>
    );
}
