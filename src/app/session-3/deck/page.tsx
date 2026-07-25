"use client";
import { Suspense } from "react";
import { TeachingDeck } from "@/components/deck";
import { session3Slides } from "@/data/session3-slides";

function Session3Deck() {
  return (
    <TeachingDeck
      title="Building and Debugging RAG"
      sessionLabel="Session 3"
      slides={session3Slides}
      basePath="/session-3/deck"
    />
  );
}

export default function Session3DeckPage() {
  return (
    <Suspense fallback={<div className="slide-shell" />}>
      <Session3Deck />
    </Suspense>
  );
}