import Images from "./Images";
import HeaderNav from "../Home/HeaderNav";
import ProductInfo from "./ProductInfo";
import SimilarProduct from "./SimilaireProduct";
import Footer from "../Home/Footer";

function Product() {
  return (
    <main className="w-full">
      <HeaderNav />
      <section className="flex   mt-20">
        <Images />
        <ProductInfo />
      </section>
      <SimilarProduct />
      <Footer />
    </main>
  );
}

export default Product;
