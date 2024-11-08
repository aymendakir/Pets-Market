import heroImages from "@/assets/Images/bg.jpg";
function Heros() {
  return (
      <main className="w-full h-[60vh] flex justify-center items-center relative overflow-hidden ">
        <div className="absolute left-32 -top-20 -z-10">
          <svg
              width="180"
              height="181"
              viewBox="0 0 180 181"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path
                d="M130.963 173.404C146.322 164.601 155.606 145.612 164.295 125.985C172.748 106.305 180.372 85.9313 178.907 64.2341C177.732 42.3517 167.288 18.8528 149.738 8.05472C131.899 -2.55822 106.901 -0.231507 83.1093 4.38178C59.5527 9.04877 37.2579 15.7635 22.7574 30.5433C8.20242 45.562 1.26157 68.3533 0.230421 91.2391C-0.855333 114.364 3.73376 137.529 16.8484 152.591C30.0176 167.414 51.7669 173.895 73.1228 177.772C94.5334 181.411 115.785 182.5 130.963 173.404Z"
                fill="url(#paint0_linear_1_3570)"
            />
            <defs>
              <linearGradient
                  id="paint0_linear_1_3570"
                  x1="24.2514"
                  y1="-23"
                  x2="165.648"
                  y2="187.33"
                  gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#F87537"/>
                <stop offset="1" stopColor="#FBA81F"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="absolute  w-full h-full top-0 left-0 bg-black/40 z-10">

        </div>
        <div className="flex flex-col justify-center items-center z-10">
          <h1 className="uppercase text-orange-400 font-bold">pets shop</h1>
          <p className="text-[50px] w-[80%] leading-[70px] uppercase font-bold text-center text-white">
            A pet store with everything you need
          </p>
          <button className="w-[130px] h-[35px] bg-black rounded-md text-white mt-5">
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
