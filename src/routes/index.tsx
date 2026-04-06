import { useState } from "react";
import { createFileRoute, getRouteApi } from "@tanstack/react-router";
import { TemplateCard } from "@/components/template-card";
import { TemplateFilters } from "@/components/template-filters";
import { filterTemplates, groupByType, TYPE_LABELS } from "@/lib/templates";

const rootApi = getRouteApi("__root__");

export const Route = createFileRoute("/")({
  component: GalleryIndex,
});

function GalleryIndex() {
  const { templates } = rootApi.useLoaderData();
  const [filter, setFilter] = useState("all");

  const filtered = filterTemplates(templates, filter);

  const sections =
    filter === "all"
      ? groupByType(filtered)
      : [["", filtered] as [string, typeof filtered]];

  return (
    <>
      {/* Header */}
      <section className="px-6 pt-20 pb-12 text-center">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl animate-fade-in-up">
          Templates
        </h1>
        <p
          className="mt-4 text-muted-foreground max-w-md mx-auto animate-fade-in-up"
          style={{ animationDelay: "100ms" }}
        >
          Start with a template. Deploy in seconds.
        </p>
      </section>

      {/* Filters */}
      <section className="px-6 pb-10">
        <div className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
          <TemplateFilters active={filter} onChange={setFilter} />
        </div>
      </section>

      {/* Grid */}
      <section className="mx-auto max-w-5xl px-6 pb-28 w-full">
        {sections.map(([type, items]) => (
          <div key={type || "filtered"} className={type ? "mb-12" : ""}>
            {type && (
              <h2 className="text-sm font-semibold text-muted-foreground mb-4">
                {TYPE_LABELS[type as keyof typeof TYPE_LABELS] ?? type}
              </h2>
            )}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((template, i) => (
                <TemplateCard key={template.slug} template={template} index={i} />
              ))}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground text-sm py-12">
            No templates in this category yet.
          </p>
        )}
      </section>
    </>
  );
}
