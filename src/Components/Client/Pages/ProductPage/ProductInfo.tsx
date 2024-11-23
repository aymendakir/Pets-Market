import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/Client/UI/select";
import masterCard from "@/assets/Images/mastercard_color_card.svg";
import Visa from "@/assets/Images/visa_1_color_card.svg";
import applepay from "@/assets/Images/applepay_color_card.svg";
import american from "@/assets/Images/americanexpress_1_color_card.svg";
import mestro from "@/assets/Images/maestro_color_card.svg";
type InfroProps={
    title:string
    description:string
}
function ProductInfo({title,description}:InfroProps) {
  return (
    <main className="w-[50%] ml-36">
      <p className="uppercase text-sm font-light">Name Store</p>
      <p className="mt-7 text-2xl capitalize text-purple-900 font-sans font-bold w-[90%] text-justify ">
          {title}
      </p>
      <p className="mt-4">$22.00</p>
      <div className="flex gap-3 items-center mt-4">
        <span className="p-2  rounded-full bg-green-400 relative  ">
          <span className="absolute w-[80%] h-[80%] top-[10%] left-[10%]  rounded-full bg-green-400 animate-ping"></span>
        </span>
        <p className="capitalize">Article in stock</p>
      </div>
      <div className="mt-4 space-y-3">
        <p className="capitalize font-semibold text-lg">quantity</p>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="0" />
          </SelectTrigger>
          <SelectContent>
            {[...Array(10)].map((_, index) => (
              <SelectItem key={index} value={index.toString()}>
                {index}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <button className="mt-4 w-[90%] text-sm uppercase text-white font-light bg-orange-500 p-3 rounded-md">
        add en panier
      </button>
      <div className="mt-5 text-justify w-[90%]">
        <div
          dangerouslySetInnerHTML={{__html:description}}
        ></div>
        <div>
          <p className="icons"></p>
          <p className="icons"></p>
          <p className="icons"></p>
        </div>
        <div className="flex flex-col justify-center items-center gap-5 mt-7">
          <p className="text-xl font-medium">Payment secured With</p>
          <div className="flex justify-center items-center gap-3">
            <img
              src={masterCard}
              alt="masterCard"
              title="masterCard"
              className="
            !w-[60px]"
            />
            <img
              src={Visa}
              alt="Visa"
              title="Visa"
              className="
            !w-[60px]"
            />
            <img
              src={applepay}
              alt="applepay"
              title="applepay"
              className="
            !w-[60px]"
            />
            <img
              src={american}
              alt="americanPay"
              title="americanPay"
              className="
            !w-[60px]"
            />
            <img
              src={mestro}
              alt="mestroCard"
              title="mestroCard"
              className="
            !w-[60px]"
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductInfo;
