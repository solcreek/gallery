import { config } from "@/gallery.config";

export function DeployButton({ slug }: { slug: string }) {
  const url = config.deployUrl.replace("{slug}", slug);

  return (
    <a
      href={url}
      className="block w-full rounded-xl bg-foreground text-background py-3 px-6 text-center text-sm font-semibold hover:opacity-90 transition-opacity"
    >
      Deploy to Creek
    </a>
  );
}
