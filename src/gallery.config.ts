export interface GalleryConfig {
  brand: string;
  deployUrl: string;
  cliCommand: string;
  sourceUrl: string;
  navLinks: Array<{ label: string; href: string; external?: boolean }>;
  footerLinks: Array<{ label: string; href: string; external?: boolean }>;
  templatesPath: string;
}

export const config: GalleryConfig = {
  brand: "creek",
  deployUrl: "https://creek.dev/new?template={slug}",
  cliCommand: "npx creek deploy --template {slug}",
  sourceUrl: "https://github.com/solcreek/templates/tree/main",
  navLinks: [
    { label: "Docs", href: "https://creek.dev/docs" },
    { label: "Pricing", href: "https://creek.dev/pricing" },
    { label: "Changelog", href: "https://creek.dev/changelog" },
    { label: "GitHub", href: "https://github.com/solcreek/creek", external: true },
  ],
  footerLinks: [
    { label: "Docs", href: "https://creek.dev/docs" },
    { label: "Pricing", href: "https://creek.dev/pricing" },
    { label: "GitHub", href: "https://github.com/solcreek/creek", external: true },
    { label: "X", href: "https://x.com/creekdev", external: true },
  ],
  templatesPath: "/templates.json",
};
