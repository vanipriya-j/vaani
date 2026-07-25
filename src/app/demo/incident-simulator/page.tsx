"use client";

import { useMemo, useState } from "react";
import { DemoShell } from "@/components/demos/DemoShell";
import {
  applicationLog,
  deploymentYaml,
  incident1042,
  mainIncident,
  paymentsRunbook,
} from "@/data/shopflow";

type EvidenceKey = "runbook" | "incident" | "yaml" | "k8s";

const ACTIONS: Array<{ key: EvidenceKey; label: string }> = [
  { key: "runbook", label: "Retrieve Runbook" },
  { key: "incident", label: "Retrieve Similar Incident" },
  { key: "yaml", label: "Inspect Deployment YAML" },
  { key: "k8s", label: "Query Kubernetes State" },
];

export default function IncidentSimulatorDemoPage() {
  const [gathered, setGathered] = useState<Record<EvidenceKey, boolean>>({
    runbook: false,
    incident: false,
    yaml: false,
    k8s: false,
  });
  const [recommendationOpen, setRecommendationOpen] = useState(false);
  const [approvalRequested, setApprovalRequested] = useState(false);

  const count = useMemo(
    () => Object.values(gathered).filter(Boolean).length,
    [gathered],
  );

  const stage =
    count === 0
      ? "Insufficient evidence"
      : count < 4
        ? "Partial evidence"
        : "Strong evidence";

  const stageClass =
    stage === "Insufficient evidence"
      ? "badge-blocked"
      : stage === "Partial evidence"
        ? "badge-warn"
        : "badge-grounded";

  const reset = () => {
    setGathered({
      runbook: false,
      incident: false,
      yaml: false,
      k8s: false,
    });
    setRecommendationOpen(false);
    setApprovalRequested(false);
  };

  const collect = (key: EvidenceKey) => {
    setGathered((prev) => ({ ...prev, [key]: true }));
  };

  return (
    <DemoShell
      title="Incident Simulator"
      subtitle="Investigate before acting. Execution remains governed."
      fallback="/session-4/deck?slide=20"
      actions={
        <button type="button" className="btn-secondary" onClick={reset}>
          Reset
        </button>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="demo-panel space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
            Initial state
          </p>
          <div className="code-block text-base">
            <div>Service: {mainIncident.service}</div>
            <div>Environment: {mainIncident.environment}</div>
            <div>Status: {mainIncident.status}</div>
            <div>Restart count: {mainIncident.restartCount}</div>
            <div>Version: {mainIncident.version}</div>
          </div>

          <p className={stageClass}>{stage}</p>

          <div className="space-y-3">
            {ACTIONS.map((action) => (
              <button
                key={action.key}
                type="button"
                className="btn-secondary w-full justify-between"
                onClick={() => collect(action.key)}
                disabled={gathered[action.key]}
              >
                <span>{action.label}</span>
                <span className="text-sm text-ink-muted">
                  {gathered[action.key] ? "Collected" : "Collect"}
                </span>
              </button>
            ))}
          </div>

          <button
            type="button"
            className="btn-primary w-full"
            disabled={count < 4}
            onClick={() => setRecommendationOpen(true)}
          >
            Generate Recommendation
          </button>
        </section>

        <section className="space-y-4">
          <div className="demo-panel">
            <h2 className="font-semibold text-accent">Evidence locker</h2>
            <div className="mt-4 space-y-3">
              {!gathered.runbook &&
              !gathered.incident &&
              !gathered.yaml &&
              !gathered.k8s ? (
                <p className="text-ink-soft">No evidence gathered yet.</p>
              ) : null}

              {gathered.runbook ? (
                <details open className="rounded-xl bg-canvas p-4">
                  <summary className="cursor-pointer font-semibold">payments-runbook.md</summary>
                  <pre className="mt-3 whitespace-pre-wrap font-mono text-sm">{paymentsRunbook}</pre>
                </details>
              ) : null}

              {gathered.incident ? (
                <details open className="rounded-xl bg-canvas p-4">
                  <summary className="cursor-pointer font-semibold">incident-1042.md</summary>
                  <pre className="mt-3 whitespace-pre-wrap font-mono text-sm">{incident1042}</pre>
                </details>
              ) : null}

              {gathered.yaml ? (
                <details open className="rounded-xl bg-canvas p-4">
                  <summary className="cursor-pointer font-semibold">
                    deployment-production.yaml
                  </summary>
                  <pre className="mt-3 whitespace-pre-wrap font-mono text-sm">{deploymentYaml}</pre>
                </details>
              ) : null}

              {gathered.k8s ? (
                <details open className="rounded-xl bg-canvas p-4">
                  <summary className="cursor-pointer font-semibold">
                    Live Kubernetes state + logs
                  </summary>
                  <pre className="mt-3 whitespace-pre-wrap font-mono text-sm">{`status: CrashLoopBackOff
restartCount: 6
lastTerminationReason: OOMKilled

${applicationLog}`}</pre>
                </details>
              ) : null}
            </div>
          </div>

          {recommendationOpen ? (
            <div className="demo-panel space-y-4">
              <h2 className="font-semibold text-grounded">Recommendation</h2>
              <ol className="list-decimal space-y-2 pl-5 text-lg">
                <li>Obtain Platform On-Call approval.</li>
                <li>Roll back payments-service.</li>
                <li>Verify rollout status.</li>
                <li>Monitor restart count and memory.</li>
                <li>Profile v2.4.1 before redeployment.</li>
              </ol>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => setApprovalRequested(true)}
                >
                  Request Human Approval
                </button>
                <button type="button" className="btn-danger" disabled>
                  Execute Action
                </button>
              </div>

              {approvalRequested ? (
                <p className="badge-warn text-base">
                  Approval requested. Waiting for Platform On-Call.
                </p>
              ) : null}

              <p className="badge-blocked text-base">
                No production action has been executed.
              </p>
            </div>
          ) : (
            <div className="demo-panel text-ink-soft">
              Gather all evidence to enable recommendation generation.
            </div>
          )}
        </section>
      </div>
    </DemoShell>
  );
}
