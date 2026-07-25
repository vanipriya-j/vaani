"use client";
import { Suspense } from "react";
import { TeachingDeck } from "@/components/deck";
import { session4Slides } from "@/data/session4-slides";

function Session4Deck() {
  return (
    <TeachingDeck
      title="CAG and Enterprise Knowledge Systems"
      sessionLabel="Session 4"
      slides={session4Slides}
      basePath="/session-4/deck"
    />
  );
}

export default function Session4DeckPage() {
  return (
    <Suspense fallback={<div className="slide-shell" />}>
      <Session4Deck />
    </Suspense>
  );
}