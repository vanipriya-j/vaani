"use client";

import { createContext, useContext, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type RevealContextValue = {
  step: number;
};

const RevealContext = createContext<RevealContextValue>({ step: 0 });

export function RevealProvider({
  step,
  children,
}: {
  step: number;
  children: ReactNode;
}) {
  return (
    <RevealContext.Provider value={{ step }}>{children}</RevealContext.Provider>
  );
}

export function useRevealStep() {
  return useContext(RevealContext).step;
}

export function Reveal({
  index,
  children,
  className,
  as: Tag = "div",
}: {
  index: number;
  children: ReactNode;
  className?: string;
  as?: "div" | "span" | "li" | "p";
}) {
  const step = useRevealStep();
  if (step < index) return null;

  return <Tag className={cn("animate-fade-up", className)}>{children}</Tag>;
}
