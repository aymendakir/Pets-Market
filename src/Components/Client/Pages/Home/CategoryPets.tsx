import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {useContext, useRef} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {useQuery} from "@tanstack/react-query";
import {ApiContext} from "@/Context/ClientContext.tsx";
import {Link} from "react-router-dom";

const CategoryPets = () => {
  const {  FetchPets } = useContext(ApiContext);

  const { data: ListPets } = useQuery(["ListPets"], FetchPets, {
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
    refetchInterval: false,
  });
  let settings = {
    dots: false,
    infinite: true,
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
    <main className="mt-20 w-[90%] mx-auto min-h-[40vh] space-y-12">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl uppercase poppinsblack">Shop by pet</h1>
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
        className="   ml-20  "
      >
        {ListPets?.success&&ListPets.response.map((pet,index)=> (
            <Link to={{
              pathname: `/Shop`,
              search: `pets=${pet.Pets_name}`,
            }} key={index} className="h-[250px] !w-[200px]    mb-4">
              <div className="image w-full h-[80%] relative ">
                <div className="  w-full h-full">
                  <svg
                      width="180"
                      height="189"
                      viewBox="0 0 180 189"
                      xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                        d="M153.02 170.449C166.489 158.297 171.477 137.465 175.717 116.137C179.708 94.8086 182.701 72.9846 176.216 51.9046C169.981 30.5766 154.017 9.74461 133.814 3.04861C113.361 -3.39938 88.6681 4.53661 65.7209 14.4566C43.0233 24.3766 22.0715 36.0326 10.8474 53.8886C-0.376739 71.9926 -2.12272 96.0486 2.11751 118.865C6.35774 141.929 16.3348 163.753 33.0462 175.657C49.7577 187.313 73.2037 188.801 95.652 187.809C118.1 186.569 139.8 182.849 153.02 170.449Z"
                        fill="url(#paint0_linear_1_4041)"
                    />
                    <defs>
                      <linearGradient
                          id="paint0_linear_1_4041"
                          x1="0"
                          y1="0.715805"
                          x2="187.197"
                          y2="180.572"
                          gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F87537"/>
                        <stop offset="1" stopColor="#FBA81F"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <img
                    src={pet.Pet_image[0].name}
                    alt={pet.Pets_name}
                    title={pet.Pets_name}
                    className="w-[100%] h-[100%] rounded-t-[20px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                />
              </div>
              <p className="font-bold text-[20px] mt-5  text-center poppinsblack">{pet.Pets_name}</p>
            </Link>

        ))}

      </Slider>
    </main>
  );
};

export default CategoryPets;
