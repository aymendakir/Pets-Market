import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {useContext, useRef} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import bath from "@/assets/Images/soin.jpg";
import {useQuery} from "@tanstack/react-query";
import {ApiContext} from "@/Context/ClientContext.tsx";
const Category = () => {
  const { FetchCategory } = useContext(ApiContext);
  const { data: ListCategory } = useQuery(["ListCategory"], FetchCategory, {
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
    refetchInterval: false,
  });


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
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
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
    <main className="mt-20 w-[90%] mx-auto min-h-[60vh] space-y-12">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl uppercase NexaHeavy">Browse by category</h1>
        <div className="space-x-2 text-white">
          <button
            name="previous"
            onClick={previous}
            className="bg-black p-1 rounded-lg px-3"
          >
            <ChevronLeft />
          </button>
          <button
            name="next"
            onClick={next}
            className="bg-black p-1 rounded-lg px-3"
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      <Slider
        {...settings}
        ref={(slider) => {
          sliderRef = slider ?? null;
        }}
        className="grid grid-cols-4 lg:grid-cols-1  justify-items-center gap-x-20 poppinsblack "
      >
        {ListCategory?.success&&ListCategory.response.map((category,index)=> (
            <div key={index} className="h-[308px] !w-[90%]  bg-gray-50/80 rounded-[20px] shadow-sm shadow-slate-100 mb-4 "
            >
              <div className="image w-full h-[70%] bg-gray-200 rounded-t-[20px]">
                <img
                    src={category?.Category_image}
                    alt="accessories"
                    title="accessories"
                    className="w-full h-full rounded-t-[20px]"
                />
              </div>
              <p className="font-bold text-[20px] mt-2 ml-2">{category?.category_name}</p>
              <p className="text-black/50 text-sm ml-2">{category?.product_count} Products</p>
            </div>
        ))}


      </Slider>
    </main>
  );
};

export default Category;
