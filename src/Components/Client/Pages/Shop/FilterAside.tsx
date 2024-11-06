import { Checkbox } from "@/Components/Client/UI/checkbox";
import React, { useState } from "react";
import PriceFilter from "./PriceFilter";

type Item = {
  id: string;
  label: string;
};

const items: readonly Item[] = [
  { id: "recents", label: "Recents" },
  { id: "home", label: "Home" },
  { id: "applications", label: "Applications" },
  { id: "desktop", label: "Desktop" },
  { id: "downloads", label: "Downloads" },
  { id: "documents", label: "Documents" },
];

function FilterAside() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCheckboxChange = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const HandleMin = (min: number) => {
    setMinPrice(min);
  };

  const HandleMax = (max: number) => {
    setMaxPrice(max);
  };

  return (
    <aside className="w-[20%] h-[90vh]flex flex-col   ">
      <div className="flex flex-col items-start ml-16 gap-5">
        <p className="text-lg font-semibold text-start w-full">
          Filter By Category
        </p>
        <div className="flex flex-col justify-center items-start gap-4 ">
          {items.map((item) => (
            <label
              key={item.id}
              className="flex items-center justify-between gap-2 text-lg uppercase w-full"
            >
              <Checkbox
                checked={selectedCategories.includes(item.id)}
                onClick={() => handleCheckboxChange(item.id)}
              />
              <div className="flex w-full justify-between gap-10">
                <p className="flex justify-start">{item.label}</p>
                <span className=" w-5 h-5 bg-orange-400 rounded-full text-[12px] flex justify-center items-center text-center">
                  22
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
          {items.map((item) => (
            <label
              key={item.id}
              className="flex items-center justify-center gap-2 text-lg uppercase"
            >
              <Checkbox
                checked={selectedCategories.includes(item.id)}
                onClick={() => handleCheckboxChange(item.id)}
              />

              {item.label}
            </label>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-start ml-16 gap-5 mt-7">
        <p className="text-xl font-semibold text-center">Filter By Tag</p>
        <div className="flex flex-wrap justify-start items-start gap-4 ">
          {items.map((item) => (
            <label
              key={item.id}
              className="  gap-2 text-[10px] uppercase p-1 bg-gray-200 rounded-full font-bold"
            >
              {item.label}{" "}
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default FilterAside;
