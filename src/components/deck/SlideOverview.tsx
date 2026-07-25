"use client";

import type { SlideDefinition } from "@/types/deck";

export function SlideOverview({
  open,
  slides,
  current,
  onSelect,
  onClose,
}: {
  open: boolean;
  slides: SlideDefinition[];
  current: number;
  onSelect: (index: number) => void;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-ink/40 p-6 backdrop-blur-sm">
      <div className="max-h-[85vh] w-full max-w-5xl overflow-hidden rounded-2xl bg-canvas shadow-panel">
        <div className="flex items-center justify-between border-b border-ink/10 px-6 py-4">
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink">Slide overview</h2>
            <p className="text-sm text-ink-muted">Press Escape to close · click a slide to jump</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary px-4 py-2 text-sm"
          >
            Close
          </button>
        </div>
        <div className="grid max-h-[70vh] grid-cols-2 gap-3 overflow-y-auto p-6 md:grid-cols-3 lg:grid-cols-4">
          {slides.map((slide, index) => {
            const active = index + 1 === current;
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => onSelect(index + 1)}
                className={`rounded-xl border p-4 text-left transition ${
                  active
                    ? "border-accent bg-accent-soft"
                    : "border-ink/10 bg-white hover:border-accent/40"
                }`}
              >
                <div className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
                  Slide {index + 1}
                </div>
                <div className="line-clamp-3 text-sm font-medium text-ink">
                  {slide.id.replace(/-/g, " ")}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
