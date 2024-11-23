import heroImages from "@/assets/Images/bg.jpg";
function Heros() {
  return (
      <main className="w-[95%] rounded-md mt-4 mx-auto h-[60vh] flex justify-center items-center relative overflow-hidden ">

        <div className="absolute  w-full h-full top-0 left-0 bg-black/35 z-10">

        </div>
        <div className="flex flex-col justify-center items-center z-10">
          <h1 className="uppercase text-orange-400 font-bold">pets shop</h1>
          <p className="text-[50px] w-[80%] leading-[70px] uppercase font-bold text-center text-white">
            A pet store with everything you need
          </p>
          <button className="w-[130px] h-[45px] bg-orange-400 rounded-md text-white mt-5" >
            SHOP NOW
          </button>
        </div>
        <img
            id="image2_1_3630"
            src={heroImages}
            alt="car & dog"
            className="absolute left-0 top-0  w-[100%] h-[100%] -z-10 "
        />
      </main>
  );
}

export default Heros;
