"use client";

interface XPBadgeProps {
  xp: number;
  size?: "sm" | "md";
}

export function XPBadge({ xp, size = "md" }: XPBadgeProps) {
  const formatted = xp >= 1000 ? `${(xp / 1000).toFixed(1)}k` : xp.toString();
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-rz-gold/15 text-rz-gold font-semibold ${
        size === "sm" ? "text-xs px-2 py-0.5" : "text-sm px-3 py-1"
      }`}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
      {formatted} XP
    </span>
  );
}
