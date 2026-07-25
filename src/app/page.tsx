import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-canvas px-6 py-16 text-ink">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 18% 20%, rgba(63,79,217,0.10), transparent 30%), radial-gradient(circle at 82% 70%, rgba(196,123,22,0.08), transparent 28%)",
        }}
      />

      <div className="relative z-10 w-full max-w-4xl">
        <p className="eyebrow">Instructor-led sessions</p>
        <h1 className="font-display text-5xl font-semibold tracking-tight md:text-7xl">
          Teaching Playground
        </h1>
        <p className="mt-4 max-w-2xl text-xl text-ink-soft md:text-2xl">
          RAG, CAG and Enterprise Knowledge Systems
        </p>

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          <Link
            href="/session-3/deck?slide=1"
            className="group rounded-2xl border border-ink/10 bg-white/80 p-8 transition hover:border-accent/40 hover:shadow-panel"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
              Session 3
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold">
              Start Session 3
            </h2>
            <p className="mt-3 text-lg text-ink-soft">
              Building and Debugging RAG for DevOps
            </p>
            <span className="mt-8 inline-flex items-center gap-2 font-semibold text-accent">
              Open deck
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </span>
          </Link>

          <Link
            href="/session-4/deck?slide=1"
            className="group rounded-2xl border border-ink/10 bg-white/80 p-8 transition hover:border-accent/40 hover:shadow-panel"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
              Session 4
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold">
              Start Session 4
            </h2>
            <p className="mt-3 text-lg text-ink-soft">
              CAG and Enterprise Knowledge Systems
            </p>
            <span className="mt-8 inline-flex items-center gap-2 font-semibold text-accent">
              Open deck
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
