"use client";
export function SlideProgress({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  const pct = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-1 bg-ink/5">
      <div
        className="h-full bg-accent transition-all duration-300 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}