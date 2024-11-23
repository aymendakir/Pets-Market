import Images from "./Images";
import HeaderNav from "../Home/HeaderNav";
import ProductInfo from "./ProductInfo";
import SimilarProduct from "./SimilaireProduct";
import Footer from "../Home/Footer";
import {useContext} from "react";
import {ApiContext} from "@/Context/ClientContext.tsx";
import {useQuery} from "@tanstack/react-query";
import {useLocation} from "react-router-dom";

function Product() {
    const location = useLocation();

    // Get a specific query parameter
    const id = new URLSearchParams(location.search).get('id');
    const { FetchProduct } = useContext(ApiContext);

    const { data: Product } = useQuery({
        queryKey: ["OneProduct",id],
        queryFn: () => FetchProduct(Number(id)),
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false,
        refetchInterval: false,
        enabled:!!id
    });

    return (
    <main className="w-full">

      <section className="flex   mt-20">
        <Images images={Product?.Images} />
        <ProductInfo title={Product?.title} description={Product?.description} />
      </section>
      <SimilarProduct />

    </main>
  );
}

export default Product;
