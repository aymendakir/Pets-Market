import React, { useState } from "react";
function PriceFilter({ MIN, MAX }) {
  return (
    <header>
      <div className="price-filter font-mono">
        <div className="flex  justify-center items-center h-[120px]">
          <div className="flex flex-col space-y-2  items-center  ">
            <input
              type="number"
              id="min"
              name="min"
              min={0}
              placeholder="0"
              className="h-16 w-16 rounded-xl border border-gray-400 text-center "
              onChange={(e) => {
                MIN(e.target.value);
              }}
            />
            <p>Min</p>
          </div>
          <div className=" h-1/3 flex justify-start items-start">
            <hr className="h-1 w-28 bg-yellow-400 rounded-full" />
          </div>
          <div className="flex flex-col space-y-2  items-center  ">
            <input
              type="number"
              id="max"
              name="max"
              min={0}
              placeholder="0"
              className="h-16 w-16  rounded-xl border border-gray-400 text-center"
              onChange={(e) => {
                MAX(e.target.value);
              }}
            />
            <p>Max</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default PriceFilter;
