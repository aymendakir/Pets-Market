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
import Footer from "../Home/Footer";
import {useContext, useEffect, useState} from "react";
import {ApiContext} from "@/Context/ClientContext.tsx";
import {useQuery} from "@tanstack/react-query";
import CardProduct from "@/Components/Client/UI/CardProduct.tsx";
import {useLocation} from "react-router-dom";
type Product = {
  seller_id: number|undefined;
  title: string;
  description?: string;
  price: number;
  FinaleImages: string[];
  stock: number;
  colors?: string[]|null;
  sizes?: string[]|null;
  category: string;
  pets?: string[];
  tags?: string[];
  Images:{name:string}[]
};

const Shop = () => {
  const [productData, setProductData] = useState<Product[]|undefined>()
  const [productDataPets, setProductDataPets] = useState<Product[]|undefined>()
  const [Pets, setPets] = useState<string>("Cat");
  const [category, setCategory] = useState<string[]>([]);
  const [Brands, setBrands] = useState<string[]>([]);
  const [price, setPrice] = useState<{ Min: number; Max: number }>({ Min: 0, Max: 10000 });
  const location = useLocation();
  const name = new URLSearchParams(location.search).get('pets');
  const {FetchProducts}=useContext(ApiContext)
  const {data:ListProduct}=useQuery({
    queryKey:["ShopProduct"],
    queryFn: ()=>{
      return  FetchProducts()
    },
    refetchOnWindowFocus:false,
    refetchIntervalInBackground:false,
    refetchInterval:false

  })
  useEffect(() => {
    if (name){
      setPets(name)
    }
    const filteredByPets = ListProduct?.response?.filter((product) => Pets === product.pets);
    setProductDataPets(filteredByPets || []);
    setProductData(filteredByPets || []);

  }, [Pets, ListProduct]);
  useEffect(() => {
    if (category.length > 0 || price) {
      handleFilterProduct();
    } else {
      setProductData(productDataPets);
    }
  }, [category, price]);
  const handleFilterProduct = () => {
    const filteredByCategoryAndPrice = ListProduct?.response?.filter((product) => {
      return category.length > 0
          ? category.includes(product.category) && Number(product.price) >= price.Min && Number(product.price) <= price.Max
          : Number(product.price) >= price.Min && Number(product.price) <= price.Max;
    });
    const filteredData = filteredByCategoryAndPrice?.filter((product) => Pets === product.pets);
    setProductDataPets(filteredData || []);
  };
  const handleChoose = (data) => {
    setPets(data);
  };

  return (
    <main>

      <Hero />
      <CategoryPetsShop value={Pets} handleChoose={handleChoose} />
      <div className="flex ">
        <FilterAside pets={Pets} data={productDataPets} PriceValue={(min, max)=>{
          setPrice((prev) => ({ ...prev, Min: min, Max: max }));
        }
        } CategoryValue={data=>{
          setCategory(data)
        }}  BrandValue={data=>{
          setBrands(data)
        }}/>
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
            {ListProduct?.success && productDataPets?.map((product, index) => (
                <CardProduct data={product} key={index} />
            ))}


          </div>
        </div>
      </div>

    </main>
  );
};
export default Shop;
