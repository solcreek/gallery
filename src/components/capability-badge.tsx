const CAPABILITY_CONFIG: Record<string, { label: string; color: string }> = {
  d1:       { label: "D1",       color: "text-orange-400/80 border-orange-400/20 bg-orange-400/5" },
  r2:       { label: "R2",       color: "text-amber-400/80 border-amber-400/20 bg-amber-400/5" },
  kv:       { label: "KV",       color: "text-lime-400/80 border-lime-400/20 bg-lime-400/5" },
  ai:       { label: "AI",       color: "text-violet-400/80 border-violet-400/20 bg-violet-400/5" },
  realtime: { label: "Realtime", color: "text-sky-400/80 border-sky-400/20 bg-sky-400/5" },
  cron:     { label: "Cron",     color: "text-teal-400/80 border-teal-400/20 bg-teal-400/5" },
  queue:    { label: "Queue",    color: "text-pink-400/80 border-pink-400/20 bg-pink-400/5" },
  email:    { label: "Email",    color: "text-rose-400/80 border-rose-400/20 bg-rose-400/5" },
  ftp:      { label: "FTP",      color: "text-slate-400/80 border-slate-400/20 bg-slate-400/5" },
};

export function CapabilityBadge({ capability }: { capability: string }) {
  const config = CAPABILITY_CONFIG[capability];
  if (!config) return null;

  return (
    <span
      className={`inline-flex items-center rounded-md border px-1.5 py-0.5 text-[10px] font-mono font-medium ${config.color}`}
    >
      {config.label}
    </span>
  );
}

export function CapabilityBadges({ capabilities }: { capabilities: string[] }) {
  if (capabilities.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-1">
      {capabilities.map((cap) => (
        <CapabilityBadge key={cap} capability={cap} />
      ))}
    </div>
  );
}
