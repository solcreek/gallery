import { createFileRoute, Link, getRouteApi } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { CapabilityBadges } from "@/components/capability-badge";
import { DeployButton } from "@/components/deploy-button";
import { CliCommand } from "@/components/cli-command";
import { getTemplateBySlug, TYPE_LABELS } from "@/lib/templates";
import { getGradient } from "@/lib/gradients";
import { config } from "@/gallery.config";

const rootApi = getRouteApi("__root__");

export const Route = createFileRoute("/$slug")({
  component: TemplateDetail,
});

function TemplateDetail() {
  const { slug } = Route.useParams();
  const { templates } = rootApi.useLoaderData();
  const template = getTemplateBySlug(templates, slug);

  if (!template) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4">
        <p className="text-muted-foreground">Template not found.</p>
        <Link to="/" className="text-accent text-sm hover:underline">
          Back to templates
        </Link>
      </div>
    );
  }
  const gradient = getGradient(template.slug);
  const sourceUrl = template.sourceUrl ?? `${config.sourceUrl}/${template.slug}`;

  return (
    <section className="mx-auto max-w-3xl px-6 pt-10 pb-28 w-full">
      {/* Breadcrumb */}
      <div className="animate-fade-in">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="size-3.5" />
          Templates
        </Link>
      </div>

      {/* Screenshot placeholder */}
      <div
        className={`aspect-[16/10] rounded-xl bg-gradient-to-br ${gradient} overflow-hidden mb-8 animate-fade-in-up`}
      >
        {template.screenshotUrl ? (
          <img
            src={template.screenshotUrl}
            alt={template.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-mono text-lg text-foreground/30">{template.slug}</span>
          </div>
        )}
      </div>

      {/* Header */}
      <div className="mb-6 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-xs font-mono text-muted-foreground">
            {TYPE_LABELS[template.type]}
          </span>
          {template.trigger && (
            <>
              <span className="text-muted-foreground/30">&middot;</span>
              <span className="text-xs font-mono text-muted-foreground">
                trigger: {template.trigger}
              </span>
            </>
          )}
        </div>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl mb-3">
          {template.name}
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          {template.longDescription ?? template.description}
        </p>
      </div>

      {/* Capabilities */}
      {template.capabilities.length > 0 && (
        <div
          className="mb-8 animate-fade-in-up"
          style={{ animationDelay: "150ms" }}
        >
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Capabilities
          </h2>
          <CapabilityBadges capabilities={template.capabilities} />
        </div>
      )}

      {/* Schema parameters table */}
      {template.schema && <SchemaTable schema={template.schema} />}

      {/* Actions */}
      <div
        className="space-y-3 mb-8 animate-fade-in-up"
        style={{ animationDelay: "200ms" }}
      >
        <DeployButton slug={template.slug} />
        <CliCommand slug={template.slug} />
      </div>

      {/* Links */}
      <div
        className="flex flex-wrap gap-4 animate-fade-in-up"
        style={{ animationDelay: "250ms" }}
      >
        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ExternalLink className="size-3.5" />
          View on GitHub
        </a>
      </div>
    </section>
  );
}

function SchemaTable({ schema }: { schema: Record<string, unknown> }) {
  const properties = (schema as any).properties as
    | Record<string, { type?: string; description?: string; default?: unknown; enum?: string[] }>
    | undefined;

  if (!properties || Object.keys(properties).length === 0) return null;

  return (
    <div
      className="mb-8 animate-fade-in-up"
      style={{ animationDelay: "175ms" }}
    >
      <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
        Parameters
      </h2>
      <div className="rounded-xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-code-bg">
              <th className="text-left px-4 py-2 font-medium text-muted-foreground">Name</th>
              <th className="text-left px-4 py-2 font-medium text-muted-foreground">Type</th>
              <th className="text-left px-4 py-2 font-medium text-muted-foreground">Default</th>
              <th className="text-left px-4 py-2 font-medium text-muted-foreground hidden sm:table-cell">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(properties).map(([name, prop]) => (
              <tr key={name} className="border-b border-border last:border-b-0">
                <td className="px-4 py-2 font-mono text-xs">{name}</td>
                <td className="px-4 py-2 text-muted-foreground text-xs">
                  {prop.enum ? prop.enum.join(" | ") : (prop.type ?? "string")}
                </td>
                <td className="px-4 py-2 font-mono text-xs text-muted-foreground">
                  {prop.default !== undefined ? String(prop.default) : "-"}
                </td>
                <td className="px-4 py-2 text-xs text-muted-foreground hidden sm:table-cell">
                  {prop.description ?? "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
