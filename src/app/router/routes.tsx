import { HomePage } from "../../features/home/pages/HomePage";
import { ProductsPage } from "../../features/products/pages/ProductsPage";

export const routes = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/products",
    element: <ProductsPage />,
  },
];
