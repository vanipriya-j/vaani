"use client";

import { useMemo, useState } from "react";
import { DemoShell } from "@/components/demos/DemoShell";

type ModeId =
  | "good"
  | "bad-chunking"
  | "wrong-metadata"
  | "top-k"
  | "outdated"
  | "too-much"
  | "weak-prompt"
  | "no-citations";

type Mode = {
  id: ModeId;
  label: string;
  evidence: string[];
  answer: string;
  failed: string;
  fix: string;
  category: string;
};

const QUESTION = "Why is payments-service restarting, and what should we do?";

const MODES: Mode[] = [
  {
    id: "good",
    label: "Good configuration",
    evidence: [
      "application.log (OOMKilled)",
      "deployment-production.yaml (512Mi limit)",
      "incident-1042.md",
      "payments-runbook.md",
      "security-policy.md",
    ],
    answer:
      "Facts: OOMKilled after memory hit 512Mi. Likely cause: v2.4.1 under peak load. Recommendation: obtain approval, then consider rollback. Sources cited.",
    failed: "Nothing critical failed.",
    fix: "Keep filters, procedure-aware chunks, constrained prompts and citations.",
    category: "Healthy baseline",
  },
  {
    id: "bad-chunking",
    label: "Bad chunking",
    evidence: ["payments-runbook.md fragment: kubectl rollout undo ..."],
    answer: "Run kubectl rollout undo deployment/payments-service immediately.",
    failed: "Diagnostic checks and approval requirements were split away from the command.",
    fix: "Chunk by procedure so condition, checks, action and verification stay together.",
    category: "Chunking / completeness",
  },
  {
    id: "wrong-metadata",
    label: "Wrong metadata",
    evidence: ["staging-runbook.md (environment=staging)"],
    answer: "Restart the pod in staging without approval.",
    failed: "Environment metadata was ignored, so staging guidance entered production context.",
    fix: "Filter by environment=production and service=payments-service before context build.",
    category: "Metadata / applicability",
  },
  {
    id: "top-k",
    label: "Top K = 1",
    evidence: ["application.log only"],
    answer: "The container was OOMKilled. Increase memory.",
    failed: "Too little evidence. Runbook, policy and incident history never entered context.",
    fix: "Raise Top K or use hybrid retrieval until diagnosis and remediation evidence are present.",
    category: "Retrieval coverage",
  },
  {
    id: "outdated",
    label: "Outdated document",
    evidence: ["outdated-payments-runbook.md (status=outdated)"],
    answer: "Immediately increase the memory limit. Approval is not required.",
    failed: "An outdated unsafe source was treated as authoritative.",
    fix: "Filter status=current and prefer approved runbooks over deprecated copies.",
    category: "Authority / freshness",
  },
  {
    id: "too-much",
    label: "Too much context",
    evidence: [
      "application.log",
      "orders-service notes",
      "notification-service notes",
      "staging-runbook.md",
      "Redis capacity notes",
      "unrelated postmortems",
    ],
    answer: "Possibly Redis pressure, notification backlog, or payments memory — try several remediations.",
    failed: "Noisy context diluted the signal and blurred the recommendation.",
    fix: "Filter aggressively and order a small evidence set before prompting.",
    category: "Context construction",
  },
  {
    id: "weak-prompt",
    label: "Weak prompt",
    evidence: [
      "application.log",
      "deployment-production.yaml",
      "payments-runbook.md",
      "security-policy.md",
    ],
    answer: "Just increase limits and restart production now.",
    failed: "The prompt did not force fact/inference/recommendation boundaries or approval constraints.",
    fix: "Constrain the prompt: use only evidence, label claims, cite sources, never claim execution.",
    category: "Prompt control",
  },
  {
    id: "no-citations",
    label: "No citations",
    evidence: ["application.log", "incident-1042.md", "payments-runbook.md"],
    answer: "This is definitely a memory leak. Roll back immediately.",
    failed: "Claims cannot be inspected against sources, so overconfident advice looks authoritative.",
    fix: "Require citations for important facts and recommendations.",
    category: "Inspectability",
  },
];

export default function BreakRagDemoPage() {
  const [modeId, setModeId] = useState<ModeId>("good");
  const mode = useMemo(() => MODES.find((m) => m.id === modeId) ?? MODES[0], [modeId]);

  return (
    <DemoShell
      title="Break RAG"
      subtitle="Keep the question fixed. Change one pipeline condition."
      fallback="/session-3/deck?slide=23"
      actions={
        <button type="button" className="btn-secondary" onClick={() => setModeId("good")}>
          Reset
        </button>
      }
    >
      <div className="demo-panel mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Question</p>
        <p className="mt-3 text-2xl font-semibold">{QUESTION}</p>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {MODES.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setModeId(m.id)}
            className={modeId === m.id ? "btn-primary px-4 py-2 text-sm" : "btn-secondary px-4 py-2 text-sm"}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="demo-panel">
          <h2 className="font-semibold text-accent">Retrieved evidence</h2>
          <ul className="mt-4 space-y-2">
            {mode.evidence.map((item) => (
              <li key={item} className="rounded-lg bg-canvas px-3 py-2">
                {item}
              </li>
            ))}
          </ul>
        </section>
        <section className="demo-panel">
          <h2 className="font-semibold text-accent">Generated answer</h2>
          <p className="mt-4 text-lg leading-relaxed">{mode.answer}</p>
        </section>
        <section className="demo-panel">
          <h2 className="font-semibold text-blocked">What failed</h2>
          <p className="mt-4 text-lg">{mode.failed}</p>
        </section>
        <section className="demo-panel">
          <h2 className="font-semibold text-grounded">How to fix it</h2>
          <p className="mt-4 text-lg">{mode.fix}</p>
          <p className="mt-4">
            <span className="badge-warn">Failure category: {mode.category}</span>
          </p>
        </section>
      </div>
    </DemoShell>
  );
}
