// Gradient palette for screenshot placeholders.
// These classes MUST live in a .ts/.tsx file (not JSON) so Tailwind finds them.
export const GRADIENTS = [
  "from-sky-500/20 to-violet-500/20",
  "from-emerald-500/20 to-cyan-500/20",
  "from-orange-500/20 to-rose-500/20",
  "from-violet-500/20 to-pink-500/20",
  "from-teal-500/20 to-blue-500/20",
  "from-amber-500/20 to-red-500/20",
  "from-indigo-500/20 to-purple-500/20",
  "from-lime-500/20 to-emerald-500/20",
  "from-rose-500/20 to-orange-500/20",
  "from-cyan-500/20 to-sky-500/20",
];

export function hashSlug(slug: string): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = ((hash << 5) - hash + slug.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

export function getGradient(slug: string): string {
  return GRADIENTS[hashSlug(slug) % GRADIENTS.length];
}
