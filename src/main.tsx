import { createRoot } from "react-dom/client";
import "./index.css";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import App from "./App";
import Product from "@/Components/Client/Pages/ProductPage/Product.tsx";
import Shop from "@/Components/Client/Pages/Shop/Shop.tsx";
import {ProductSeller} from "@/Components/Seller/Pages/Product/ProductSeller.tsx";
import {AddProduct} from "@/Components/Seller/Pages/Product/AddProduct.tsx";
import {SellerContextProvider} from "@/Context/SellerContext.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import { ApiContextProvider} from "@/Context/ClientContext.tsx";
import {AuthProviderCart} from "@/Context/CartContext.tsx";
import SignUp from "@/Components/Login/SignUp.tsx";
import SignIn from "@/Components/Login/SignIn.tsx";
import {AddStore} from "@/Components/Seller/Pages/CreateStore/AddStore.tsx";
import {ProtectedRoute} from "@/Components/ProtectedRoute/ProtectedRoute.tsx";
import {Loading} from "@/Components/Loading/Loading.tsx";
import {IndexClient} from "@/Components/Client/IndexClient.tsx";
import {IndexSeller} from "@/Components/Seller/IndexSeller.tsx";


const router = createBrowserRouter([

  {
    path: "/account/SignUp",
    element: <SignUp />,
  },
  {
    path: "/account/SignIn",
    element: <SignIn />,
  },
  {
    path: "/secret",
    element: (
        <ProtectedRoute>
          <Loading />
        </ProtectedRoute>
    ),
  },
  {
    path: "/Seller/Customization",
    element: <AddStore />,
  },
  {
    path: "/Seller",
    element: (

          <IndexSeller />

    ),
    children: [

      {
        path: "Product",
        children: [
          {
            path: "All",
            element: <ProductSeller />,
          },
          {
            path: "New",
            element: <AddProduct />,
          },
        ],
      },
    ],
  },
  {
    path: "/",
    element: (
       <IndexClient />
    ),
    children: [
      {
        path: "",
        element: <App />,
      },
      {
        path: "Shop",
        element: <Shop />,
      },
      {
        path: "Product/:name",
        element: <Product />,
      },
    ],
  },
]);
const queryClient = new QueryClient()
createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={queryClient}>

      <SellerContextProvider>
        <ApiContextProvider>
      <ReactQueryDevtools initialIsOpen={false} />
<AuthProviderCart>
      <RouterProvider router={router} />
</AuthProviderCart>
    </ApiContextProvider>
      </SellerContextProvider>
    </QueryClientProvider>
);
