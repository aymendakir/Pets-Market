import { Truck } from "lucide-react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../../UI/select";
import {useContext} from "react";
import {ApiContext} from "@/Context/ClientContext.tsx";
import {useQuery} from "@tanstack/react-query";
import {Link} from "react-router-dom";

const Header = () => {
    const {User}=useContext(ApiContext)
    const {data:useData}=useQuery({
        queryKey:["UserData"],
        queryFn:()=>{
            return User()
        }
    })
  return (
    <nav className="w-full h-[40px]  bg-gray-200 poppinsblack">
        <ul className={"flex justify-between items-center h-full w-full gap-2 px-7"}>
            <li className={"flex items-center gap-2  "}>
                <Truck size={20} className="text-black" />{" "}
                <p className="capitalize text-sm text-black">
                    Free delivery to a relay point from 49€ of purchases
                </p>
            </li>
            <ul className={"flex uppercase gap-3 items-center "}>
                <li className={"hover:underline underline-offset-4\""}>help&Faq</li>
                {(useData?.success&&
                useData.user.role==="seller")?(
                    <Link to={"/Seller/Dashboard"} className={"hover:underline underline-offset-4"}>Go To SELLING</Link>
                    ): (
                    <li className={"hover:underline underline-offset-4\""}>Start Selling</li>

                )}
                <Select



                >
                    <SelectTrigger  className="bg-transparent border-none w-20 uppercase ">
                        <SelectValue placeholder="Mad"/>
                    </SelectTrigger>
                    <SelectContent >
                        <SelectItem value="MAD" className={"cursor-pointer"}>
                            MAD
                        </SelectItem>
                        <SelectItem value={"USD"} className={"cursor-pointer"}>
                            USD
                        </SelectItem>
                    </SelectContent>
                </Select>

            </ul>
        </ul>

    </nav>
  );
};

export default Header;
