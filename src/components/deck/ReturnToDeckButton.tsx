"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export function ReturnToDeckButton({
  fallback = "/",
}: {
  fallback?: string;
}) {
  const searchParams = useSearchParams();
  const raw = searchParams.get("returnTo") || fallback;
  const returnTo = raw.startsWith("/") ? raw : fallback;

  return (
    <Link href={returnTo} className="btn-secondary">
      Return to Teaching Deck
    </Link>
  );
}
