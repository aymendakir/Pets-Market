import {BadgeHelp, Banknote, ChartBarBig, LayoutDashboard, LogOut, Package, Settings} from "lucide-react";


export function Aside() {
    return (
        <aside
            className={"w-[20%] h-full fixed left-0 top-0 bg-white shadow-md shadow-gray-200 border border-l-gray-500 flex flex-col justify-start  items-center"}>
            <ul className={"mt-10"}>
                <li className={"text-3xl font-bold uppercase NexaHeavy"}>Pets <span className={"text-orange-500"}>Awesome</span></li>
            </ul>
            <ul className={"flex flex-col gap-10 items-start mt-20 w-full ml-10 NexaHeavy"}>
                <li className={"text-xl font-semibold capitalize flex justify-start items-center gap-5 "}><LayoutDashboard size={30} />Overview</li>
                <li className={"relative text-xl font-semibold capitalize flex justify-start items-center gap-5 after:absolute after:-left-5 after:top-0 after:w-1.5 px-4 after:h-full after:bg-orange-500 after:rounded-tr-lg after:rounded-br-lg"}><Package size={30} />Product</li>
                <li className={"text-xl font-semibold capitalize flex justify-start items-center gap-5"}><ChartBarBig size={30}/>Analytic</li>
                <li className={"text-xl font-semibold capitalize flex justify-start items-center gap-5"}><Banknote size={30} />Payout</li>

            </ul>
            <ul className={"flex flex-col gap-10 mt-10 items-start w-full ml-10" +
                ""}>
                <li className={"text-xl font-semibold capitalize flex justify-start items-center gap-5"}><BadgeHelp size={30} />Help</li>
                <li className={"text-xl font-semibold capitalize flex justify-start items-center gap-5"}><Settings size={30} />Setting</li>
                <li className={"text-xl font-semibold capitalize flex justify-start items-center gap-5"}><LogOut size={30} />Logout</li>
            </ul>
        </aside>
    );
}
