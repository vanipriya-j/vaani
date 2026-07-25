"use client";
import {
  ChevronLeft,
  ChevronRight,
  Expand,
  LayoutGrid,
  NotebookPen,
} from "lucide-react";

export function SlideControls({
  current,
  total,
  onPrev,
  onNext,
  onToggleNotes,
  onToggleOverview,
  onFullscreen,
  notesOpen,
}: {
  current: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onToggleNotes: () => void;
  onToggleOverview: () => void;
  onFullscreen: () => void;
  notesOpen: boolean;
}) {
  return (
    <div className="absolute inset-x-0 bottom-0 z-30 flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-2 text-sm font-medium text-ink-muted">
        <span className="rounded-md bg-white/80 px-3 py-1.5 tabular-nums shadow-sm">
          {current} / {total}
        </span>
        <span className="hidden md:inline">← → navigate · Space reveal · N notes · O overview · F fullscreen</span>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onToggleNotes}
          className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
            notesOpen
              ? "border-accent bg-accent-soft text-accent"
              : "border-ink/10 bg-white/80 text-ink hover:bg-white"
          }`}
          aria-label="Toggle presenter notes"
        >
          <NotebookPen className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={onToggleOverview}
          className="rounded-lg border border-ink/10 bg-white/80 px-3 py-2 text-ink transition hover:bg-white"
          aria-label="Open slide overview"
        >
          <LayoutGrid className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={onFullscreen}
          className="rounded-lg border border-ink/10 bg-white/80 px-3 py-2 text-ink transition hover:bg-white"
          aria-label="Enter fullscreen"
        >
          <Expand className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={onPrev}
          className="rounded-lg border border-ink/10 bg-white/80 px-3 py-2 text-ink transition hover:bg-white"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={onNext}
          className="rounded-lg border border-ink/10 bg-white/80 px-3 py-2 text-ink transition hover:bg-white"
          aria-label="Next slide"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}