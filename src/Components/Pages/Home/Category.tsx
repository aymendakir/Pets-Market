import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import accessories from "../../../assets/Images/Accesseoires.jpg";
import food from "../../../assets/Images/food.jpg";
import furniture from "../../../assets/Images/furniture.jpg";
import bags from "../../../assets/Images/pags.jpg";
import bath from "../../../assets/Images/soin.jpg";
const Category = () => {
  let settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    Paging: false,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  let sliderRef = useRef<Slider | null>(null);
  const next = () => {
    sliderRef.slickNext();
  };
  const previous = () => {
    sliderRef.slickPrev();
  };
  return (
    <main className="mt-20 w-[90%] mx-auto h-[60vh] space-y-12">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl uppercase">Browse by category</h1>
        <div className="space-x-5 text-white">
          <button onClick={previous} className="bg-black p-1 rounded-lg px-3">
            <ChevronLeft />
          </button>
          <button onClick={next} className="bg-black p-1 rounded-lg px-3">
            <ChevronRight />
          </button>
        </div>
      </div>

      <Slider
        {...settings}
        ref={(slider) => {
          sliderRef = slider ?? null;
        }}
        className="grid grid-cols-4 justify-items-center gap-x-20 "
      >
        <div className="h-[308px] !w-[300px]  bg-gray-100/80 rounded-[20px] shadow-sm shadow-slate-300 mb-4">
          <div className="image w-full h-[70%] bg-gray-200 rounded-t-[20px]">
            <img
              src={accessories}
              alt="accessories"
              title="accessories"
              className="w-full h-full rounded-t-[20px]"
            />
          </div>
          <p className="font-bold text-[20px] mt-2 ml-2">Accessories</p>
          <p className="text-black/50 text-sm ml-2">20 Products</p>
        </div>
        <div className="h-[308px] !w-[300px]  bg-gray-100/80 rounded-[20px] shadow-sm shadow-slate-300">
          <div className="image w-full h-[70%] bg-gray-200 rounded-t-[20px]">
            <img
              src={food}
              alt="food"
              title="food"
              className="w-full h-full rounded-t-[20px]"
            />
          </div>
          <p className="font-bold text-[20px] mt-2 ml-2">Food</p>
          <p className="text-black/50 text-sm ml-2">20 Products</p>
        </div>
        <div className="h-[308px] !w-[300px]  bg-gray-100/80 rounded-[20px] shadow-sm shadow-slate-300">
          <div className="image w-full h-[70%] bg-gray-200 rounded-t-[20px]">
            <img
              src={furniture}
              alt="furniture"
              title="furniture"
              className="w-full h-full rounded-t-[20px]"
            />
          </div>
          <p className="font-bold text-[20px] mt-2 ml-2">Furniture</p>
          <p className="text-black/50 text-sm ml-2">20 Products</p>
        </div>
        <div className="h-[308px] !w-[300px]  bg-gray-100/80 rounded-[20px] shadow-sm shadow-slate-300">
          <div className="image w-full h-[70%] bg-gray-200 rounded-t-[20px]">
            <img
              src={bags}
              alt="bags"
              title="bags"
              className="w-full h-full rounded-t-[20px]"
            />
          </div>
          <p className="font-bold text-[20px] mt-2 ml-2">Bags</p>
          <p className="text-black/50 text-sm ml-2">20 Products</p>
        </div>
        <div className="h-[308px] !w-[300px]  bg-gray-100/80 rounded-[20px] shadow-sm shadow-slate-300 border border-gray-100">
          <div className="image w-full h-[70%] bg-gray-200 rounded-t-[20px]">
            <img
              src={bath}
              alt="bath"
              title="bath"
              className="w-full h-full rounded-t-[20px]"
            />
          </div>
          <p className="font-bold text-[20px] mt-2 ml-2">Bath</p>
          <p className="text-black/50 text-sm ml-2">20 Products</p>
        </div>
      </Slider>
    </main>
  );
};

export default Category;
