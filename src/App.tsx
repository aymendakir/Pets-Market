import "./App.css";
import Heros from "@/Components/Client/Pages/Home/Heros.tsx";
import Category from "@/Components/Client/Pages/Home/Category.tsx";
import Featured from "@/Components/Client/Pages/Home/Featured.tsx";
import Brands from "@/Components/Client/Pages/Home/Brands.tsx";
import NewProducts from "@/Components/Client/Pages/Home/NewProducts.tsx";
import CategoryPets from "@/Components/Client/Pages/Home/CategoryPets.tsx";


function App() {
  return (
    <>
<title>PETS|HOME</title>

      <Heros />
      <Category />
      <Featured />
        <CategoryPets />

      <NewProducts />
        <Brands />


    </>
  );
}

export default App;
