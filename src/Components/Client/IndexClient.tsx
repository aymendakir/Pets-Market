import {Outlet} from "react-router-dom";
import HeaderNav from "@/Components/Client/Pages/Home/HeaderNav.tsx";
import Footer from "@/Components/Client/Pages/Home/Footer.tsx";
import Header from "@/Components/Client/Pages/Home/Header.tsx";

export function IndexClient() {
    return (
        <>
            <Header />
            <HeaderNav></HeaderNav>
            <Outlet />
            <Footer />
        </>
    );
}
