import React from "react";
import CardFeatured from "../../UI/CardFetured";
function BestSellingProduct() {
  return (
    <main className="mt-20 w-[90%] mx-auto min-h-[90vh] mb-10">
      <h1 className="text-center text-4xl font-bold">Featured Products</h1>
      <div className="grid grid-cols-4  max-lg:grid-cols-2 max-xl:grid-cols-3 max-sm:grid-cols-1 justify-items-center gap-7 mt-12">
        <CardFeatured />
        <CardFeatured />
        <CardFeatured />
        <CardFeatured />
        <CardFeatured />
        <CardFeatured />
        <CardFeatured />
      </div>
    </main>
  );
}

export default BestSellingProduct;
