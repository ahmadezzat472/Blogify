import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useCategories } from "../hooks/useCategories";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearchParams } from "react-router";
import { cn } from "@/lib/utils";

interface ToggleCategoryProps {
  className?: string;
}

const ToggleCategory = ({ className }: ToggleCategoryProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { categories, loading, error } = useCategories();

  const currentCategory = searchParams.get("category") ?? "all";

  const handleToggle = (nextValue: string) => {
    if (nextValue === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", nextValue);
    }
    setSearchParams(searchParams);
  };

  if (loading) {
    return (
      <div className={cn("flex flex-wrap gap-2", className)}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-24 rounded-full" />
        ))}
      </div>
    );
  }

  if (error) {
    return <p className="text-sm text-destructive">{error}</p>;
  }

  if (categories.length === 0) {
    return <p className="text-sm text-muted-foreground">No categories found</p>;
  }

  return (
    <ToggleGroup
      type="single"
      orientation="horizontal"
      spacing={3}
      value={currentCategory}
      onValueChange={handleToggle}
      className={cn("w-full flex-wrap", className)}
    >
      <ToggleGroupItem
        value="all"
        aria-label="Show all posts"
        className="cursor-pointer rounded-full border border-border bg-background/30 px-4 text-xs font-semibold tracking-wide uppercase transition-all duration-200 hover:bg-background data-[state=on]:border-primary data-[state=on]:bg-primary-100 data-[state=on]:text-primary-700"
      >
        All
      </ToggleGroupItem>

      {categories.map((item) => (
        <ToggleGroupItem
          key={item.id}
          value={item.id}
          aria-label={`Filter by ${item.name}`}
          className="cursor-pointer rounded-full border border-border bg-background/30 px-4 text-xs font-semibold tracking-wide uppercase transition-all duration-200 hover:bg-background data-[state=on]:border-primary data-[state=on]:bg-primary-100 data-[state=on]:text-primary-700"
        >
          {item.name}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};

export default ToggleCategory;
