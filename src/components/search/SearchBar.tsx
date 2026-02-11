import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { Mouse, Headphones, Keyboard, Monitor } from "lucide-react";
import { useProductSearch, useInitSearchIndex } from "@/hooks/use-product-search";
import type { SearchableProduct } from "@/lib/search";

const CATEGORY_ICONS = {
  mouse: Mouse,
  audio: Headphones,
  keyboard: Keyboard,
  monitor: Monitor,
} as const;

const CATEGORY_LABELS = {
  mouse: "Mice",
  audio: "Audio",
  keyboard: "Keyboards",
  monitor: "Monitors",
} as const;

export function SearchBar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { isLoading: isIndexLoading } = useInitSearchIndex({ enabled: open });
  const { results, query, setQuery } = useProductSearch({
    limit: 15,
  });

  // Cmd+K / Ctrl+K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const handleSelect = useCallback(
    (product: SearchableProduct) => {
      setOpen(false);
      setQuery("");
      navigate(`/quiz/${product.category}`);
    },
    [navigate, setQuery]
  );

  // Group results by category
  const grouped = results.reduce<
    Record<string, typeof results>
  >((acc, r) => {
    const cat = r.product.category;
    (acc[cat] ??= []).push(r);
    return acc;
  }, {});

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput
        placeholder="Search products... (e.g. 'Razer Viper', 'wireless mouse')"
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        {isIndexLoading ? (
          <CommandEmpty>Loading product data...</CommandEmpty>
        ) : query.length < 2 ? (
          <CommandEmpty>
            Type to search across all products
          </CommandEmpty>
        ) : results.length === 0 ? (
          <CommandEmpty>No products found for &ldquo;{query}&rdquo;</CommandEmpty>
        ) : (
          Object.entries(grouped).map(([category, items]) => {
            const Icon =
              CATEGORY_ICONS[category as keyof typeof CATEGORY_ICONS];
            return (
              <CommandGroup
                key={category}
                heading={
                  CATEGORY_LABELS[
                    category as keyof typeof CATEGORY_LABELS
                  ]
                }
              >
                {items.map((item) => (
                  <CommandItem
                    key={item.product.id}
                    value={`${item.product.name} ${item.product.brand}`}
                    onSelect={() => handleSelect(item.product)}
                  >
                    <Icon className="mr-2 h-4 w-4 shrink-0 opacity-70" />
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="truncate">{item.product.name}</span>
                      <span className="text-xs text-muted-foreground truncate">
                        {item.product.brand} &middot; $
                        {item.product.priceLow}
                        {item.product.priceHigh !== item.product.priceLow &&
                          `-$${item.product.priceHigh}`}
                      </span>
                    </div>
                    <Badge
                      variant="secondary"
                      className="ml-auto shrink-0 text-xs"
                    >
                      {Math.round((1 - item.score) * 100)}%
                    </Badge>
                  </CommandItem>
                ))}
              </CommandGroup>
            );
          })
        )}
      </CommandList>
    </CommandDialog>
  );
}
