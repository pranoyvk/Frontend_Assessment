import { Heart, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchBar } from "./SearchBar";
import { CategoryFilter } from "./CategoryFilter";
import { SortSelect } from "./SortSelect";
import { ProductFilters } from "@/types/product";
import { cn } from "@/lib/utils";

interface FilterToolbarProps {
  filters: ProductFilters;
  categories: string[];
  categoriesLoading: boolean;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSortChange: (value: ProductFilters["sortBy"]) => void;
  onToggleFavorites: () => void;
  onReset: () => void;
}

export function FilterToolbar({
  filters,
  categories,
  categoriesLoading,
  onSearchChange,
  onCategoryChange,
  onSortChange,
  onToggleFavorites,
  onReset,
}: FilterToolbarProps) {
  const hasActiveFilters =
    filters.search ||
    filters.category !== "all" ||
    filters.showFavorites ||
    filters.sortBy !== "default";

  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <SearchBar value={filters.search} onChange={onSearchChange} />
        <div className="flex flex-wrap items-center gap-2">
          <CategoryFilter
            categories={categories}
            value={filters.category}
            onChange={onCategoryChange}
            isLoading={categoriesLoading}
          />
          <SortSelect value={filters.sortBy} onChange={onSortChange} />
          <Button
            variant={filters.showFavorites ? "default" : "outline"}
            size="default"
            onClick={onToggleFavorites}
            className={cn(
              "gap-2",
              filters.showFavorites && "bg-destructive hover:bg-destructive/90"
            )}
            aria-pressed={filters.showFavorites}
            aria-label="Show favorites only"
          >
            <Heart className={cn("h-4 w-4", filters.showFavorites && "fill-current")} />
            <span className="hidden sm:inline">Favorites</span>
          </Button>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="default"
              onClick={onReset}
              className="gap-2"
              aria-label="Reset all filters"
            >
              <RotateCcw className="h-4 w-4" />
              <span className="hidden sm:inline">Reset</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
