"use client";

import { useState } from "react";
import { DemoShell } from "@/components/demos/DemoShell";

type Verdict = "Best choice" | "Possible but inefficient" | "Insufficient" | "Incorrect";

type Comparison = {
  question: string;
  lanes: Array<{
    name: "CAG" | "RAG" | "Live tool";
    verdict: Verdict;
    reason: string;
  }>;
};

const COMPARISONS: Comparison[] = [
  {
    question: "What is our standard rollback policy?",
    lanes: [
      {
        name: "CAG",
        verdict: "Best choice",
        reason: "Small, stable, approved policy reused constantly.",
      },
      {
        name: "RAG",
        verdict: "Possible but inefficient",
        reason: "Could retrieve the policy, but caching avoids repeated search.",
      },
      {
        name: "Live tool",
        verdict: "Incorrect",
        reason: "Policy is not an operational state endpoint.",
      },
    ],
  },
  {
    question: "What happened during INC-1042?",
    lanes: [
      {
        name: "CAG",
        verdict: "Incorrect",
        reason: "Caching thousands of incidents does not scale.",
      },
      {
        name: "RAG",
        verdict: "Best choice",
        reason: "Historical incident knowledge is large, changing and searchable.",
      },
      {
        name: "Live tool",
        verdict: "Insufficient",
        reason: "Live APIs do not store historical narrative.",
      },
    ],
  },
  {
    question: "What is the current status of the payments pod?",
    lanes: [
      {
        name: "CAG",
        verdict: "Incorrect",
        reason: "Cached text cannot be current operational truth.",
      },
      {
        name: "RAG",
        verdict: "Insufficient",
        reason: "Documents describe the past, not the present restart count.",
      },
      {
        name: "Live tool",
        verdict: "Best choice",
        reason: "Current state must come from Kubernetes or observability APIs.",
      },
    ],
  },
];

function verdictClass(verdict: Verdict) {
  switch (verdict) {
    case "Best choice":
      return "badge-grounded";
    case "Possible but inefficient":
      return "badge-warn";
    case "Insufficient":
      return "badge-warn";
    case "Incorrect":
      return "badge-blocked";
  }
}

export default function RagVsCagDemoPage() {
  const [index, setIndex] = useState(0);
  const item = COMPARISONS[index];

  return (
    <DemoShell
      title="RAG vs CAG Explorer"
      subtitle="Choose the correct knowledge architecture for each information need."
      fallback="/session-4/deck?slide=11"
      actions={
        <>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            disabled={index === 0}
          >
            Previous
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => setIndex((i) => Math.min(COMPARISONS.length - 1, i + 1))}
            disabled={index === COMPARISONS.length - 1}
          >
            Next
          </button>
          <button type="button" className="btn-secondary" onClick={() => setIndex(0)}>
            Reset
          </button>
        </>
      }
    >
      <div className="mb-6 flex flex-wrap gap-2">
        {COMPARISONS.map((c, i) => (
          <button
            key={c.question}
            type="button"
            onClick={() => setIndex(i)}
            className={index === i ? "btn-primary px-4 py-2 text-sm" : "btn-secondary px-4 py-2 text-sm"}
          >
            Question {i + 1}
          </button>
        ))}
      </div>

      <div className="demo-panel mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Question</p>
        <p className="mt-3 font-display text-2xl font-semibold md:text-3xl">{item.question}</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {item.lanes.map((lane) => (
          <section key={lane.name} className="demo-panel">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl font-semibold">{lane.name}</h2>
              <span className={`${verdictClass(lane.verdict)} text-sm`}>{lane.verdict}</span>
            </div>
            <p className="mt-4 text-lg text-ink-soft">{lane.reason}</p>
          </section>
        ))}
      </div>
    </DemoShell>
  );
}
