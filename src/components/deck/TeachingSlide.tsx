"use client";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function TeachingSlide({
  children,
  className,
  centered = true,
}: {
  children: ReactNode;
  className?: string;
  centered?: boolean;
}) {
  return (
    <div
      className={cn(
        "slide-content",
        centered && "items-start",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </div>
  );
}