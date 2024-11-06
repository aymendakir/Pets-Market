import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Product from "@/Components/Client/Pages/ProductPage/Product.tsx";
import Shop from "@/Components/Client/Pages/Shop/Shop.tsx";


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
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
