import { Heart } from "lucide-react";

function Card() {
  return (
    <section className="w-[90%] h-[320px]  bg-white shadow-sm shadow-gray-200 rounded-[20px]">
      <div className="image w-full h-[78%] bg-gray-200 rounded-t-[20px]"></div>
      <div className="mt-2 flex flex-col justify-center  ">
        <div className="flex justify-between items-center mx-2">
          <h1 className="text-lg font-medium">Premium Dog Food</h1>
          <Heart className="text-orange-400" size={20} />
        </div>
        <p className="font-mono ml-2 text-black/80 ">$20.00</p>
      </div>
    </section>
  );
}

export default Card;
