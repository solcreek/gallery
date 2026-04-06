import { createRootRoute } from "@tanstack/react-router";
import { Layout } from "@/components/layout";
import { loadTemplates, type Template } from "@/lib/templates";
import { config } from "@/gallery.config";

export interface RootLoaderData {
  templates: Template[];
}

export const Route = createRootRoute({
  loader: async (): Promise<RootLoaderData> => {
    const templates = await loadTemplates(config.templatesPath);
    return { templates };
  },
  component: Layout,
});
