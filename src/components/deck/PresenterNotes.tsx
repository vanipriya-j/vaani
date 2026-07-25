"use client";

import type { PresenterNotesData } from "@/types/deck";

export function PresenterNotes({
  open,
  notes,
  slideNumber,
}: {
  open: boolean;
  notes: PresenterNotesData;
  slideNumber: number;
}) {
  if (!open) return null;

  return (
    <aside className="absolute bottom-20 right-6 z-40 w-[min(420px,calc(100vw-3rem))] animate-fade-up rounded-2xl border border-ink/10 bg-white p-5 shadow-panel">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
          Presenter notes
        </h2>
        <span className="text-xs font-medium text-ink-muted">Slide {slideNumber}</span>
      </div>

      <div className="space-y-4 text-sm leading-relaxed text-ink">
        <section>
          <h3 className="mb-1 font-semibold text-ink">What to say</h3>
          <p className="text-ink-soft">{notes.whatToSay}</p>
        </section>

        {notes.questionToAsk ? (
          <section>
            <h3 className="mb-1 font-semibold text-ink">Question to ask</h3>
            <p className="text-ink-soft">{notes.questionToAsk}</p>
          </section>
        ) : null}

        {notes.expectedResponse ? (
          <section>
            <h3 className="mb-1 font-semibold text-ink">Expected learner response</h3>
            <p className="text-ink-soft">{notes.expectedResponse}</p>
          </section>
        ) : null}

        <section>
          <h3 className="mb-1 font-semibold text-ink">Transition to next slide</h3>
          <p className="text-ink-soft">{notes.transition}</p>
        </section>
      </div>
    </aside>
  );
}
