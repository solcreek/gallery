export type TemplateType = "site" | "app" | "workflow" | "connector" | "developer";

export interface Template {
  slug: string;
  name: string;
  description: string;
  longDescription?: string;
  type: TemplateType;
  capabilities: string[];
  trigger?: string;
  sourceUrl?: string;
  screenshotUrl?: string | null;
  featured?: boolean;
  schema?: Record<string, unknown>;
}

export const TYPE_LABELS: Record<TemplateType, string> = {
  site: "Sites",
  app: "Apps",
  workflow: "Workflows",
  connector: "Connectors",
  developer: "Developer",
};

const FILTER_TYPES: Array<{ key: string; label: string }> = [
  { key: "all", label: "All" },
  { key: "site", label: "Sites" },
  { key: "app", label: "Apps" },
  { key: "workflow", label: "Workflows" },
  { key: "connector", label: "Connectors" },
];

export { FILTER_TYPES };

let _cache: Template[] | null = null;

export async function loadTemplates(path: string): Promise<Template[]> {
  if (_cache) return _cache;
  const res = await fetch(path);
  const data = (await res.json()) as { templates: Template[] };
  _cache = data.templates;
  return _cache;
}

export function filterTemplates(templates: Template[], type: string): Template[] {
  if (type === "all") return templates;
  return templates.filter((t) => t.type === type);
}

export function groupByType(templates: Template[]): Array<[string, Template[]]> {
  const groups: Record<string, Template[]> = {};
  for (const t of templates) {
    (groups[t.type] ??= []).push(t);
  }
  return Object.entries(groups);
}

export function getTemplateBySlug(templates: Template[], slug: string): Template | undefined {
  return templates.find((t) => t.slug === slug);
}
