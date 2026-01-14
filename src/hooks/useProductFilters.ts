import { useState, useMemo, useCallback } from "react";
import { Product, ProductFilters } from "@/types/product";

const initialFilters: ProductFilters = {
  search: "",
  category: "all",
  showFavorites: false,
  sortBy: "default",
};

export function useProductFilters(products: Product[] | undefined, favorites: number[]) {
  const [filters, setFilters] = useState<ProductFilters>(initialFilters);

  const setSearch = useCallback((search: string) => {
    setFilters((prev) => ({ ...prev, search }));
  }, []);

  const setCategory = useCallback((category: string) => {
    setFilters((prev) => ({ ...prev, category }));
  }, []);

  const toggleShowFavorites = useCallback(() => {
    setFilters((prev) => ({ ...prev, showFavorites: !prev.showFavorites }));
  }, []);

  const setSortBy = useCallback((sortBy: ProductFilters["sortBy"]) => {
    setFilters((prev) => ({ ...prev, sortBy }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
  }, []);

  const filteredProducts = useMemo(() => {
    if (!products) return [];

    let result = [...products];

    // Filter by search term
    if (filters.search.trim()) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter((product) =>
        product.title.toLowerCase().includes(searchLower)
      );
    }

    // Filter by category
    if (filters.category !== "all") {
      result = result.filter((product) => product.category === filters.category);
    }

    // Filter by favorites
    if (filters.showFavorites) {
      result = result.filter((product) => favorites.includes(product.id));
    }

    // Sort products
    if (filters.sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, filters, favorites]);

  return {
    filters,
    filteredProducts,
    setSearch,
    setCategory,
    toggleShowFavorites,
    setSortBy,
    resetFilters,
  };
}
