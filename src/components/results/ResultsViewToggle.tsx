import { LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ResultsViewToggleProps {
  view: "grid" | "list";
  onToggle: () => void;
}

const ResultsViewToggle = ({ view, onToggle }: ResultsViewToggleProps) => {
  return (
    <div className="flex items-center gap-1 rounded-md border border-border/50 p-0.5">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => view === "list" && onToggle()}
        className={cn(
          "h-7 w-7 p-0",
          view === "grid" && "bg-secondary"
        )}
        aria-label="Grid view"
        aria-pressed={view === "grid"}
      >
        <LayoutGrid className="h-3.5 w-3.5" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => view === "grid" && onToggle()}
        className={cn(
          "h-7 w-7 p-0",
          view === "list" && "bg-secondary"
        )}
        aria-label="List view"
        aria-pressed={view === "list"}
      >
        <List className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
};

export default ResultsViewToggle;
