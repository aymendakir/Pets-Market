import "./App.css";
import Header from "@/Components/Client/Pages/Home/Header.tsx";
import HeaderNav from "@/Components/Client/Pages/Home/HeaderNav.tsx";
import Heros from "@/Components/Client/Pages/Home/Heros.tsx";
import Category from "@/Components/Client/Pages/Home/Category.tsx";
import Featured from "@/Components/Client/Pages/Home/Featured.tsx";
import InfoBlock from "@/Components/Client/Pages/Home/InfoBlock.tsx";
import Brands from "@/Components/Client/Pages/Home/Brands.tsx";
import BestSellingProduct from "@/Components/Client/Pages/Home/BestSellingProduct.tsx";
import CategoryPets from "@/Components/Client/Pages/Home/CategoryPets.tsx";
import Footer from "@/Components/Client/Pages/Home/Footer.tsx";


function App() {
  return (
    <>
      <Header />
      <HeaderNav />
      <Heros />
      <Category />
      <Featured />
      <InfoBlock />
      <Brands />
      <BestSellingProduct />
      <CategoryPets />
      <Footer />
    </>
  );
}

export default App;
