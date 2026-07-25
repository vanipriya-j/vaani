"use client";
import { Suspense, type ReactNode } from "react";
import { ReturnToDeckButton } from "@/components/deck";

export function DemoShell({
  title,
  subtitle,
  children,
  fallback = "/",
  actions,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  fallback?: string;
  actions?: ReactNode;
}) {
  return (
    <Suspense
      fallback={<div className="demo-shell flex items-center justify-center p-10">Loading…</div>}
    >
      <div className="demo-shell">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="eyebrow">Teaching Playground · Demo</p>
              <h1 className="font-display text-3xl font-semibold md:text-4xl">{title}</h1>
              {subtitle ? (
                <p className="mt-2 max-w-3xl text-lg text-ink-soft">{subtitle}</p>
              ) : null}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {actions}
              <ReturnToDeckButton fallback={fallback} />
            </div>
          </div>
          {children}
        </div>
      </div>
    </Suspense>
  );
}