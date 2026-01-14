import { useParams } from "react-router-dom";
import { useProduct } from "@/hooks/useProducts";
import { useFavorites } from "@/hooks/useFavorites";
import { Header } from "@/components/layout/Header";
import { ProductDetails, ProductDetailsSkeleton } from "@/components/products/ProductDetails";
import { ErrorState } from "@/components/layout/ErrorState";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, isError, refetch } = useProduct(id || "");
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {isLoading ? (
          <ProductDetailsSkeleton />
        ) : isError || !product ? (
          <ErrorState
            message="Failed to load product details. The product may not exist or there was a connection error."
            onRetry={() => refetch()}
          />
        ) : (
          <ProductDetails
            product={product}
            isFavorite={isFavorite(product.id)}
            onToggleFavorite={toggleFavorite}
          />
        )}
      </main>
    </div>
  );
};

export default ProductPage;
