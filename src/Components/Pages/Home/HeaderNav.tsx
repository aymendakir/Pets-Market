import { HeartIcon, ShoppingCart } from "lucide-react";

const HeaderNav = () => {
  return (
    <nav className="w-full bg-white shadow-sm shadow-gray-200 h-[60px] ">
      <div className="w-[90%] h-full flex justify-between items-center mx-auto">
        <ul>
          <li className="text-xl font-mono">LOGO</li>
        </ul>{" "}
        <ul className="flex justify-center items-center gap-10">
          <li className="text-[16px]  nunito  relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-orange-400 text-orange-400">
            HOME
          </li>
          <li className="text-[16px]  nunito">SHOP</li>
          <li className="text-[16px]  nunito">ABOUT US</li>
          <li className="text-[16px]  nunito">CONTACT US</li>
        </ul>
        <ul className="flex justify-center items-center gap-5">
          <li className="relative ">
            <span className="absolute -right-1 -top-1 bg-orange-400 rounded-full w-4 h-4 flex justify-center items-center font-bold text-white text-sm">
              0
            </span>
            <HeartIcon />
          </li>
          <li className="relative  ">
            <span className="absolute -right-1 -top-1 bg-orange-400 rounded-full w-4 h-4 flex justify-center items-center font-bold text-white text-sm">
              0
            </span>
            <ShoppingCart />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default HeaderNav;
