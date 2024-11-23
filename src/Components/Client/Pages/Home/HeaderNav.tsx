import {HeartIcon, Search, ShoppingCart, UserIcon} from "lucide-react";
import {Link, NavLink} from "react-router-dom";
import {useContext, useState} from "react";
import {AuthContextCart} from "@/Context/CartContext.tsx";
import Cart from "@/Components/Client/Cart/Cart.tsx";
import {ApiContext} from "@/Context/ClientContext.tsx";
import {useQuery} from "@tanstack/react-query";

const HeaderNav = () => {
  const {DataCart}=useContext(AuthContextCart)
  const [CartActive, setCartActive] = useState<boolean>(false);
  const {User}=useContext(ApiContext)
  const {data:useData}=useQuery({
    queryKey:["UserData"],
    queryFn:()=>{
      return User()
    }
  })

  return (
    <nav className="w-full bg-white shadow-sm shadow-gray-200 h-[60px] ">
      <div className="w-[90%] h-full flex justify-between items-center mx-auto">
        <ul>
          <NavLink to={"/"} className="text-xl font-mono">
            LOGO
          </NavLink>
        </ul>{" "}
        <ul className="flex justify-center items-center gap-10 relative w-[500px] h-[40px]">
         <input type={"text"} className={" h-full rounded-md border border-gray-200 w-[85%] border-r-0 rounded-r-none pl-3"} placeholder={"Search...."}/>
          <button className={"bg-orange-300 p-2 rounded-md absolute right-0 top-0 rounded-l-none "}><Search/></button>
        </ul>
        <ul className="flex justify-center items-center gap-5">

          <li className="relative border-gray-200 p-2 rounded-full border-2 ">
            <span
                className="absolute -right-1 -top-1 bg-orange-400 rounded-full w-4 h-4 flex justify-center items-center font-bold text-white text-sm">
              0
            </span>
            <HeartIcon/>
          </li>
          <button onClick={() => {
            setCartActive(!CartActive)
          }} className="relative border-gray-200 p-2 rounded-full border-2   ">
            <span
                className="absolute -right-1 -top-1 bg-orange-400 rounded-full w-4 h-4 flex justify-center items-center font-bold text-white text-sm">
              {DataCart.length}
            </span>
            <ShoppingCart />
          </button>
          {useData?.success?(

                  <img src={useData?.user?.image} alt={"avatar user"} title={useData?.user?.name} className={"w-[40px] h-[40px] border-gray-200 p-0.5 rounded-full border-2 "} />
              ):(
                  <Link to={"/account/SignIn"} className={"relative border-gray-200 p-2 rounded-full border-2"}>

                    <UserIcon/>


                  </Link>

            )}
        </ul>
      </div>
      <Cart status={CartActive} onClick={()=>{setCartActive(!CartActive)}} />
    </nav>
  );
};

export default HeaderNav;
