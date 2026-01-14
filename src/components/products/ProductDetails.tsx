import { Heart, Star, ArrowLeft, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { Product } from "@/types/product";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface ProductDetailsProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

export function ProductDetails({
  product,
  isFavorite,
  onToggleFavorite,
}: ProductDetailsProps) {
  return (
    <div className="mx-auto max-w-6xl">
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Products
      </Link>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-secondary/30 p-8">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-contain"
          />
        </div>

        <div className="flex flex-col">
          <Badge variant="secondary" className="mb-3 w-fit capitalize">
            {product.category}
          </Badge>

          <h1 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">
            {product.title}
          </h1>

          <div className="mb-4 flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="font-medium text-foreground">
                {product.rating.rate}
              </span>
            </div>
            <span className="text-muted-foreground">
              ({product.rating.count} reviews)
            </span>
          </div>

          <p className="mb-6 flex-1 leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          <div className="mt-auto space-y-4">
            <div className="text-3xl font-bold text-foreground">
              ${product.price.toFixed(2)}
            </div>

            <div className="flex flex-wrap gap-3">
              <Button size="lg" className="flex-1 gap-2">
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => onToggleFavorite(product.id)}
                className={cn(isFavorite && "border-destructive text-destructive")}
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                <Heart
                  className={cn("h-5 w-5", isFavorite && "fill-current")}
                />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductDetailsSkeleton() {
  return (
    <div className="mx-auto max-w-6xl">
      <Skeleton className="mb-6 h-5 w-32" />

      <div className="grid gap-8 md:grid-cols-2">
        <Skeleton className="aspect-square rounded-lg" />

        <div className="flex flex-col">
          <Skeleton className="mb-3 h-6 w-24" />
          <Skeleton className="mb-2 h-8 w-full" />
          <Skeleton className="mb-4 h-8 w-3/4" />
          <Skeleton className="mb-4 h-5 w-40" />
          <Skeleton className="mb-2 h-4 w-full" />
          <Skeleton className="mb-2 h-4 w-full" />
          <Skeleton className="mb-2 h-4 w-full" />
          <Skeleton className="mb-6 h-4 w-2/3" />
          <div className="mt-auto space-y-4">
            <Skeleton className="h-10 w-28" />
            <div className="flex gap-3">
              <Skeleton className="h-12 flex-1" />
              <Skeleton className="h-12 w-12" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
