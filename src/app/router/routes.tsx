import { HomePage } from "../../features/home/pages/HomePage";
import { ProductDetailsPage } from "../../features/products/pages/ProductDetailsPage";
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
  {
    path: "/products/:productId",
    element: <ProductDetailsPage />,
  },
];
