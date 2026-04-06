import { FILTER_TYPES } from "@/lib/templates";
import { cn } from "@/lib/utils";

export function TemplateFilters({
  active,
  onChange,
}: {
  active: string;
  onChange: (key: string) => void;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {FILTER_TYPES.map((f) => (
        <button
          key={f.key}
          onClick={() => onChange(f.key)}
          className={cn(
            "rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200",
            active === f.key
              ? "border border-accent/40 bg-accent/[0.06] text-foreground"
              : "border border-transparent text-muted-foreground hover:text-foreground",
          )}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
