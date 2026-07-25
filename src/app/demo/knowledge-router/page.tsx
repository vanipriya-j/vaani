"use client";

import { useMemo, useState } from "react";
import { DemoShell } from "@/components/demos/DemoShell";

type RouteTarget =
  | "CAG"
  | "RAG"
  | "Live Kubernetes API"
  | "Service catalogue"
  | "Human approval";

type Question = {
  id: string;
  text: string;
  route: RouteTarget;
  response: string;
  blocked?: boolean;
};

const QUESTIONS: Question[] = [
  {
    id: "policy",
    text: "What is our rollback approval policy?",
    route: "CAG",
    response:
      "Production changes require explicit human approval. AI may prepare commands for review but may not execute them.",
  },
  {
    id: "history",
    text: "Have we seen this OOMKilled pattern before?",
    route: "RAG",
    response:
      "Yes. INC-1042 affected payments-service after v2.4.1. Peak traffic exceeded the 512Mi limit and the team rolled back to v2.4.0.",
  },
  {
    id: "restart",
    text: "What is the restart count right now?",
    route: "Live Kubernetes API",
    response: "Live query result: payments-service restart count = 6 in production.",
  },
  {
    id: "owner",
    text: "Who owns payments-service?",
    route: "Service catalogue",
    response: "Owner: Payments Platform Team · On-call: Platform On-Call",
  },
  {
    id: "execute",
    text: "Restart the production pod.",
    route: "Human approval",
    response: "Execution blocked. Production restart requires Platform On-Call approval.",
    blocked: true,
  },
];

function routeTone(route: RouteTarget) {
  if (route === "Human approval") return "badge-blocked";
  if (route === "CAG") return "badge-grounded";
  if (route === "RAG") return "badge-warn";
  return "chip";
}

export default function KnowledgeRouterDemoPage() {
  const [selectedId, setSelectedId] = useState(QUESTIONS[0].id);
  const selected = useMemo(
    () => QUESTIONS.find((q) => q.id === selectedId) ?? QUESTIONS[0],
    [selectedId],
  );

  return (
    <DemoShell
      title="Knowledge Router"
      subtitle="Before retrieving, classify the information need."
      fallback="/session-4/deck?slide=16"
      actions={
        <button type="button" className="btn-secondary" onClick={() => setSelectedId(QUESTIONS[0].id)}>
          Reset
        </button>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="demo-panel">
          <h2 className="font-semibold text-accent">Questions</h2>
          <ul className="mt-4 space-y-3">
            {QUESTIONS.map((q) => (
              <li key={q.id}>
                <button
                  type="button"
                  onClick={() => setSelectedId(q.id)}
                  className={`w-full rounded-xl border px-4 py-3 text-left transition ${
                    selectedId === q.id
                      ? "border-accent bg-accent-soft"
                      : "border-ink/10 bg-canvas hover:border-accent/30"
                  }`}
                >
                  {q.text}
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section className="demo-panel space-y-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-ink-muted">
              Selected route
            </p>
            <p className="mt-3">
              <span className={`${routeTone(selected.route)} text-base`}>{selected.route}</span>
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-ink-muted">
              System response
            </p>
            <p className="mt-3 text-lg leading-relaxed">{selected.response}</p>
          </div>

          {selected.blocked ? (
            <p className="badge-blocked text-base">Execution blocked</p>
          ) : (
            <p className="badge-grounded text-base">Read / recommend path available</p>
          )}

          <div className="rounded-xl border border-ink/10 bg-canvas p-4 text-sm text-ink-soft">
            Flow: Question → Classify → Select source → Gather evidence → Apply policy → Respond
          </div>
        </section>
      </div>
    </DemoShell>
  );
}
