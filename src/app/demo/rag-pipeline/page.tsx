"use client";

import { useMemo, useState } from "react";
import { DemoShell } from "@/components/demos/DemoShell";
import { ragCandidates } from "@/data/shopflow";

const STEPS = [
  "Question",
  "Retrieve evidence",
  "Apply metadata filters",
  "Build context",
  "Construct prompt",
  "Generate answer",
  "Map citations",
] as const;

const QUESTION =
  "Why is the payments-service pod restarting, and what should the engineer do?";

export default function RagPipelineDemoPage() {
  const [step, setStep] = useState(0);

  const filtered = useMemo(
    () =>
      ragCandidates.filter(
        (doc) =>
          doc.service === "payments-service" &&
          doc.environment === "production" &&
          doc.status === "current",
      ),
    [],
  );

  const rejected = useMemo(
    () => ragCandidates.filter((doc) => !filtered.some((f) => f.id === doc.id)),
    [filtered],
  );

  const orderedContext = [
    "application.log",
    "deployment-production.yaml",
    "incident-1042.md",
    "payments-runbook.md",
  ];

  const reset = () => setStep(0);
  const runAll = () => setStep(STEPS.length - 1);

  return (
    <DemoShell
      title="RAG Pipeline Explorer"
      subtitle="Deterministic seven-step walkthrough of evidence becoming a grounded answer."
      fallback="/session-3/deck?slide=9"
      actions={
        <>
          <button type="button" className="btn-secondary" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>
            Previous
          </button>
          <button type="button" className="btn-secondary" onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))} disabled={step === STEPS.length - 1}>
            Next
          </button>
          <button type="button" className="btn-primary" onClick={runAll}>
            Run all
          </button>
          <button type="button" className="btn-secondary" onClick={reset}>
            Reset
          </button>
        </>
      }
    >
      <div className="mb-6 flex flex-wrap gap-2">
        {STEPS.map((label, index) => (
          <button
            key={label}
            type="button"
            onClick={() => setStep(index)}
            className={`rounded-lg px-3 py-2 text-sm font-semibold ${
              index === step
                ? "bg-accent text-white"
                : index < step
                  ? "bg-grounded-soft text-grounded"
                  : "bg-white text-ink-muted border border-ink/10"
            }`}
          >
            {index + 1}. {label}
          </button>
        ))}
      </div>

      <div className="demo-panel min-h-[420px]">
        {step === 0 && (
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Question</p>
            <p className="mt-4 font-display text-3xl font-semibold">{QUESTION}</p>
            <p className="mt-6 text-ink-soft">
              We already know how relevant information is retrieved. Now watch how retrieved
              evidence becomes a grounded LLM response.
            </p>
          </div>
        )}

        {step === 1 && (
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
              Retrieved candidates
            </p>
            <p className="mt-2 text-sm text-ink-muted">Simulated teaching scores</p>
            <ul className="mt-6 space-y-3">
              {ragCandidates.map((doc) => (
                <li key={doc.id} className="flex items-center justify-between rounded-xl border border-ink/10 bg-canvas px-4 py-3">
                  <span className="font-medium">{doc.name}</span>
                  <span className="font-mono text-accent">{doc.score.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {step === 2 && (
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
              Metadata filters
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="chip">service = payments-service</span>
              <span className="chip">environment = production</span>
              <span className="chip">status = current</span>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div>
                <p className="mb-3 font-semibold text-grounded">Kept</p>
                <ul className="space-y-2">
                  {filtered.map((doc) => (
                    <li key={doc.id} className="rounded-lg bg-grounded-soft px-3 py-2">
                      {doc.name}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-3 font-semibold text-blocked">Rejected</p>
                <ul className="space-y-2">
                  {rejected.map((doc) => (
                    <li key={doc.id} className="rounded-lg bg-blocked-soft px-3 py-2">
                      <div>{doc.name}</div>
                      <div className="text-sm text-blocked">{doc.rejectedReason}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
              Constructed context order
            </p>
            <ol className="mt-6 space-y-3 text-lg">
              {orderedContext.map((name, i) => (
                <li key={name} className="flow-step">
                  {i + 1}. {name}
                </li>
              ))}
            </ol>
            <p className="mt-6 text-ink-soft">
              Runtime evidence → configuration → history → approved procedure.
            </p>
          </div>
        )}

        {step === 4 && (
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
              Prompt constraints
            </p>
            <ul className="mt-6 space-y-3 text-lg">
              {[
                "Use only supplied evidence.",
                "Separate facts from likely causes.",
                "Label recommendations.",
                "Show uncertainty.",
                "Do not claim execution.",
                "Cite important claims.",
              ].map((item) => (
                <li key={item} className="flow-step">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {step >= 5 && (
          <div className="space-y-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
                Generated answer
              </p>
              <div className="mt-4 space-y-4">
                <section className="rounded-xl border border-grounded/20 bg-grounded-soft p-4">
                  <h3 className="font-semibold text-grounded">Observed facts</h3>
                  <p className="mt-2">
                    payments-service in production is in CrashLoopBackOff on v2.4.1. Logs show
                    OOMKilled with ExitCode 137 after memory reached the 512Mi limit.
                  </p>
                </section>
                <section className="rounded-xl border border-warn/20 bg-warn-soft p-4">
                  <h3 className="font-semibold text-warn">Likely cause</h3>
                  <p className="mt-2">
                    Peak traffic likely pushed memory past the configured limit, matching INC-1042.
                  </p>
                </section>
                <section className="rounded-xl border border-accent/20 bg-accent-soft p-4">
                  <h3 className="font-semibold text-accent">Recommended next steps</h3>
                  <ol className="mt-2 list-decimal space-y-1 pl-5">
                    <li>Confirm OOMKilled and compare usage with limits.</li>
                    <li>Obtain Platform On-Call approval.</li>
                    <li>Consider rollback with kubectl rollout undo.</li>
                    <li>Verify rollout status after approval.</li>
                  </ol>
                </section>
                <section className="rounded-xl border border-ink/10 bg-canvas p-4">
                  <h3 className="font-semibold">Uncertainty</h3>
                  <p className="mt-2">
                    Live confirmation of current restart count and memory trend would strengthen the recommendation.
                  </p>
                </section>
              </div>
            </div>

            {step === 6 && (
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
                  Sources
                </p>
                <ul className="mt-3 space-y-2">
                  {orderedContext.map((name) => (
                    <li key={name} className="chip">
                      {name}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <p className="badge-blocked text-base">No production action has been executed.</p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
