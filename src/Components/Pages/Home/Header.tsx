import { Truck } from "lucide-react";

const Header = () => {
  return (
    <nav className="w-full h-[30px] flex justify-center items-center gap-2 bg-orange-500">
      <Truck size={30} />{" "}
      <p className="capitalize">
        Free delivery to a relay point from 49€ of purchases
      </p>
    </nav>
  );
};

export default Header;
