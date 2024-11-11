import {Aside} from "@/Components/Seller/Pages/Aside.tsx";
import {EyeOff, Layers, NotepadTextDashed, PenOff, Plus, ScanEye, Star} from "lucide-react";

export function ProductSeller() {
    return (
        <main className={"flex"}>
            <div className={"w-[20%]"}>
                <Aside />
            </div>
            <div className={"w-[80%] mt-10"}>

                <header className={"flex justify-between items-center mx-7"}>
                    <div className={"flex flex-col justify-between items-start"}>
                        <h1 className={"NexaHeavy text-3xl"}>Products</h1>
                        <p className={"text-black/50"}>Let's grow to your business Create your product and upload
                            here</p>
                    </div>
                    <div>
                        <button
                            className={"bg-orange-500 rounded-md flex justify-center items-center gap-5 font-bold text-sm p-2 NexaHeavy text-white"}>
                            <Plus size={30}/>Create item
                        </button>
                    </div>
                </header>
                <section
                    className={"relative mt-10 w-full h-[70px]  after:absolute after:top-0 after:left-0 after:w-full after:h-0.5 after:bg-gray-100 before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 before:bg-gray-200"}>
                    <ul className={"flex items-center h-full w-full  gap-20 justify-center"}>
                        <li className={"relative inline-flex justify-center items-center gap-2 poppinsblack font-bold text-xl text-orange-500 after:absolute after:bottom-0 after:left-0 after:h-1 after:w-full after:bg-orange-500 h-full after:rounded-full"}>
                            <Layers/>Published
                        </li>
                        <li className={"relative inline-flex justify-center items-center gap-2 poppinsblack font-bold text-xl   h-full after:rounded-full"}>
                            <NotepadTextDashed/>Draft
                        </li>
                        <li className={"relative inline-flex justify-center items-center gap-2 poppinsblack font-bold text-xl h-full after:rounded-full"}>
                            <EyeOff/>Hidden
                        </li>
                        <li className={"relative inline-flex justify-center items-center gap-2 poppinsblack font-bold text-xl  h-full after:rounded-full"}>
                            <PenOff/>Rejected
                        </li>
                        <li className={"relative inline-flex justify-center items-center gap-2 poppinsblack font-bold text-xl  h-full after:rounded-full"}>
                            <ScanEye/>Under Review
                        </li>
                    </ul>
                </section>
                <table className="w-full mx-auto mt-20 poppinsblack uppercase text-xl">
                    <thead
                        className="relative after:absolute after:-bottom-3 after:left-8 after:w-[90%] after:h-0.5 after:bg-gray-200">
                    <tr>
                        <th scope="col">Product Name</th>
                        <th scope="col">Pricing</th>
                        <th scope="col">See</th>
                        <th scope="col">Rating</th>
                        <th scope="col">Option</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr className={"h-[120px]"}>
                        <td className="w-[420px] ">
                            <div className="w-[420px] h-[120px] flex mt-10">
                                <div className="bg-gray-300 w-[250px] h-[120px] ml-10 rounded-lg"></div>
                                <div className="ml-2">
                                    <h1>Pets jouer for dogs</h1>
                                    <p className="text-sm mt-2">Category</p>
                                </div>
                            </div>
                        </td>
                        <td className=" text-center">$320.00</td>
                        <td className="text-center">22</td>
                        <td className="h-[160px] w-full flex justify-center items-center gap-2 ">4.9/5 <Star className={"text-yellow-300"}/></td>
                        <td className="text-center">22</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </main>
    );
}
