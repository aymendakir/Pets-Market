import Slider from "react-slick";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function SimilarProduct() {
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
    <main className="mt-20 fle flex-col justify-center items-center overflow-hidden relative sliderSimilair">
      <h1 className="mb-10  text-3xl font-bold text-center">Similar Product</h1>
      <div className="space-x-2 text-orange-400 ml-5 w-full navigationButton ">
        <button
          name="previous"
          onClick={previous}
          className="bg-gray-100 p-1 rounded-full  px-3 absolute top-1/2 z-10"
        >
          <ChevronLeft />
        </button>
        <button
          name="next"
          onClick={next}
          className="bg-gray-100 p-1 rounded-full px-3 absolute right-4 top-1/2 z-10"
        >
          <ChevronRight />
        </button>
      </div>
      <Slider
        {...settings}
        ref={(slider) => {
          sliderRef = slider ?? null;
        }}
        className=" ml-10 "
      >

      </Slider>
    </main>
  );
}

export default SimilarProduct;
