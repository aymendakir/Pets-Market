import "./App.css";
import BestSellingProduct from "./Components/Pages/Home/BestSellingProduct";
import Brands from "./Components/Pages/Home/Brands";
import Category from "./Components/Pages/Home/Category";
import CategoryPets from "./Components/Pages/Home/CategoryPets";
import Featured from "./Components/Pages/Home/Featured";
import Footer from "./Components/Pages/Home/Footer";
import Header from "./Components/Pages/Home/Header";
import HeaderNav from "./Components/Pages/Home/HeaderNav";
import Heros from "./Components/Pages/Home/Heros";
import InfoBlock from "./Components/Pages/Home/InfoBlock";

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
