import { DemoLaunchSlide, Reveal, TeachingSlide } from "@/components/deck";
import type { SlideDefinition } from "@/types/deck";

export const session4Slides: SlideDefinition[] = [
  {
    id: "title",
    reveals: 0,
    notes: {
      whatToSay:
        "Today we ask what should be cached, retrieved, fetched live or sent for approval.",
      questionToAsk: "Should every DevOps question use RAG?",
      expectedResponse: "No — architecture depends on the information need.",
      transition: "Start with yesterday’s model.",
    },
    content: (
      <TeachingSlide>
        <p className="eyebrow">Agentic AI in DevOps · Session 4</p>
        <h1 className="slide-title">CAG and Enterprise Knowledge Systems</h1>
        <p className="slide-subtitle">
          What should be cached, retrieved, fetched live or sent for approval?
        </p>
      </TeachingSlide>
    ),
  },
  {
    id: "recap",
    reveals: 1,
    notes: {
      whatToSay: "Yesterday we built a retrieve → context → generate loop.",
      questionToAsk: "Should every question follow this path?",
      expectedResponse: "No.",
      transition: "Three questions expose three architectures.",
    },
    content: (
      <TeachingSlide>
        <h1 className="slide-title">Yesterday’s model</h1>
        <div className="mt-10 flex flex-wrap items-center gap-3 text-xl md:text-2xl">
          {["Question", "Retrieve Evidence", "Build Context", "Generate Grounded Answer"].map(
            (step, i, arr) => (
              <span key={step} className="contents">
                <span className="flow-step">{step}</span>
                {i < arr.length - 1 ? <span className="text-ink-muted">→</span> : null}
              </span>
            ),
          )}
        </div>
        <p className="mt-10 text-2xl font-medium">
          Should every question follow this path?
        </p>
        <Reveal index={1} className="mt-6">
          <p className="font-display text-4xl font-semibold text-blocked">No.</p>
        </Reveal>
      </TeachingSlide>
    ),
  },
  {
    id: "three-questions",
    reveals: 2,
    notes: {
      whatToSay: "Policy, history and live state are different information needs.",
      questionToAsk: "Would you answer all three from a vector database?",
      expectedResponse: "No.",
      transition: "Introduce the five-lane enterprise model.",
    },
    content: (
      <TeachingSlide>
        <h1 className="slide-title">Three questions. Three architectures.</h1>
        <Reveal index={1}>
          <ol className="mt-10 space-y-4 text-2xl md:text-3xl">
            <li className="flow-step">1. What is our standard rollback policy?</li>
            <li className="flow-step">2. What happened during INC-1042?</li>
            <li className="flow-step">3. What is the restart count right now?</li>
          </ol>
        </Reveal>
        <p className="mt-8 text-xl font-medium">
          Would you answer all three from a vector database?
        </p>
        <Reveal index={2} className="mt-4">
          <p className="font-display text-4xl font-semibold text-blocked">No.</p>
        </Reveal>
      </TeachingSlide>
    ),
  },
  {
    id: "central-model",
    reveals: 0,
    notes: {
      whatToSay: "Stable policy caches. History retrieves. Live state uses tools. Action needs approval.",
      questionToAsk: "Where does the LLM sit?",
      expectedResponse: "In reasoning over assembled evidence — not as the source of truth.",
      transition: "Define CAG.",
    },
    content: (
      <TeachingSlide>
        <h1 className="slide-title mb-10">Five knowledge lanes</h1>
        <div className="space-y-4 text-2xl md:text-3xl">
          {[
            ["Stable policy", "CAG"],
            ["Historical knowledge", "RAG"],
            ["Current operational state", "Live tools"],
            ["Reasoning", "LLM"],
            ["Production execution", "Human approval"],
          ].map(([left, right]) => (
            <div key={left} className="flow-step flex items-center justify-between gap-4">
              <span>{left}</span>
              <span className="text-accent">→ {right}</span>
            </div>
          ))}
        </div>
      </TeachingSlide>
    ),
  },
  {
    id: "cag-definition",
    reveals: 1,
    notes: {
      whatToSay: "CAG keeps a small approved body of knowledge ready in context.",
      questionToAsk: "What qualities make knowledge suitable for CAG?",
      expectedResponse: "Small, stable, controlled, frequently reused.",
      transition: "Use the library versus handbook analogy.",
    },
    content: (
      <TeachingSlide>
        <h1 className="slide-title">CAG: Cache-Augmented Generation</h1>
        <p className="mt-8 font-display text-3xl font-semibold leading-snug text-ink md:text-4xl">
          Keep a small, approved and repeatedly used body of knowledge ready in context.
        </p>
        <Reveal index={1} className="mt-10 flex flex-wrap gap-3">
          {["Small", "Stable", "Controlled", "Frequently reused"].map((item) => (
            <span key={item} className="chip text-lg">
              {item}
            </span>
          ))}
        </Reveal>
      </TeachingSlide>
    ),
  },
  {
    id: "analogy",
    reveals: 0,
    notes: {
      whatToSay: "RAG searches the library. CAG keeps the handbook open.",
      questionToAsk: "When is searching unnecessary?",
      expectedResponse: "When the same approved rules are needed on almost every turn.",
      transition: "List good CAG candidates.",
    },
    content: (
      <TeachingSlide>
        <h1 className="slide-title">
          RAG searches the library. CAG keeps the handbook open.
        </h1>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-ink/10 bg-white/80 p-8">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-accent">
              RAG
            </p>
            <p className="text-2xl font-medium">
              Find relevant knowledge when the question arrives.
            </p>
          </div>
          <div className="rounded-2xl border border-ink/10 bg-white/80 p-8">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-grounded">
              CAG
            </p>
            <p className="text-2xl font-medium">Reuse preloaded approved context.</p>
          </div>
        </div>
      </TeachingSlide>
    ),
  },
  {
    id: "cag-examples",
    reveals: 2,
    notes: {
      whatToSay: "Policies and conventions are good CAG candidates.",
      questionToAsk: "Would you cache thousands of incidents?",
      expectedResponse: "No. That is a retrieval problem.",
      transition: "Contrast with RAG candidates.",
    },
    content: (
      <TeachingSlide>
        <h1 className="slide-title">Good candidates for CAG</h1>
        <Reveal index={1}>
          <ul className="mt-8 grid gap-3 text-xl md:grid-cols-2 md:text-2xl">
            {[
              "production safety policy",
              "escalation rules",
              "naming conventions",
              "approved response structure",
              "stable deployment controls",
            ].map((item) => (
              <li key={item} className="flow-step">
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
        <p className="mt-8 text-xl font-medium">Would you cache thousands of incidents?</p>
        <Reveal index={2} className="mt-4">
          <p className="font-display text-3xl font-semibold text-blocked">
            No. That is a retrieval problem.
          </p>
        </Reveal>
      </TeachingSlide>
    ),
  },
  {
    id: "rag-examples",
    reveals: 1,
    notes: {
      whatToSay: "Large and changing knowledge should be retrieved selectively.",
      questionToAsk: "Why not put all runbooks into CAG?",
      expectedResponse: "They change, grow large and are only sometimes relevant.",
      transition: "Live state is a third category.",
    },
    content: (
      <TeachingSlide>
        <h1 className="slide-title">Good candidates for RAG</h1>
        <Reveal index={1}>
          <ul className="mt-8 grid gap-3 text-xl md:grid-cols-2 md:text-2xl">
            {[
              "incident history",
              "changing runbooks",
              "postmortems",
              "Kubernetes manifests",
              "documentation repositories",
              "log summaries",
            ].map((item) => (
              <li key={item} className="flow-step">
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-xl font-semibold text-ink-soft">
            Large and changing knowledge should be retrieved selectively.
          </p>
        </Reveal>
      </TeachingSlide>
    ),
  },
  {
    id: "live-state",
    reveals: 1,
    notes: {
      whatToSay: "Stored knowledge is not operational truth.",
      questionToAsk: "Where must current restart count come from?",
      expectedResponse: "The live Kubernetes API or observability system.",
      transition: "Launch the RAG vs CAG explorer.",
    },
    content: (
      <TeachingSlide>
        <h1 className="slide-title">Stored knowledge is not operational truth</h1>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <div className="code-block">
            Document:
            <br />
            The pod restarted six times yesterday.
          </div>
          <div className="code-block">
            Live API:
            <br />
            The pod has restarted twice right now.
          </div>
        </div>
        <Reveal index={1} className="mt-10">
          <p className="font-display text-3xl font-semibold text-accent md:text-4xl">
            Current state must come from the current system.
          </p>
        </Reveal>
      </TeachingSlide>
    ),
  },
  {
    id: "demo-rag-vs-cag",
    reveals: 0,
    notes: {
      whatToSay: "Compare architectures for policy, incident and live status questions.",
      questionToAsk: "Which lane wins for each question?",
      expectedResponse: "CAG, RAG, Live tool.",
      transition: "Debrief the architecture decision.",
    },
    content: (
      <DemoLaunchSlide
        title="Choose the correct knowledge architecture"
        buttonLabel="Launch RAG vs CAG Explorer"
        href="/demo/rag-vs-cag?returnTo=/session-4/deck?slide=11"
      >
        <ul className="space-y-3 text-xl md:text-2xl">
          <li className="flow-step">rollback policy</li>
          <li className="flow-step">historical incident</li>
          <li className="flow-step">current pod status</li>
        </ul>
      </DemoLaunchSlide>
    ),
  },
  {
    id: "rag-vs-cag-debrief",
    reveals: 0,
    notes: {
      whatToSay: "Architecture depends on the information need.",
      questionToAsk: "Can learners state the three criteria clearly?",
      expectedResponse: "CAG small/stable; RAG large/changing; tools for current truth.",
      transition: "Enterprise systems combine them.",
    },
    content: (
      <TeachingSlide>
        <h1 className="slide-title">The architecture depends on the information need</h1>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-grounded/20 bg-grounded-soft p-6">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-grounded">
              CAG
            </p>
            <p className="text-2xl font-medium">Small + stable + frequently reused</p>
          </div>
          <div className="rounded-2xl border border-accent/20 bg-accent-soft p-6">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-accent">
              RAG
            </p>
            <p className="text-2xl font-medium">Large + changing + searchable</p>
          </div>
          <div className="rounded-2xl border border-warn/20 bg-warn-soft p-6">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-warn">
              Live tool
            </p>
            <p className="text-2xl font-medium">Current operational truth</p>
          </div>
        </div>
      </TeachingSlide>
    ),
  },
  {
    id: "hybrid-systems",
    reveals: 1,
    notes: {
      whatToSay: "A rollback question may need every lane.",
      questionToAsk: "Which lane decides whether action may proceed?",
      expectedResponse: "Human approval.",
      transition: "Before retrieving, classify the information need.",
    },
    content: (
      <TeachingSlide>
        <h1 className="slide-title">Enterprise systems combine them</h1>
        <p className="mt-6 text-2xl font-medium">
          Should payments-service be rolled back?
        </p>
        <Reveal index={1} className="mt-8 space-y-3 text-xl md:text-2xl">
          {[
            ["CAG", "Approval and safety policy"],
            ["RAG", "Runbook and previous incident"],
            ["Live tool", "Current restart count and termination reason"],
            ["LLM", "Reason over assembled evidence"],
            ["Human", "Approve production action"],
          ].map(([lane, detail]) => (
            <div key={lane} className="flow-step flex justify-between gap-4">
              <span className="font-semibold text-accent">{lane}</span>
              <span>{detail}</span>
            </div>
          ))}
        </Reveal>
      </TeachingSlide>
    ),
  },
  {
    id: "routing",
    reveals: 1,
    notes: {
      whatToSay: "Routing happens before retrieval.",
      questionToAsk: "Why should RAG not be the default route?",
      expectedResponse: "Many questions need cache, live tools or approval instead.",
      transition: "Practice routing questions.",
    },
    content: (
      <TeachingSlide>
        <h1 className="slide-title">Before retrieving, classify the information need</h1>
        <div className="mt-12 flex flex-wrap items-center gap-3 text-xl md:text-2xl">
          {[
            "Question",
            "Classify",
            "Select source",
            "Gather evidence",
            "Apply policy",
            "Respond",
          ].map((step, i, arr) => (
            <span key={step} className="contents">
              <span className="flow-step">{step}</span>
              {i < arr.length - 1 ? <span className="text-ink-muted">→</span> : null}
            </span>
          ))}
        </div>
        <Reveal index={1} className="mt-10">
          <p className="text-xl font-semibold text-ink-soft md:text-2xl">
            RAG should not be the default route for every question.
          </p>
        </Reveal>
      </TeachingSlide>
    ),
  },
  {
    id: "routing-activity",
    reveals: 10,
    notes: {
      whatToSay: "Reveal each question, then its route.",
      questionToAsk: "Where should each question go?",
      expectedResponse: "CAG, RAG, Live API, catalogue, human approval.",
      transition: "Launch the Knowledge Router demo.",
    },
    content: (
      <TeachingSlide>
        <h1 className="slide-title">Where should each question go?</h1>
        <div className="mt-8 space-y-4 text-xl md:text-2xl">
          {[
            ["What is our rollback policy?", "CAG"],
            ["Have we seen OOMKilled before?", "RAG"],
            ["What is the restart count now?", "Live Kubernetes API"],
            ["Who owns payments-service?", "Service catalogue"],
            ["Restart the production pod.", "Human approval workflow"],
          ].map(([q, a], i) => (
            <div key={q} className="space-y-2">
              <Reveal index={i * 2 + 1}>
                <div className="flow-step">{q}</div>
              </Reveal>
              <Reveal index={i * 2 + 2}>
                <div className="badge-grounded text-base">{a}</div>
              </Reveal>
            </div>
          ))}
        </div>
      </TeachingSlide>
    ),
  },
  {
    id: "demo-knowledge-router",
    reveals: 0,
    notes: {
      whatToSay: "Let learners route enterprise questions interactively.",
      questionToAsk: "What happens on a production restart request?",
      expectedResponse: "Execution is blocked pending human approval.",
      transition: "Debrief orchestration.",
    },
    content: (
      <DemoLaunchSlide
        title="Route enterprise questions"
        buttonLabel="Launch Knowledge Router"
        href="/demo/knowledge-router?returnTo=/session-4/deck?slide=16"
      />
    ),
  },
  {
    id: "router-debrief",
    reveals: 1,
    notes: {
      whatToSay: "Enterprise AI is an orchestration problem.",
      questionToAsk: "Is RAG the whole system?",
      expectedResponse: "No — RAG is one route.",
      transition: "Permissions separate read, recommend and execute.",
    },
    content: (
      <TeachingSlide>
        <h1 className="slide-title">Enterprise AI is an orchestration problem</h1>
        <Reveal index={1}>
          <ul className="mt-8 space-y-3 text-xl md:text-2xl">
            {[
              "Some answers come from cached policy.",
              "Some come from retrieved knowledge.",
              "Some come from structured databases.",
              "Some come from live APIs.",
              "Some requests must stop at approval.",
            ].map((item) => (
              <li key={item} className="flow-step">
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-xl font-semibold text-ink-soft">
            RAG is one route, not the whole system.
          </p>
        </Reveal>
      </TeachingSlide>
    ),
  },
  {
    id: "permission-levels",
    reveals: 1,
    notes: {
      whatToSay: "Read, recommend and execute are different permissions.",
      questionToAsk: "Which actions require explicit governance?",
      expectedResponse: "Restart, apply manifests, change limits.",
      transition: "Show a safe incident agent flow.",
    },
    content: (
      <TeachingSlide>
        <h1 className="slide-title">
          Read, recommend and execute are different permissions
        </h1>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-ink/10 bg-white/80 p-6">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-ink-muted">
              Read
            </p>
            <ul className="space-y-2 text-xl">
              <li>inspect documents</li>
              <li>query live state</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-accent/20 bg-accent-soft p-6">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-accent">
              Recommend
            </p>
            <ul className="space-y-2 text-xl">
              <li>explain likely cause</li>
              <li>prepare rollback steps</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-blocked/20 bg-blocked-soft p-6">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-blocked">
              Execute
            </p>
            <ul className="space-y-2 text-xl">
              <li>restart pod</li>
              <li>apply manifest</li>
              <li>change resource limit</li>
            </ul>
            <Reveal index={1} className="mt-4">
              <span className="badge-blocked">Requires explicit governance</span>
            </Reveal>
          </div>
        </div>
      </TeachingSlide>
    ),
  },
  {
    id: "safe-agent-flow",
    reveals: 1,
    notes: {
      whatToSay: "A safe incident agent does not jump to action.",
      questionToAsk: "What unlocks Execute?",
      expectedResponse: "Human approval.",
      transition: "Investigate before acting in the simulator.",
    },
    content: (
      <TeachingSlide>
        <h1 className="slide-title">A safe incident agent does not jump to action</h1>
        <div className="mt-10 flex flex-wrap items-center gap-3 text-lg md:text-xl">
          {[
            "Alert",
            "Gather evidence",
            "Compare history",
            "Read policy",
            "Recommend",
            "Request approval",
            "Execute",
            "Audit",
          ].map((step, i, arr) => (
            <span key={step} className="contents">
              <span
                className={`flow-step ${
                  step === "Execute" ? "border-blocked/30 bg-blocked-soft text-blocked" : ""
                }`}
              >
                {step}
                {step === "Execute" ? (
                  <Reveal index={1} as="span" className="ml-2 badge-blocked text-xs">
                    Locked until Approval
                  </Reveal>
                ) : null}
              </span>
              {i < arr.length - 1 ? <span className="text-ink-muted">→</span> : null}
            </span>
          ))}
        </div>
      </TeachingSlide>
    ),
  },
  {
    id: "demo-incident-simulator",
    reveals: 0,
    notes: {
      whatToSay: "Gather evidence before generating a recommendation.",
      questionToAsk: "Can Execute Action be clicked?",
      expectedResponse: "No — it remains disabled.",
      transition: "Debrief evidence stages.",
    },
    content: (
      <DemoLaunchSlide
        title="Investigate before acting"
        buttonLabel="Launch Incident Simulator"
        href="/demo/incident-simulator?returnTo=/session-4/deck?slide=20"
      >
        <div className="code-block text-lg md:text-xl">
          <div>payments-service</div>
          <div>CrashLoopBackOff</div>
          <div>Production</div>
          <div>Version v2.4.1</div>
        </div>
      </DemoLaunchSlide>
    ),
  },
  {
    id: "incident-debrief",
    reveals: 0,
    notes: {
      whatToSay: "Evidence quality changes what the system should do.",
      questionToAsk: "When is recommendation appropriate?",
      expectedResponse: "Only after strong evidence; approval still required before execution.",
      transition: "Show the enterprise architecture diagram.",
    },
    content: (
      <TeachingSlide>
        <h1 className="slide-title">Evidence changes the quality of the recommendation</h1>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <div className="flow-step">
            <span className="badge-blocked mr-3">No evidence</span>
            Do not act
          </div>
          <div className="flow-step">
            <span className="badge-warn mr-3">Partial evidence</span>
            Continue investigation
          </div>
          <div className="flow-step">
            <span className="badge-grounded mr-3">Strong evidence</span>
            Prepare recommendation
          </div>
          <div className="flow-step">
            <span className="badge-blocked mr-3">Approval</span>
            Required before execution
          </div>
        </div>
      </TeachingSlide>
    ),
  },
  {
    id: "enterprise-architecture",
    reveals: 0,
    notes: {
      whatToSay: "Policies feed CAG; docs feed RAG; systems feed tools; orchestrator assembles context.",
      questionToAsk: "What sits after the LLM or agent?",
      expectedResponse: "Approval and audit.",
      transition: "Close the session.",
    },
    content: (
      <TeachingSlide>
        <h1 className="slide-title">The enterprise knowledge layer</h1>
        <div className="mt-8 space-y-2 font-mono text-base leading-relaxed md:text-lg">
          <div>Policies and standards</div>
          <div className="text-ink-muted">↓</div>
          <div className="text-grounded font-semibold">CAG</div>
          <div className="pt-3">Docs, runbooks and incidents</div>
          <div className="text-ink-muted">↓</div>
          <div className="text-accent font-semibold">RAG</div>
          <div className="pt-3">Kubernetes, cloud and observability</div>
          <div className="text-ink-muted">↓</div>
          <div className="text-warn font-semibold">Tools and APIs</div>
          <div className="pt-3 text-ink-muted">↓</div>
          <div>Context Orchestrator</div>
          <div className="text-ink-muted">↓</div>
          <div>LLM or Agent</div>
          <div className="text-ink-muted">↓</div>
          <div className="text-blocked font-semibold">Approval and Audit</div>
        </div>
      </TeachingSlide>
    ),
  },
  {
    id: "closing",
    reveals: 2,
    notes: {
      whatToSay: "The future DevOps assistant routes across knowledge systems and stops at safety boundaries.",
      questionToAsk: "What are the five takeaways?",
      expectedResponse: "CAG, RAG, tools, structured systems, humans for production action.",
      transition: "End of Session 4.",
    },
    content: (
      <TeachingSlide>
        <h1 className="slide-title max-w-5xl">
          The future DevOps assistant will not rely on one knowledge source.
        </h1>
        <Reveal index={1} className="mt-8">
          <p className="font-display text-3xl font-semibold text-accent md:text-4xl">
            It will route, retrieve, verify, reason and stop at the correct safety boundary.
          </p>
        </Reveal>
        <Reveal index={2} className="mt-10">
          <ul className="grid gap-3 text-xl md:grid-cols-2">
            {[
              "Use CAG for stable approved knowledge.",
              "Use RAG for large changing knowledge.",
              "Use tools for current state.",
              "Use structured systems for structured facts.",
              "Use humans for governed production action.",
            ].map((item) => (
              <li key={item} className="flow-step">
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </TeachingSlide>
    ),
  },
];
