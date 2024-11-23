import { Checkbox } from "@/Components/Client/UI/checkbox";
import React, {useContext, useState} from "react";
import PriceFilter from "./PriceFilter";
import {ApiContext} from "@/Context/ClientContext.tsx";
import {useQuery} from "@tanstack/react-query";
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

type FilterProps={
  CategoryValue:(data:string[])=>void,
  BrandValue:(data:string[])=>void,
  PriceValue:(min:number,max:number)=>void
  pets:string,
  data:Product[]
}

function FilterAside({CategoryValue,BrandValue,PriceValue,pets,data}: Readonly<FilterProps>) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const { FetchCategory } = useContext(ApiContext);
  const { data: ListCategory } = useQuery(["ListCategoryShop"], FetchCategory, {
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
    refetchInterval: false,
  });
  const handleCheckboxChange = (id: string) => {
    setSelectedCategories((prev) => {
      const data = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      CategoryValue(data);
      return data;
    });

  };

  const HandleMin = (min: number) => {
    setMinPrice(min);
    PriceValue(min,maxPrice)
  };

  const HandleMax = (max: number) => {
    setMaxPrice(max);
    PriceValue(minPrice,max)

  };

  return (
    <aside className="w-[20%] h-[90vh]flex flex-col   ">
      <div className="flex flex-col items-start ml-16 gap-5">
        <p className="text-lg font-semibold text-start w-full">
          Filter By Category
        </p>
        <div className="flex flex-col justify-center items-start gap-4 ">
          {ListCategory?.success&&ListCategory.response.map((item) => (
            <label
              key={item.category_id}
              className="flex items-center justify-between gap-2 text-lg uppercase w-full"
            >
              <Checkbox
                checked={selectedCategories.includes(item.category_name)}
                onClick={() => handleCheckboxChange(item.category_name)}
              />
              <div className="flex w-full justify-between gap-10">
                <p className="flex justify-start">{item.category_name}</p>
                <span className=" w-5 h-5 bg-orange-400 rounded-full text-[12px] flex justify-center items-center text-center">
                {data?.filter(index=>{
                  return index.category === item.category_name ;
                }).length}
                </span>
              </div>
            </label>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-start ml-16 gap-5 mt-10">
        <p className="text-xl font-semibold text-center">Filter By Price</p>
        <div className="flex flex-col justify-center items-start gap-4 w-full">
          <PriceFilter MIN={HandleMin} MAX={HandleMax} />
        </div>
      </div>
      <div className="flex flex-col items-start ml-16 gap-5 mt-7">
        <p className="text-xl font-semibold text-center">Filter By Category</p>
        <div className="flex flex-col justify-center items-start gap-4 ">
          {ListCategory?.success && ListCategory.response.map((item) => (
              <label
                  key={item.category_id}
                  className="flex items-center justify-between gap-2 text-lg uppercase w-full"
              >
                <Checkbox
                    checked={selectedCategories.includes(item.category_name)}
                    onClick={() => handleCheckboxChange(item.category_name)}
                />
                <div className="flex w-full justify-between gap-10">
                  <p className="flex justify-start">{item.category_name}</p>
                  <span
                      className=" w-5 h-5 bg-orange-400 rounded-full text-[12px] flex justify-center items-center text-center">
                  {ListCategory?.response.length}
                </span>
                </div>
              </label>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-start ml-16 gap-5 mt-7">
        <p className="text-xl font-semibold text-center">Filter By Tag</p>
        <div className="flex flex-col justify-center items-start gap-4 ">
          {ListCategory?.success && ListCategory.response.map((item) => (
              <label
                  key={item.category_id}
                  className="flex items-center justify-between gap-2 text-lg uppercase w-full"
              >
                <Checkbox
                    checked={selectedCategories.includes(item.category_name)}
                    onClick={() => handleCheckboxChange(item.category_name)}
                />
                <div className="flex w-full justify-between gap-10">
                  <p className="flex justify-start">{item.category_name}</p>
                  <span
                      className=" w-5 h-5 bg-orange-400 rounded-full text-[12px] flex justify-center items-center text-center">
                  {ListCategory?.response.length}
                </span>
                </div>
              </label>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default FilterAside;
