"use client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { TeachingSlide } from "./TeachingSlide";

export function DemoLaunchSlide({
  title,
  children,
  buttonLabel,
  href,
}: {
  title: string;
  children?: ReactNode;
  buttonLabel: string;
  href: string;
}) {
  return (
    <TeachingSlide>
      <p className="eyebrow">Interactive demo</p>
      <h1 className="slide-title">{title}</h1>
      {children ? <div className="mt-8 space-y-6">{children}</div> : null}
      <div className="mt-10">
        <Link href={href} className="btn-primary text-lg">
          {buttonLabel}
          <ArrowUpRight className="h-5 w-5" />
        </Link>
      </div>
    </TeachingSlide>
  );
}