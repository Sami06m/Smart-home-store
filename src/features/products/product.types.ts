export type ProductCategory =
  | "lighting"
  | "security"
  | "climate"
  | "entertainment"
  | "automation"
  | "sensors"
  | "accessories";

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  image: string;
  price: number;
  oldPrice?: number;
  rating: number;
  inStock: boolean;
  featured: boolean;
}
