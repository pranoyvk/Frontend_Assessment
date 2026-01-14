import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Product } from "@/types/product";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

export function ProductCard({ product, isFavorite, onToggleFavorite }: ProductCardProps) {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite(product.id);
  };

  return (
    <Link to={`/products/${product.id}`} className="group block">
      <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <div className="relative aspect-square overflow-hidden bg-secondary/30 p-4">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "absolute right-2 top-2 h-9 w-9 rounded-full bg-background/80 backdrop-blur-sm transition-all hover:bg-background",
              isFavorite && "text-destructive"
            )}
            onClick={handleFavoriteClick}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart
              className={cn("h-5 w-5", isFavorite && "fill-current")}
            />
          </Button>
        </div>
        <CardContent className="p-4">
          <Badge variant="secondary" className="mb-2 capitalize">
            {product.category}
          </Badge>
          <h3 className="line-clamp-2 text-sm font-medium leading-tight text-foreground group-hover:text-primary transition-colors">
            {product.title}
          </h3>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <span className="text-lg font-bold text-foreground">
            ${product.price.toFixed(2)}
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
