import { Truck } from "lucide-react";

const Header = () => {
  return (
    <nav className="w-full h-[40px] flex justify-center items-center gap-2 bg-black">
      <Truck size={20} className="text-white" />{" "}
      <p className="capitalize text-sm text-white">
        Free delivery to a relay point from 49€ of purchases
      </p>
    </nav>
  );
};

export default Header;
