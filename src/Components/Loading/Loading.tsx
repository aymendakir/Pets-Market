import {Loader} from "lucide-react";

export function Loading() {
    return (
      <main className={"fixed top-0 left-0 w-full h-[100vh] bg-white flex justify-center items-center"}>
          <Loader className={"animate-spin text-orange-400"} size={40} />

      </main>
    );
}
