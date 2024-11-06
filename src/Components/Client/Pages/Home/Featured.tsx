import CardFeatured from "@/Components/Client/UI/CardFetured";

function Featured() {
  return (
    <main className="mt-10 w-[90%] mx-auto min-h-[90vh] my-4">
      <h1 className="text-start  text-3xl text-black/90 uppercase NexaHeavy">Featured Products</h1>
      <div className="grid grid-cols-3 max-md:grid-cols-1 justify-items-center gap-7 mt-12">
        <CardFeatured />
        <CardFeatured />
        <CardFeatured />
      </div>
    </main>
  );
}

export default Featured;
