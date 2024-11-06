import HeaderNav from "../Home/HeaderNav";
import CategoryPetsShop from "./CategoryPets";
import FilterAside from "./FilterAside";
import Hero from "./Heros";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/Client/UI/select";
import Card from "./Card";
import Footer from "../Home/Footer";
const Shop = () => {
  return (
    <main>
      <HeaderNav />
      <Hero />
      <CategoryPetsShop />
      <div className="flex ">
        <FilterAside />
        <div className="w-[80%] mx-10">
          <div className="flex justify-between items-center">
            <p>Showing 14-14 Of 18 Results</p>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort By Latest" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Sort By Latest">Sort By Latest</SelectItem>
                <SelectItem value="Sort By Popular">Sort By Popular</SelectItem>
                <SelectItem value="Sort By Min Price">
                  Sort By Min Price
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-20">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};
export default Shop;
