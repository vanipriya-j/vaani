export const company = {
  name: "ShopFlow",
  services: [
    "payments-service",
    "orders-service",
    "notification-service",
    "Redis",
    "PostgreSQL",
  ],
  environments: ["production", "staging"],
} as const;

export const mainIncident = {
  service: "payments-service",
  environment: "production",
  status: "CrashLoopBackOff",
  version: "v2.4.1",
  restartCount: 6,
} as const;

export const applicationLog = `2026-07-24T10:12:10Z INFO Payment worker started
2026-07-24T10:12:42Z INFO Active payment requests=318
2026-07-24T10:13:02Z WARN Memory usage reached 487Mi
2026-07-24T10:13:08Z WARN Memory usage reached 508Mi
2026-07-24T10:13:11Z ERROR Container terminated
2026-07-24T10:13:11Z ERROR Reason=OOMKilled ExitCode=137
2026-07-24T10:13:20Z INFO Kubernetes restarting container`;

export const deploymentYaml = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: payments-service
  namespace: production
spec:
  replicas: 3
  template:
    spec:
      containers:
        - name: payments
          image: shopflow/payments:v2.4.1
          resources:
            requests:
              memory: "256Mi"
              cpu: "250m"
            limits:
              memory: "512Mi"
              cpu: "500m"`;

export const incident1042 = `INC-1042 affected payments-service after v2.4.1 was deployed.

During peak traffic, memory usage increased rapidly.

The pod exceeded its configured 512Mi memory limit.

Kubernetes terminated the container with OOMKilled.

The team rolled back to v2.4.0.

The long-term recommendation was to profile v2.4.1 for memory leaks before increasing production limits.`;

export const paymentsRunbook = `When payments-service pods repeatedly restart:

1. Check pod status and restart count.
2. Inspect previous container logs.
3. Confirm whether the container was terminated with OOMKilled.
4. Compare current memory usage with configured requests and limits.
5. Do not immediately increase production limits.
6. If the latest deployment caused the issue, use:

kubectl rollout undo deployment/payments-service -n production

7. Verify the rollout using:

kubectl rollout status deployment/payments-service -n production

Any production change requires Platform On-Call approval.`;

export const securityPolicy = `Production changes require explicit human approval.

AI assistants may:

- read approved documentation
- retrieve incident history
- inspect read-only operational state
- recommend actions
- prepare commands for review

AI assistants may not:

- restart production workloads
- apply Kubernetes manifests
- change resource limits
- modify infrastructure

without explicit human approval.`;

export const stagingRunbook = `Engineers may restart staging pods without formal approval.

kubectl rollout restart deployment/payments-service -n staging`;

export const outdatedPaymentsRunbook = `Immediately increase the memory limit and restart the production deployment.

Approval is not required.`;

export type EvidenceDoc = {
  id: string;
  name: string;
  type: string;
  service: string;
  environment: string;
  status: "current" | "outdated";
  score: number;
  content: string;
  rejectedReason?: string;
};

export const ragCandidates: EvidenceDoc[] = [
  {
    id: "application.log",
    name: "application.log",
    type: "log",
    service: "payments-service",
    environment: "production",
    status: "current",
    score: 0.94,
    content: applicationLog,
  },
  {
    id: "incident-1042.md",
    name: "incident-1042.md",
    type: "incident",
    service: "payments-service",
    environment: "production",
    status: "current",
    score: 0.91,
    content: incident1042,
  },
  {
    id: "deployment-production.yaml",
    name: "deployment-production.yaml",
    type: "yaml",
    service: "payments-service",
    environment: "production",
    status: "current",
    score: 0.86,
    content: deploymentYaml,
  },
  {
    id: "payments-runbook.md",
    name: "payments-runbook.md",
    type: "runbook",
    service: "payments-service",
    environment: "production",
    status: "current",
    score: 0.81,
    content: paymentsRunbook,
  },
  {
    id: "staging-runbook.md",
    name: "staging-runbook.md",
    type: "runbook",
    service: "payments-service",
    environment: "staging",
    status: "current",
    score: 0.77,
    content: stagingRunbook,
    rejectedReason: "Wrong environment",
  },
  {
    id: "outdated-payments-runbook.md",
    name: "outdated-payments-runbook.md",
    type: "runbook",
    service: "payments-service",
    environment: "production",
    status: "outdated",
    score: 0.72,
    content: outdatedPaymentsRunbook,
    rejectedReason: "Outdated and unsafe",
  },
];
