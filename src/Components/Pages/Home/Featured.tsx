import CardFeatured from "../../UI/CardFetured";

function Featured() {
  return (
    <main className="mt-10 w-[90%] mx-auto h-[90vh]">
      <h1 className="text-center text-4xl font-bold">Featured Products</h1>
      <div className="grid grid-cols-3 max-md:grid-cols-1 justify-items-center gap-7 mt-12">
        <CardFeatured />
        <CardFeatured />
        <CardFeatured />
      </div>
    </main>
  );
}

export default Featured;
