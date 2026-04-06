import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { config } from "@/gallery.config";

export function CliCommand({ slug }: { slug: string }) {
  const [copied, setCopied] = useState(false);
  const command = config.cliCommand.replace("{slug}", slug);

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="w-full group flex items-center justify-between rounded-xl border border-border bg-code-bg px-4 py-3 font-mono text-sm text-muted-foreground cursor-pointer hover:border-accent/30 transition-colors"
    >
      <span className="truncate text-left">
        <span className="text-muted-foreground/40">$ </span>
        <span className="text-foreground">{command}</span>
      </span>
      <span className="ml-3 shrink-0">
        {copied ? (
          <Check className="size-3.5 text-accent" />
        ) : (
          <Copy className="size-3.5 text-muted-foreground/40 group-hover:text-accent/60 transition-colors" />
        )}
      </span>
    </button>
  );
}
