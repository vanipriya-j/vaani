"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { TeachingDeckProps } from "@/types/deck";
import { RevealProvider } from "./Reveal";
import { SlideControls } from "./SlideControls";
import { SlideProgress } from "./SlideProgress";
import { PresenterNotes } from "./PresenterNotes";
import { SlideOverview } from "./SlideOverview";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function TeachingDeck({
  title,
  sessionLabel,
  slides,
  basePath,
}: TeachingDeckProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const slideFromUrl = Number(searchParams.get("slide") || "1");
  const current = clamp(
    Number.isFinite(slideFromUrl) ? slideFromUrl : 1,
    1,
    slides.length,
  );
  const slideIndex = current - 1;
  const slide = slides[slideIndex];

  const [revealStep, setRevealStep] = useState(0);
  const [notesOpen, setNotesOpen] = useState(false);
  const [overviewOpen, setOverviewOpen] = useState(false);

  const maxReveal = slide?.reveals ?? 0;

  const goToSlide = useCallback(
    (next: number) => {
      const target = clamp(next, 1, slides.length);
      const params = new URLSearchParams(searchParams.toString());
      params.set("slide", String(target));
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      setRevealStep(0);
    },
    [pathname, router, searchParams, slides.length],
  );

  useEffect(() => {
    setRevealStep(0);
  }, [current]);

  useEffect(() => {
    if (!searchParams.get("slide")) {
      goToSlide(1);
    }
  }, [goToSlide, searchParams]);

  const revealNext = useCallback(() => {
    setRevealStep((prev) => {
      if (prev < maxReveal) return prev + 1;
      return prev;
    });
  }, [maxReveal]);

  const revealAll = useCallback(() => {
    setRevealStep(maxReveal);
  }, [maxReveal]);

  const next = useCallback(() => {
    if (revealStep < maxReveal) {
      revealNext();
      return;
    }
    if (current < slides.length) goToSlide(current + 1);
  }, [current, goToSlide, maxReveal, revealNext, revealStep, slides.length]);

  const prev = useCallback(() => {
    if (revealStep > 0) {
      setRevealStep((s) => s - 1);
      return;
    }
    if (current > 1) goToSlide(current - 1);
  }, [current, goToSlide, revealStep]);

  const toggleFullscreen = useCallback(async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen().catch(() => undefined);
    } else {
      await document.exitFullscreen().catch(() => undefined);
    }
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const tag = target?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea" || target?.isContentEditable) {
        return;
      }

      if (event.key === "Escape") {
        if (overviewOpen) {
          setOverviewOpen(false);
          return;
        }
        if (notesOpen) {
          setNotesOpen(false);
          return;
        }
      }

      if (overviewOpen) {
        if (event.key === "o" || event.key === "O") setOverviewOpen(false);
        return;
      }

      switch (event.key) {
        case "ArrowRight":
          event.preventDefault();
          if (current < slides.length) goToSlide(current + 1);
          break;
        case "ArrowLeft":
          event.preventDefault();
          if (current > 1) goToSlide(current - 1);
          break;
        case " ":
        case "Enter":
          event.preventDefault();
          next();
          break;
        case "r":
        case "R":
          event.preventDefault();
          revealAll();
          break;
        case "n":
        case "N":
          event.preventDefault();
          setNotesOpen((v) => !v);
          break;
        case "o":
        case "O":
          event.preventDefault();
          setOverviewOpen((v) => !v);
          break;
        case "f":
        case "F":
          event.preventDefault();
          void toggleFullscreen();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [
    current,
    goToSlide,
    next,
    notesOpen,
    overviewOpen,
    revealAll,
    slides.length,
    toggleFullscreen,
  ]);

  const backgroundMotif = useMemo(
    () => (
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 12% 18%, rgba(63,79,217,0.08), transparent 28%), radial-gradient(circle at 88% 78%, rgba(196,123,22,0.06), transparent 24%), linear-gradient(180deg, rgba(255,255,255,0.35), transparent 40%)",
        }}
      />
    ),
    [],
  );

  if (!slide) return null;

  return (
    <div className="slide-shell" data-deck={basePath}>
      {backgroundMotif}
      <SlideProgress current={current} total={slides.length} />

      <header className="absolute left-6 top-5 z-20 text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted md:left-10">
        {sessionLabel}
        <span className="mx-2 text-ink/20">·</span>
        <span className="normal-case tracking-normal text-ink-soft">{title}</span>
      </header>

      <RevealProvider step={revealStep}>
        <div key={slide.id} className="relative z-10 flex-1 animate-fade-in">
          {slide.content}
        </div>
      </RevealProvider>

      <PresenterNotes open={notesOpen} notes={slide.notes} slideNumber={current} />

      <SlideControls
        current={current}
        total={slides.length}
        onPrev={prev}
        onNext={next}
        onToggleNotes={() => setNotesOpen((v) => !v)}
        onToggleOverview={() => setOverviewOpen((v) => !v)}
        onFullscreen={() => void toggleFullscreen()}
        notesOpen={notesOpen}
      />

      <SlideOverview
        open={overviewOpen}
        slides={slides}
        current={current}
        onSelect={goToSlide}
        onClose={() => setOverviewOpen(false)}
      />
    </div>
  );
}
