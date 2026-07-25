"use client";

import { useState } from "react";
import { DemoShell } from "@/components/demos/DemoShell";

type Mode = "fixed" | "heading" | "procedure";

const QUESTION = "What should I check before rolling back payments-service?";

export default function ChunkingDemoPage() {
  const [mode, setMode] = useState<Mode>("fixed");

  return (
    <DemoShell
      title="Chunking Studio"
      subtitle="Chunking should preserve operational meaning."
      fallback="/session-3/deck?slide=20"
      actions={
        <button type="button" className="btn-secondary" onClick={() => setMode("fixed")}>
          Reset
        </button>
      }
    >
      <div className="demo-panel mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Question</p>
        <p className="mt-3 font-display text-2xl font-semibold md:text-3xl">{QUESTION}</p>
      </div>

      <div className="mb-6 flex flex-wrap gap-3">
        {(
          [
            ["fixed", "Fixed size"],
            ["heading", "By heading"],
            ["procedure", "By procedure"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setMode(id)}
            className={mode === id ? "btn-primary" : "btn-secondary"}
          >
            {label}
          </button>
        ))}
      </div>

      {mode === "fixed" && (
        <div className="demo-panel space-y-4">
          <span className="badge-blocked text-base">Unsafe and incomplete</span>
          <p className="text-lg text-ink-soft">Retrieved chunk:</p>
          <pre className="code-block">kubectl rollout undo deployment/payments-service -n production</pre>
          <p>
            Fixed-size chunking isolated the command and dropped prerequisites, approval and verification.
          </p>
        </div>
      )}

      {mode === "heading" && (
        <div className="demo-panel space-y-4">
          <span className="badge-warn text-base">Better, still incomplete</span>
          <p className="text-lg text-ink-soft">Retrieved under “Remediation”:</p>
          <pre className="code-block">{`If the latest deployment caused the issue, use:

kubectl rollout undo deployment/payments-service -n production

7. Verify the rollout using:

kubectl rollout status deployment/payments-service -n production`}</pre>
          <p>
            Heading-based chunking keeps related steps together, but may still separate diagnostic checks from action.
          </p>
        </div>
      )}

      {mode === "procedure" && (
        <div className="demo-panel space-y-4">
          <span className="badge-grounded text-base">Coherent and grounded</span>
          <p className="text-lg text-ink-soft">Retrieved procedure unit:</p>
          <ul className="space-y-3 text-lg">
            <li className="flow-step">Diagnostic checks: status, logs, OOMKilled, memory vs limits</li>
            <li className="flow-step">Remediation procedure: approved rollback path</li>
            <li className="flow-step">Approval requirement: Platform On-Call</li>
            <li className="flow-step">Verification: rollout status after undo</li>
          </ul>
          <p className="font-semibold text-grounded">
            Chunking should preserve operational meaning.
          </p>
        </div>
      )}
    </DemoShell>
  );
}
