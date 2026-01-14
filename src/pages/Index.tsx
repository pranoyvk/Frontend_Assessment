import { useProducts, useCategories } from "@/hooks/useProducts";
import { useFavorites } from "@/hooks/useFavorites";
import { useProductFilters } from "@/hooks/useProductFilters";
import { Header } from "@/components/layout/Header";
import { FilterToolbar } from "@/components/products/FilterToolbar";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ErrorState } from "@/components/layout/ErrorState";

const Index = () => {
  const { data: products, isLoading, isError, refetch } = useProducts();
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  
  const {
    filters,
    filteredProducts,
    setSearch,
    setCategory,
    toggleShowFavorites,
    setSortBy,
    resetFilters,
  } = useProductFilters(products, favorites);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-foreground md:text-4xl">
            Product Explorer
          </h1>
          <p className="text-muted-foreground">
            Discover and save your favorite products
          </p>
        </div>

        {isError ? (
          <ErrorState
            message="Failed to load products. Please check your connection and try again."
            onRetry={() => refetch()}
          />
        ) : (
          <>
            <FilterToolbar
              filters={filters}
              categories={categories}
              categoriesLoading={categoriesLoading}
              onSearchChange={setSearch}
              onCategoryChange={setCategory}
              onSortChange={setSortBy}
              onToggleFavorites={toggleShowFavorites}
              onReset={resetFilters}
            />

            <div className="mb-4 text-sm text-muted-foreground">
              {!isLoading && (
                <span>
                  Showing {filteredProducts.length} product
                  {filteredProducts.length !== 1 ? "s" : ""}
                </span>
              )}
            </div>

            <ProductGrid
              products={filteredProducts}
              isLoading={isLoading}
              isFavorite={isFavorite}
              onToggleFavorite={toggleFavorite}
            />
          </>
        )}
      </main>
    </div>
  );
};

export default Index;
