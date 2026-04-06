import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { CapabilityBadges } from "@/components/capability-badge";
import { getGradient } from "@/lib/gradients";
import { config } from "@/gallery.config";
import type { Template } from "@/lib/templates";

export function TemplateCard({
  template,
  index,
}: {
  template: Template;
  index: number;
}) {
  const gradient = getGradient(template.slug);
  const deployUrl = config.deployUrl.replace("{slug}", template.slug);

  return (
    <div
      className="group relative flex flex-col rounded-xl border border-border hover:border-accent/30 transition-colors animate-fade-in-up"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <Link to="/$slug" params={{ slug: template.slug }} className="flex flex-col flex-1">
        {/* Screenshot placeholder */}
        <div
          className={`relative aspect-[4/3] rounded-t-xl bg-gradient-to-br ${gradient} overflow-hidden`}
        >
          {template.screenshotUrl ? (
            <img
              src={template.screenshotUrl}
              alt={template.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-mono text-sm text-foreground/40">{template.slug}</span>
            </div>
          )}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="rounded-full bg-background/60 backdrop-blur-sm p-1.5">
              <ArrowRight className="size-3.5 text-foreground" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-4 gap-2">
          <h3 className="text-sm font-semibold">{template.name}</h3>
          <p className="text-xs text-muted-foreground leading-relaxed flex-1">
            {template.description}
          </p>
          <CapabilityBadges capabilities={template.capabilities} />
        </div>
      </Link>

      {/* Deploy button */}
      <div className="px-4 pb-4">
        <a
          href={deployUrl}
          className="block w-full rounded-lg border border-border bg-code-bg px-3 py-2 text-center text-xs font-medium text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-colors"
        >
          Deploy
        </a>
      </div>
    </div>
  );
}
