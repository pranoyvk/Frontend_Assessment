export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export type ProductCategory = 
  | "electronics" 
  | "jewelery" 
  | "men's clothing" 
  | "women's clothing";

export interface ProductFilters {
  search: string;
  category: string;
  showFavorites: boolean;
  sortBy: "default" | "price-asc" | "price-desc";
}
