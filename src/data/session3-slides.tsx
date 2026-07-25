import { DemoLaunchSlide, Reveal, TeachingSlide } from "@/components/deck";
import type { SlideDefinition } from "@/types/deck";

export const session3Slides: SlideDefinition[] = [
  {
    id: "title",
    reveals: 0,
    notes: {
      whatToSay:
        "In the previous session, we learnt how semantic search finds relevant information. Today we will follow what happens after retrieval.",
      questionToAsk: "What happens after search returns a relevant document?",
      expectedResponse: "We still need to build context, prompt carefully, generate and cite.",
      transition: "Let us begin with one question.",
    },
    content: (
      <TeachingSlide>
        <p className="eyebrow">Agentic AI in DevOps · Session 3</p>
        <h1 className="slide-title">Building and Debugging RAG</h1>
        <p className="slide-subtitle">
          How retrieved evidence becomes a grounded DevOps answer
        </p>
      </TeachingSlide>
    ),
  },
  {
    id: "opening-question",
    reveals: 2,
    notes: {
      whatToSay:
        "We already know how relevant information is retrieved. Now let us understand how retrieved evidence becomes a grounded LLM response.",
      questionToAsk: "If search found the right document, have we finished building RAG?",
      expectedResponse: "No — we only have evidence.",
      transition: "Retrieval is necessary, but not sufficient.",
    },
    content: (
      <TeachingSlide>
        <h1 className="slide-title max-w-5xl">
          If search found the right document, have we finished building RAG?
        </h1>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <div className="flow-step">Yes — we have the answer</div>
          <div className="flow-step">No — we only have evidence</div>
        </div>
        <Reveal index={1} className="mt-10">
          <p className="font-display text-3xl font-semibold text-grounded md:text-4xl">
            No — we only have evidence.
          </p>
        </Reveal>
        <Reveal index={2} className="mt-4">
          <p className="slide-subtitle">
            Retrieval finds material. RAG still has to select, organise, constrain and communicate it.
          </p>
        </Reveal>
      </TeachingSlide>
    ),
  },
  {
    id: "big-idea",
    reveals: 5,
    notes: {
      whatToSay: "Search returns evidence. RAG constructs an answer.",
      questionToAsk: "Which stages sit between retrieval and a trustworthy answer?",
      expectedResponse: "Context construction, prompt control, generation and citations.",
      transition: "Let us look at the two halves of the pipeline.",
    },
    content: (
      <TeachingSlide>
        <h1 className="slide-title max-w-4xl">
          Search returns evidence. RAG constructs an answer.
        </h1>
        <div className="mt-12 flex flex-wrap items-center gap-3 text-2xl font-medium md:text-3xl">
          <Reveal index={1} as="span" className="flow-step">
            Retrieval
          </Reveal>
          <Reveal index={2} as="span" className="text-ink-muted">
            +
          </Reveal>
          <Reveal index={2} as="span" className="flow-step">
            Context construction
          </Reveal>
          <Reveal index={3} as="span" className="text-ink-muted">
            +
          </Reveal>
          <Reveal index={3} as="span" className="flow-step">
            Prompt control
          </Reveal>
          <Reveal index={4} as="span" className="text-ink-muted">
            +
          </Reveal>
          <Reveal index={4} as="span" className="flow-step">
            Generation
          </Reveal>
          <Reveal index={5} as="span" className="text-ink-muted">
            +
          </Reveal>
          <Reveal index={5} as="span" className="flow-step">
            Citations
          </Reveal>
        </div>
      </TeachingSlide>
    ),
  },
  {
    id: "two-halves",
    reveals: 1,
    notes: {
      whatToSay: "RAG has an indexing half and a question-time half.",
      questionToAsk: "Which half did we already cover?",
      expectedResponse: "Parse, chunk, metadata, embed and index.",
      transition: "Today we focus on retrieve through cite.",
    },
    content: (
      <TeachingSlide>
        <h1 className="slide-title">The two halves of RAG</h1>
        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <div className="space-y-3">
            {[
              "Documents",
              "Parse",
              "Chunk",
              "Add Metadata",
              "Embed",
              "Index",
            ].map((step) => (
              <div key={step} className="flow-step flex items-center justify-between">
                <span>{step}</span>
                {step === "Embed" ? (
                  <span className="badge-covered">Covered previously</span>
                ) : null}
              </div>
            ))}
          </div>
          <Reveal index={1} className="space-y-3">
            {[
              "Question",
              "Retrieve",
              "Filter",
              "Build Context",
              "Prompt",
              "Generate",
              "Cite",
            ].map((step) => (
              <div key={step} className="flow-step">
                {step}
              </div>
            ))}
          </Reveal>
        </div>
      </TeachingSlide>
    ),
  },
  {
    id: "knowledge-sources",
    reveals: 2,
    notes: {
      whatToSay: "A DevOps assistant needs more than documents.",
      questionToAsk: "What kinds of knowledge matter during an incident?",
      expectedResponse: "Logs, YAML, runbooks, incidents, policy and live state.",
      transition: "These sources differ in structure, freshness, authority and risk.",
    },
    content: (
      <TeachingSlide>
        <h1 className="slide-title">What does a DevOps assistant need to know?</h1>
        <Reveal index={1}>
          <ul className="mt-10 grid gap-3 text-2xl font-medium md:grid-cols-2 md:text-3xl">
            {[
              "Runtime logs",
              "Kubernetes YAML",
              "Runbooks",
              "Incident history",
              "Security policies",
              "Live operational state",
            ].map((item) => (
              <li key={item} className="flow-step">
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal index={2} className="mt-8">
          <p className="slide-subtitle">
            These sources differ in structure, freshness, authority and risk.
          </p>
        </Reveal>
      </TeachingSlide>
    ),
  },
  {
    id: "scenario",
    reveals: 1,
    notes: {
      whatToSay: "ShopFlow has a production incident in payments-service.",
      questionToAsk: "Why is the pod restarting, and what should the engineer do?",
      expectedResponse: "Learners should separate diagnosis from safe remediation.",
      transition: "Let us ask what evidence they would request.",
    },
    content: (
      <TeachingSlide>
        <h1 className="slide-title">ShopFlow has a production incident</h1>
        <div className="mt-8 code-block text-lg md:text-xl">
          <div>Service: payments-service</div>
          <div>Environment: production</div>
          <div>Status: CrashLoopBackOff</div>
          <div>Version: v2.4.1</div>
        </div>
        <p className="mt-8 text-2xl font-medium text-ink md:text-3xl">
          Why is the pod restarting, and what should the engineer do?
        </p>
        <Reveal index={1} className="mt-8 flex flex-wrap gap-3">
          <span className="badge-grounded text-base">Diagnosis</span>
          <span className="badge-warn text-base">Safe remediation</span>
        </Reveal>
      </TeachingSlide>
    ),
  },
  {
    id: "class-activity",
    reveals: 2,
    notes: {
      whatToSay: "Ask the room what evidence they would request.",
      questionToAsk: "Which sources help diagnosis, and which help remediation?",
      expectedResponse:
        "Diagnosis: logs, YAML, current state, incidents. Remediation: runbook, policy, incident resolution.",
      transition: "Now we will walk the complete RAG pipeline.",
    },
    content: (
      <TeachingSlide>
        <h1 className="slide-title">What evidence would you request?</h1>
        <Reveal index={1}>
          <ul className="mt-8 grid gap-3 text-xl font-medium md:grid-cols-2 md:text-2xl">
            {[
              "Application logs",
              "Deployment YAML",
              "Previous incidents",
              "Production runbook",
              "Security policy",
              "Current Kubernetes state",
            ].map((item) => (
              <li key={item} className="flow-step">
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal index={2} className="mt-8 grid gap-6 md:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-grounded">
              Diagnosis
            </p>
            <div className="space-y-2 text-lg">
              <div className="chip">logs</div>
              <div className="chip">YAML</div>
              <div className="chip">current state</div>
              <div className="chip">incidents</div>
            </div>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-warn">
              Remediation
            </p>
            <div className="space-y-2 text-lg">
              <div className="chip">runbook</div>
              <div className="chip">policy</div>
              <div className="chip">incident resolution</div>
            </div>
          </div>
        </Reveal>
      </TeachingSlide>
    ),
  },
  {
    id: "demo-rag-pipeline",
    reveals: 0,
    notes: {
      whatToSay: "Launch the RAG Pipeline Explorer and walk through each stage.",
      questionToAsk: "Where does the LLM sit in this pipeline?",
      expectedResponse: "Near the end — after filters, context and prompt control.",
      transition: "Return here for the debrief.",
    },
    content: (
      <DemoLaunchSlide
        title="Walk through the complete RAG pipeline"
        buttonLabel="Launch RAG Pipeline Explorer"
        href="/demo/rag-pipeline?returnTo=/session-3/deck?slide=9"
      >
        <div className="flex flex-wrap items-center gap-2 text-lg md:text-xl">
          {[
            "Question",
            "Evidence",
            "Filters",
            "Context",
            "Prompt",
            "Answer",
            "Sources",
          ].map((step, i, arr) => (
            <span key={step} className="contents">
              <span className="flow-step">{step}</span>
              {i < arr.length - 1 ? <span className="text-ink-muted">→</span> : null}
            </span>
          ))}
        </div>
      </DemoLaunchSlide>
    ),
  },
  {
    id: "pipeline-debrief",
    reveals: 5,
    notes: {
      whatToSay: "The pipeline made several control points visible.",
      questionToAsk: "What did metadata filtering prevent?",
      expectedResponse: "Staging and outdated guidance from entering context.",
      transition: "Similarity and applicability are different questions.",
    },
    content: (
      <TeachingSlide>
        <h1 className="slide-title">What did the pipeline make visible?</h1>
        <ol className="mt-10 space-y-4 text-xl md:text-2xl">
          <Reveal index={1} as="li">
            1. Similarity produced candidate evidence.
          </Reveal>
          <Reveal index={2} as="li">
            2. Metadata rejected staging and outdated material.
          </Reveal>
          <Reveal index={3} as="li">
            3. Context selected and ordered evidence.
          </Reveal>
          <Reveal index={4} as="li">
            4. The prompt separated fact, inference and recommendation.
          </Reveal>
          <Reveal index={5} as="li">
            5. Citations connected claims to sources.
          </Reveal>
        </ol>
        <p className="mt-10 text-xl font-semibold text-accent md:text-2xl">
          The LLM was only one stage.
        </p>
      </TeachingSlide>
    ),
  },
  {
    id: "similarity-vs-applicability",
    reveals: 2,
    notes: {
      whatToSay: "Similarity asks if something is related. Metadata asks if it applies.",
      questionToAsk: "Why might a related runbook still be wrong?",
      expectedResponse: "Wrong environment or outdated unsafe guidance.",
      transition: "Metadata is an operational safety control.",
    },
    content: (
      <TeachingSlide>
        <h1 className="slide-title">Similarity asks: “Is this related?”</h1>
        <Reveal index={1} className="mt-8">
          <p className="font-display text-3xl font-semibold text-accent md:text-4xl">
            Metadata asks: “Is this applicable?”
          </p>
        </Reveal>
        <Reveal index={2} className="mt-10 space-y-4">
          <div className="flow-step flex items-center justify-between">
            <span>Related but wrong: staging-runbook.md</span>
            <span className="badge-blocked">Rejected</span>
          </div>
          <div className="flow-step flex items-center justify-between">
            <span>Related but unsafe: outdated-payments-runbook.md</span>
            <span className="badge-warn">Outdated</span>
          </div>
        </Reveal>
      </TeachingSlide>
    ),
  },
  {
    id: "metadata",
    reveals: 1,
    notes: {
      whatToSay: "Metadata fields are safety controls, not decorative labels.",
      questionToAsk: "Which field would block staging advice in production?",
      expectedResponse: "Environment — and possibly status or access level.",
      transition: "Even after filtering, the LLM only sees constructed context.",
    },
    content: (
      <TeachingSlide>
        <h1 className="slide-title">Metadata is an operational safety control</h1>
        <div className="mt-10 flex flex-wrap gap-3">
          {[
            "service",
            "environment",
            "document type",
            "version",
            "status",
            "updated date",
            "team",
            "access level",
          ].map((chip) => (
            <span key={chip} className="chip text-lg">
              {chip}
            </span>
          ))}
        </div>
        <Reveal index={1} className="mt-10">
          <p className="slide-subtitle">Any of these may prevent an unsafe answer.</p>
        </Reveal>
      </TeachingSlide>
    ),
  },
  {
    id: "context",
    reveals: 1,
    notes: {
      whatToSay: "The LLM never sees the entire knowledge base.",
      questionToAsk: "What can the answer use?",
      expectedResponse: "Only the context the system provides.",
      transition: "Order matters inside that context window.",
    },
    content: (
      <TeachingSlide>
        <h1 className="slide-title">The LLM never sees the entire knowledge base</h1>
        <div className="mt-12 flex flex-wrap items-center gap-3 text-xl md:text-2xl">
          {[
            "Large Knowledge Base",
            "Candidate Retrieval",
            "Filtered Evidence",
            "Constructed Context",
            "LLM",
          ].map((step, i, arr) => (
            <span key={step} className="contents">
              <span className="flow-step">{step}</span>
              {i < arr.length - 1 ? <span className="text-ink-muted">→</span> : null}
            </span>
          ))}
        </div>
        <Reveal index={1} className="mt-10">
          <p className="text-xl font-semibold text-accent md:text-2xl">
            The answer can only use the context the system provides.
          </p>
        </Reveal>
      </TeachingSlide>
    ),
  },
  {
    id: "context-order",
    reveals: 1,
    notes: {
      whatToSay: "One useful pattern is runtime first, then config, history, procedure, safety.",
      questionToAsk: "Why put safety constraints near the end?",
      expectedResponse: "They bound the recommendation after evidence is assembled.",
      transition: "The prompt then controls how evidence becomes language.",
    },
    content: (
      <TeachingSlide>
        <h1 className="slide-title">How should evidence be ordered?</h1>
        <div className="mt-8 flex flex-wrap gap-3 text-lg">
          {[
            "Safety policy",
            "Runtime log",
            "Runbook",
            "Deployment YAML",
            "Previous incident",
          ].map((item) => (
            <span key={item} className="chip">
              {item}
            </span>
          ))}
        </div>
        <Reveal index={1} className="mt-10">
          <ol className="space-y-3 text-xl md:text-2xl">
            <li className="flow-step">1. Runtime evidence</li>
            <li className="flow-step">2. Current configuration</li>
            <li className="flow-step">3. Historical evidence</li>
            <li className="flow-step">4. Approved procedure</li>
            <li className="flow-step">5. Safety constraints</li>
          </ol>
          <p className="mt-6 text-lg text-ink-muted">
            One useful pattern, not a universal rule.
          </p>
        </Reveal>
      </TeachingSlide>
    ),
  },
  {
    id: "prompt-control",
    reveals: 1,
    notes: {
      whatToSay: "Weak prompts collapse evidence into ungoverned advice.",
      questionToAsk: "What constraints make a DevOps prompt safer?",
      expectedResponse:
        "Use only evidence, separate facts, label recommendations, show uncertainty, cite, refuse when insufficient.",
      transition: "Fact, inference and recommendation are different claim types.",
    },
    content: (
      <TeachingSlide>
        <h1 className="slide-title">The prompt controls how evidence becomes language</h1>
        <div className="mt-8 code-block">
          Read these documents and tell the user what to do.
        </div>
        <p className="mt-3">
          <span className="badge-blocked">Weak prompt</span>
        </p>
        <Reveal index={1} className="mt-8 grid gap-3 text-lg md:grid-cols-2 md:text-xl">
          {[
            "Use only supplied evidence.",
            "Separate facts from likely causes.",
            "Label recommendations.",
            "Show uncertainty.",
            "Do not claim execution.",
            "Cite important claims.",
            "Say when evidence is insufficient.",
          ].map((item) => (
            <div key={item} className="flow-step">
              {item}
            </div>
          ))}
        </Reveal>
      </TeachingSlide>
    ),
  },
  {
    id: "claim-types",
    reveals: 0,
    notes: {
      whatToSay: "Safe answers preserve boundaries between fact, inference and recommendation.",
      questionToAsk: "Which claim type requires the strongest governance?",
      expectedResponse: "Recommendation — especially if it implies production action.",
      transition: "Now let us move backwards into chunking.",
    },
    content: (
      <TeachingSlide>
        <h1 className="slide-title">Fact, inference and recommendation are different</h1>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-grounded/20 bg-grounded-soft p-6">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-grounded">
              Fact
            </p>
            <p className="text-xl font-medium">
              The container exited with OOMKilled.
            </p>
          </div>
          <div className="rounded-2xl border border-warn/20 bg-warn-soft p-6">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-warn">
              Inference
            </p>
            <p className="text-xl font-medium">
              It likely exceeded the configured memory limit.
            </p>
          </div>
          <div className="rounded-2xl border border-accent/20 bg-accent-soft p-6">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-accent">
              Recommendation
            </p>
            <p className="text-xl font-medium">
              Consider an approved rollback if v2.4.1 triggered the issue.
            </p>
          </div>
        </div>
        <p className="mt-10 text-xl font-semibold text-ink-soft">
          Safe answers preserve these boundaries.
        </p>
      </TeachingSlide>
    ),
  },
  {
    id: "section-chunking",
    reveals: 0,
    notes: {
      whatToSay: "We now move backwards to source preparation.",
      questionToAsk: "What happens when chunking is wrong?",
      expectedResponse: "Relevant but incomplete guidance can become unsafe.",
      transition: "The goal is not equal pieces.",
    },
    content: (
      <TeachingSlide>
        <h1 className="slide-title">Now let us move backwards</h1>
        <p className="slide-subtitle">
          What happens when the source document is chunked badly?
        </p>
      </TeachingSlide>
    ),
  },
  {
    id: "chunking-idea",
    reveals: 2,
    notes: {
      whatToSay: "Chunking should preserve operational meaning.",
      questionToAsk: "What makes a good DevOps chunk?",
      expectedResponse: "Condition, checks, action and verification stay together.",
      transition: "Different document types need different strategies.",
    },
    content: (
      <TeachingSlide>
        <h1 className="slide-title">The goal is not to create equal pieces</h1>
        <Reveal index={1} className="mt-8">
          <p className="font-display text-3xl font-semibold text-accent md:text-4xl">
            The goal is to preserve the meaning required for retrieval.
          </p>
        </Reveal>
        <Reveal index={2} className="mt-10 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-blocked/20 bg-blocked-soft p-6">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-blocked">
              Bad unit
            </p>
            <p className="text-xl">Command without prerequisites</p>
          </div>
          <div className="rounded-2xl border border-grounded/20 bg-grounded-soft p-6">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-grounded">
              Good unit
            </p>
            <p className="text-xl">Condition + checks + action + verification</p>
          </div>
        </Reveal>
      </TeachingSlide>
    ),
  },
  {
    id: "chunking-by-type",
    reveals: 0,
    notes: {
      whatToSay: "Match chunking strategy to document structure.",
      questionToAsk: "How would you chunk a runbook versus a YAML file?",
      expectedResponse: "Runbook by procedure; YAML by resource or logical block.",
      transition: "Let us see unsafe advice from bad chunking.",
    },
    content: (
      <TeachingSlide>
        <h1 className="slide-title">Different DevOps documents need different chunking</h1>
        <div className="mt-10 space-y-4 text-xl md:text-2xl">
          <div className="flow-step">
            <span className="font-semibold">Runbook:</span> By procedure or decision path
          </div>
          <div className="flow-step">
            <span className="font-semibold">YAML:</span> By resource or logical block
          </div>
          <div className="flow-step">
            <span className="font-semibold">Logs:</span> By time window, trace or incident window
          </div>
          <div className="flow-step">
            <span className="font-semibold">Postmortem:</span> Symptoms, timeline, root cause, resolution
          </div>
          <div className="flow-step">
            <span className="font-semibold">Policy:</span> By individual rule or control
          </div>
        </div>
      </TeachingSlide>
    ),
  },
  {
    id: "demo-chunking",
    reveals: 0,
    notes: {
      whatToSay: "Launch Chunking Studio and compare fixed-size versus procedure chunking.",
      questionToAsk: "Can bad chunking create unsafe advice?",
      expectedResponse: "Yes — retrieving only the rollback command omits checks and approval.",
      transition: "Return for the debrief.",
    },
    content: (
      <DemoLaunchSlide
        title="Can bad chunking create unsafe advice?"
        buttonLabel="Launch Chunking Studio"
        href="/demo/chunking?returnTo=/session-3/deck?slide=20"
      >
        <p className="text-2xl font-medium text-ink-soft">
          What should I check before rolling back payments-service?
        </p>
      </DemoLaunchSlide>
    ),
  },
  {
    id: "chunking-debrief",
    reveals: 1,
    notes: {
      whatToSay: "A relevant chunk can still be incomplete.",
      questionToAsk: "What was missing from the command-only chunk?",
      expectedResponse: "Diagnostic checks, reason, approval and verification.",
      transition: "Next we break the pipeline deliberately.",
    },
    content: (
      <TeachingSlide>
        <h1 className="slide-title">A relevant chunk can still be incomplete</h1>
        <div className="mt-8 code-block text-lg">
          Retrieved:
          <br />
          kubectl rollout undo deployment/payments-service
        </div>
        <Reveal index={1} className="mt-8">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-blocked">
            Missing context
          </p>
          <ul className="grid gap-3 text-xl md:grid-cols-2">
            {[
              "diagnostic checks",
              "reason for rollback",
              "approval requirement",
              "rollout verification",
            ].map((item) => (
              <li key={item} className="flow-step">
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-xl font-semibold text-ink-soft">
            Semantic relevance does not guarantee operational completeness.
          </p>
        </Reveal>
      </TeachingSlide>
    ),
  },
  {
    id: "section-break",
    reveals: 0,
    notes: {
      whatToSay: "The fastest way to understand RAG is to break it.",
      questionToAsk: "What should stay fixed while we change one condition?",
      expectedResponse: "The question stays fixed.",
      transition: "Launch Break RAG.",
    },
    content: (
      <TeachingSlide>
        <h1 className="slide-title">The fastest way to understand RAG is to break it</h1>
        <p className="slide-subtitle">
          Keep the question fixed. Change one pipeline condition.
        </p>
      </TeachingSlide>
    ),
  },
  {
    id: "demo-break-rag",
    reveals: 0,
    notes: {
      whatToSay: "Walk learners through each failure mode.",
      questionToAsk: "Which failure looks most like a model problem but is not?",
      expectedResponse: "Wrong metadata, bad chunking, weak prompt, missing citations.",
      transition: "Then we capture a diagnostic framework.",
    },
    content: (
      <DemoLaunchSlide
        title="Diagnose the broken pipeline"
        buttonLabel="Launch Break RAG"
        href="/demo/break-rag?returnTo=/session-3/deck?slide=23"
      >
        <ul className="grid gap-3 text-xl md:grid-cols-2">
          {[
            "Bad chunking",
            "Wrong metadata",
            "Top K too low",
            "Outdated source",
            "Too much context",
            "Weak prompt",
            "Missing citations",
          ].map((item) => (
            <li key={item} className="flow-step">
              {item}
            </li>
          ))}
        </ul>
      </DemoLaunchSlide>
    ),
  },
  {
    id: "diagnostic-framework",
    reveals: 10,
    notes: {
      whatToSay: "Give learners a checklist for failed RAG answers.",
      questionToAsk: "Where would you start when an answer looks unsafe?",
      expectedResponse: "Inspect existence, parsing, chunking, environment, then prompt and governance.",
      transition: "Close with the governing idea.",
    },
    content: (
      <TeachingSlide>
        <h1 className="slide-title">When a RAG answer fails, inspect the pipeline</h1>
        <ol className="mt-8 columns-1 gap-x-10 space-y-3 text-lg md:columns-2 md:text-xl">
          {[
            "Did the knowledge exist?",
            "Was it parsed correctly?",
            "Was meaning preserved?",
            "Was the correct environment selected?",
            "Was enough evidence retrieved?",
            "Was context filtered and ordered?",
            "Did the prompt constrain the answer?",
            "Did the model follow instructions?",
            "Was the source current and authoritative?",
            "Was the recommendation permitted?",
          ].map((item, i) => (
            <Reveal key={item} index={i + 1} as="li" className="break-inside-avoid">
              {i + 1}. {item}
            </Reveal>
          ))}
        </ol>
      </TeachingSlide>
    ),
  },
  {
    id: "closing",
    reveals: 2,
    notes: {
      whatToSay: "RAG is a governed evidence pipeline, not a vector database bolt-on.",
      questionToAsk: "Should every piece of knowledge be retrieved?",
      expectedResponse: "No — that leads into CAG and enterprise routing.",
      transition: "Next: Should every piece of knowledge be retrieved?",
    },
    content: (
      <TeachingSlide>
        <h1 className="slide-title max-w-5xl">
          RAG is not an LLM connected to a vector database.
        </h1>
        <Reveal index={1} className="mt-8">
          <p className="font-display text-3xl font-semibold text-accent md:text-4xl">
            It is a governed evidence pipeline.
          </p>
        </Reveal>
        <Reveal index={2} className="mt-10">
          <ul className="grid gap-3 text-xl md:grid-cols-2">
            {[
              "Retrieval produces candidates.",
              "Metadata establishes applicability.",
              "Context shapes available evidence.",
              "Prompts control claims.",
              "Citations make answers inspectable.",
              "Governance separates advice from action.",
            ].map((item) => (
              <li key={item} className="flow-step">
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-xl font-semibold text-ink-soft">
            Next: Should every piece of knowledge be retrieved?
          </p>
        </Reveal>
      </TeachingSlide>
    ),
  },
];
