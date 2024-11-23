
import {useContext, useRef} from "react";
import {useQuery} from "@tanstack/react-query";
import {ApiContext} from "@/Context/ClientContext.tsx";
import CardProduct from "@/Components/Client/UI/CardProduct.tsx";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {ChevronLeft, ChevronRight} from "lucide-react";

function NewProducts() {
    const {FetchProducts}=useContext(ApiContext)
    const {data:ListProduct}=useQuery({
        queryKey:["AllProduct"],
        queryFn: ()=>{
            return  FetchProducts()
        },
        refetchOnWindowFocus:false,
        refetchIntervalInBackground:false,
        refetchInterval:false

    })
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
        <main className="mt-20 w-[100%] mx-auto min-h-[60vh] mb-10 overflow-hidden relative new-product">
            <div className={"navigation-Product"}>
                <div className={"absolute left-4 top-1/2"}>
                    <button onClick={previous} className={"bg-orange-400 rounded-full p-2"}><ChevronLeft/></button>
                </div>
                <div className={"absolute right-4 top-1/2 z-30"}>
                    <button onClick={next} className={"bg-orange-400 rounded-full p-2 "}><ChevronRight/></button>
                </div>
            </div>

            <h1 className="text-start text-4xl font-bold poppinsblack ml-[5%]">It's brand new!</h1>

            <Slider
                {...settings}
                ref={(slider) => {
                    sliderRef = slider ?? null;
                }}
                className="   ml-20 mt-10  "
            >
                {ListProduct?.success && ListProduct.response.map((product, index) => (
                    <CardProduct key={index} data={product}/>

                ))}
            </Slider>

        </main>
    );
}

export default NewProducts;
