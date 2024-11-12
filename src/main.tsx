import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Product from "@/Components/Client/Pages/ProductPage/Product.tsx";
import Shop from "@/Components/Client/Pages/Shop/Shop.tsx";
import {ProductSeller} from "@/Components/Seller/Pages/Product/ProductSeller.tsx";
import {AddProduct} from "@/Components/Seller/Pages/Product/AddProduct.tsx";
import {SellerContextProvider} from "@/Context/SellerContext.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/Shop",
    element: <Shop />,
  },
  {
    path: "/Product/:name",
    element: <Product />,
  },
  {
    path: "/admin",
   children:[
     {
       path: "Product",

       children:[
         {
           path: "All",
           element: <ProductSeller />,
         },
         {
           path: "New",
           element: <AddProduct />,
         }
       ]
     },
   ]
  },
]);
const queryClient = new QueryClient()
createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={queryClient}>

    <SellerContextProvider>
      <ReactQueryDevtools initialIsOpen={false} />

      <RouterProvider router={router} />
    </SellerContextProvider>
    </QueryClientProvider>
);
